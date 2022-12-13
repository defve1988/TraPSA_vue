export default class traj_task {
    constructor() {}

    async traj_setup(hysplit, df, sites) {
        // set all parameters
        var curr_job = this.set_job_parameter(hysplit);
        // get selected data
        var selected = df.filter_col(
            "site_name",
            hysplit.sites
        );
        // handle whether expand the timestamp
        curr_job.start_point = await this.expand_time_stamp(selected, hysplit.start_time.isExpand,
            hysplit.start_time.sample_period,
            hysplit.start_time.expand_number);
        // genereate bat file
        var bat_content = await this.generate_bat(curr_job, sites.df);
        // console.log(bat_content)
        var mete_required = bat_content.mete_data_required.sort()
        return {
            bat_content: bat_content.content,
            curr_job: curr_job,
            mete_required: mete_required
        }
    }

    set_job_parameter(hysplit) {
        // set all the trajectory parameters except the starting points
        var kmsl
        switch (hysplit.start_height.value_type) {
            case "Height above ground":
                kmsl = "0"
                break;
            case "Relative to mean sea level":
                kmsl = "1"
                break;
            case "Fraction of the mixed layer":
                kmsl = "2"
                break;
        }
        let mm = new Date().getMonth() + 1
        var mete_type = (hysplit.mete.type == "NCEP/NCAR") ? "reanalysis" : hysplit.mete.type
        var job_name = hysplit.job_name + "_" + new Date().getFullYear() + ("0" + mm).substr(-2) + new Date().getDate() + "_" + Math.abs(hysplit.trajectory_time) + "H_" + mete_type
        return {
            job_name: job_name,
            csv_file: job_name + ".csv",
            start_point: [],
            trajectory_time: hysplit.trajectory_time,
            height: hysplit.start_height.value,
            kmsl: kmsl,
            working_folder: hysplit.working,
            mete_folder: hysplit.mete.path,
            mete_type: hysplit.mete.type
        }
    }

    async expand_time_stamp(data, isExpand, sample_period, expand_number) {
        // must include "time_stamp"
        var res = []
        if (isExpand) {
            let period = parseInt(sample_period / expand_number)
            let number = expand_number
            if (!period >= 1) {
                throw new Error("Not supported! Can't be smaller than 1 hour.");
            }
            for (let i = 0; i < data.length; i++) {
                let temp = new Date(data[i].time_stamp)
                temp.setHours(temp.getHours() - period * number)

                for (let j = 0; j < number; j++) {
                    // note: Date object need deep copy
                    temp.setHours(temp.getHours() + period)
                    res.push({
                        time_stamp: data[i].time_stamp,
                        site_name: data[i].site_name,
                        traj_time_stamp: temp.toLocaleString().replace(",", ""),
                    })
                }
            }
        } else {
            res = data.map((x) => {
                return {
                    traj_time_stamp: x.time_stamp,
                    time_stamp: x.time_stamp,
                    site_name: x.site_name,
                }
            });
        }
        return res
    }


    // TODO: need to become a request from the server.
    // TODO: how to reduce the bat file size?
    async generate_bat(curr_job, sites) {
        var mete_data_required = []
        var csv_path = curr_job.working_folder + "\\" + curr_job.csv_file

        var csv_header = "time_stamp,site_name,traj_date,"
        for (let i = 0; i <= Math.abs(curr_job.trajectory_time); i++) {
            csv_header = csv_header + "lat_" + i + ","
        }
        for (let i = 0; i <= Math.abs(curr_job.trajectory_time); i++) {
            csv_header = csv_header + "lon_" + i + ","
        }
        for (let i = 0; i <= Math.abs(curr_job.trajectory_time); i++) {
            csv_header = csv_header + "alt_" + i + ","
        }
        for (let i = 0; i <= Math.abs(curr_job.trajectory_time); i++) {
            csv_header = csv_header + "mixd_" + i + ","
        }
        csv_header = [csv_header]
        console.log(csv_header)

        var content = [
            ["echo Start HYSPLIT...\n"],
        ]
        content.push(["@echo off\n"])
        content.push(["setlocal enableextensions enabledelayedexpansion\n"])
        content.push(["echo " + csv_header + " >> " + csv_path + "\n"])

        for (let i = 0; i < curr_job.start_point.length; i++) {
            let job = this.job_detail(curr_job.start_point[i], curr_job.mete_type, sites, curr_job.trajectory_time)
            let count = i + 1
            var percentage = Math.round(count / curr_job.start_point.length * 10000) / 100
            content.push(["echo Completed: " + count + "/" + curr_job.start_point.length + ", " + percentage + " %%" + "\n"])
            mete_data_required = Array.from(new Set(mete_data_required.concat(job.mete_file)))
            content.push(["cd working\n"])
            content.push(["echo " + job.time_string + " > CONTROL\n"])
            content.push(["echo 1 >> CONTROL\n"])
            content.push(["echo " + job.lat + " " + job.lon + " " + curr_job.height + " >> CONTROL\n"])
            content.push(["echo " + curr_job.trajectory_time + " >> CONTROL\n"])
            content.push(["echo 0 >> CONTROL\n"])
            content.push(["echo 25000.0 >> CONTROL\n"])
            content.push(["echo " + job.mete_file.length + " >> CONTROL\n"])
            for (let m = 0; m < job.mete_file.length; m++) {
                content.push(["echo " + curr_job.mete_folder + "\\ >> CONTROL\n"])
                content.push(["echo " + job.mete_file[m] + " >> CONTROL\n"])
            }
            content.push(["echo " + curr_job.working_folder + "\\working\\  >> CONTROL\n"])
            content.push(["echo trapsa_temp >> CONTROL\n"])
            content.push(["echo ^& setup > SETUP.CFG\n"])
            content.push(["echo kmsl = " + curr_job.kmsl + ", >> SETUP.CFG\n"])
            // TM_PRES (0) - diagnostic marker variables to output atmospheric pressure (1) along the trajectory
            // TM_TPOT (0) - potential temperature (1) in degrees Kelvin
            // TM_TAMB (0) - ambient temperature (1) in degrees Kelvin
            // TM_RAIN (0) - rainfall (1) in mm per hour
            // TM_MIXD (0) - mixed layer depth (1) in meters.
            // TM_RELH (0) - relative humidity (1) in percent.
            // TM_DSWF (0) - downward solar radiation flux (1) in watts.
            // TM_TERR (0) - terrain height (1) in meters required for the trajectory plot to show underlying terrain.
            content.push(["echo tm_mixd = 1, >> SETUP.CFG\n"])

            content.push(["echo / >> SETUP.CFG\n"])
            content.push(["start /MIN /WAIT hyts_std.exe\n"])

            content.push(["set lat= \n"])
            content.push(["set lon= \n"])
            content.push(["set alt= \n"])
            content.push(["set mixd= \n"])
            content.push(["for /f \"tokens=10,11,12,14 delims= \" %%i in (trapsa_temp) do (\n"])
            content.push(["if \"!lat!\"==\" \" (set lat=%%i) else (set lat=!lat!,%%i)\n"])
            content.push(["if \"!lon!\"==\" \" (set lon=%%j) else (set lon=!lon!,%%j)\n"])
            content.push(["if \"!alt!\"==\" \" (set alt=%%k) else (set alt=!alt!,%%k)\n"])
            content.push(["if \"!mixd!\"==\" \" (set mixd=%%l) else (set mixd=!mixd!,%%l))\n"])
            content.push(["cd ..\n"])
            content.push(["echo " + job.time_stamp + "," + job.site_name + "," + job.traj_time_stamp + ", %lat%, %lon%, %alt%, %mixd% >> " + csv_path + "\n"])

        }

        content.push(["echo All done.\n"])
        content.push(["pause\n"])

        return {
            content: content,
            mete_data_required: mete_data_required
        }
    }


    generate_mete_file(job_date, mete_type, traj_time) {
        var res = []
        let month = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec", ]
        switch (mete_type) {
            case "NCEP/NCAR":
                for (let i = 0; i < 3; i++) {
                    let mm = job_date.getMonth() + 1
                    res.push("RP" + job_date.getFullYear() + ("0" + mm).substr(-2) + ".gbl")
                    job_date.setMonth(job_date.getMonth() - 1)
                }
                break;
            case "GDAS1":
                var num
                for (let i = 0; i < 3; i++) {
                    let year = job_date.getFullYear()
                    if ((job_date.getMonth() + 1 == 2)) {
                        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                            num = 5
                        } else {
                            num = 4
                        }
                    } else {
                        num = 5
                    }
                    year = String(year).slice(2, 4)

                    for (var j = 1; j <= num; j++) {
                        res.push("gdas1." + month[job_date.getMonth()] + year + ".w" + j)
                    }

                    job_date.setMonth(job_date.getMonth() - 1)
                }
                break;
            case "GDAS0p5":
                var days = Math.ceil(Math.abs(traj_time) / 24) + 1
                for (let i = 0; i < days; i++) {
                    let mm = job_date.getMonth() + 1
                    let dd = job_date.getDate() + 1
                    res.push(job_date.getFullYear() + ("0" + mm).substr(-2) + ("0" + dd).substr(-2) + "_gdas0p5")
                    job_date.setDate(job_date.getDate() - 1)
                }
                break;
            case "EDAS40":
                for (let i = 0; i < 3; i++) {
                    let year = String(job_date.getFullYear()).slice(2, 4)
                    res.push("edas." + month[job_date.getMonth()] + year + ".001")
                    res.push("edas." + month[job_date.getMonth()] + year + ".002")
                    job_date.setMonth(job_date.getMonth() - 1)
                }
                break;
            case "NARR":
                for (let i = 0; i < 3; i++) {
                    let mm = job_date.getMonth() + 1
                    res.push("NARR" + job_date.getFullYear() + ("0" + mm).substr(-2))
                    job_date.setMonth(job_date.getMonth() - 1)
                }
                break;
        }
        return res.length>12 ? res.slice(0,12):res
    }

    job_detail(start_point, mete_type, sites, traj_time) {
        var job = {
            time_stamp: start_point.time_stamp,
            site_name: start_point.site_name,
            traj_time_stamp: start_point.traj_time_stamp,
            time_string: "",
            lat: "",
            lon: "",
            mete_file: [],
            job_date: []
        }

        // site : this.app_data.sites.data
        // lat: sites.filter((site) => site.site_name == x.site_name)[0].lat,
        // lon: sites.filter((site) => site.site_name == x.site_name)[0].lon,

        let job_date = new Date(start_point.traj_time_stamp)
        let mm = job_date.getMonth() + 1
        job.job_date = job_date
        job.time_string = job_date.getFullYear() + " " + ("0" + mm).substr(-2) + " " + job_date.getDate() + " " + job_date.getHours()
        job.lat = sites.filter((site) => site.site_name == start_point.site_name)[0].lat
        job.lon = sites.filter((site) => site.site_name == start_point.site_name)[0].lon
        job.mete_file = this.generate_mete_file(job_date, mete_type, traj_time)

        return job
    }

    async upload_traj(file, curr_job) {
        var res = {
            job_name: curr_job.job_name,
            data: []
        }
        // console.log(res, curr_job);

        var traj_time = Math.abs(curr_job.trajectory_time)

        let traj = await this.readFileAsync(file)
        let lines = traj.split("\n")
        let header = lines[0].trim().split(",").filter((x) => {
            return x.length > 0
        })
        // console.log(header);

        for (let l = 1; l < lines.length; l++) {
            let content = lines[l].trim().split(",").filter((x) => {
                return x.length > 0
            })
            if (content.length == header.length) {
                var temp = {
                    site_name: "",
                    time_stamp: "",
                    traj_date: "",
                    lat: [],
                    lon: [],
                    alt: [],
                    mixed:[]
                }

                temp.time_stamp = content[0]
                temp.site_name = content[1]
                temp.traj_date = content[2]
                temp.lat = content.slice(3, 3 + traj_time + 1)
                temp.lon = content.slice(3 + traj_time + 1, 3 + traj_time * 2 + 2)
                temp.alt = content.slice(3 + traj_time * 2 + 2, 3 + traj_time * 3 + 3)
                // temp.mixed = content.slice(3 + traj_time * 3 + 3, 3 + traj_time * 4 + 4)
                res.data.push(temp)
            }
        }
        // console.log(res);

        return res
    }

    async readFileAsync(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsText(file);
        })
    }
}
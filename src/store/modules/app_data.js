import dv2_df from "@/dv2/dv2_df"
// import dv2_props from "@/dv2/dv2_props"

const state = {
    // define the missing data in the uploaded files
    missing_data: "-999,NaN,,",
    // data df
    sites: new dv2_df(),
    conc_df: new dv2_df(),
    traj_data: [],
    // traj_data:[{job_name:"", df: dv2_df}]

    // save the uploaded files for df merge
    upload_files: [],
    // analysis parameters
    parameters: {
        dialog_show:false,
        model:"PSCF",
        cpf: 0.9,
        cbpf: 0.9,
        pscf:0.8,
        grid_size:1,
        traj_job: "",
        weight:[
            { n: 0.25, w: 0.1 },
            { n: 0.5, w: 0.25 },
            { n: 0.75, w: 0.5 },
            { n: 1, w: 0.75 },
            { n: 1.5, w: 0.9 },
        ],
    },
    // curr_job is actually the last job.
    curr_job: {
        csv_file: "",
        job_name: "",
        start_point: [{
            time_stamp: null,
            site_name: null,
            traj_time_stamp: null,
        }],
        trajectory_time: null,
        height: null,
        kmsl: null,
        working_folder: "",
        mete_folder: "",
        mete_type: ""
    },


    // define the measurement data used in the app
    measurement: {
        header: [{
                text: "timestamp",
                value: "timestamp",
            },
            {
                text: "site_name",
                value: "site_name",
            },
            {
                text: "chemical_1",
                value: "chemical_1",
            },
            {
                text: "chemical_2",
                value: "chemical_2",
            },
            {
                text: "...",
            },
        ],
        data: [],
    },

    // define the wind data used in the app,{ID	timestamp	site_name	wind_speed	wind_direction}
    wind_data: {
        header: [{
                text: "timestamp",
                value: "timestamp",
            },
            {
                text: "site_name",
                value: "site_name",
            },
            {
                text: "wind_speed",
                value: "wind_speed",
            },
            {
                text: "wind_direction",
                value: "wind_direction",
            },

        ],
        data: [],
    },
    // traj_data: [{
    //     job_name: "",
    //     data: [{
    //         site_name: "",
    //         timestamp: "", correspounding to measurement
    //         traj_date: "", 
    //         lat: [],
    //         lon: [],
    //         alt: [],
    //     }]
    // }]
    // site_summary: [{
    //     name: "",
    //     location: [lat, lon],
    //     chemicals.name={
    //         name: "",
    //         record: 0,
    //         missing: 0,
    //         stats: [mean, max, min]
    //     },
    //     wind: {
    //         record: 0,
    //         missing: 0,
    //     },
    //     traj: {
    //         num: 0,
    //         jobs: []
    //     }
    // }],
    site_summary: [],

    // selected study case
    // {
    //     name: "",
    //     chemical:"",
    //     site:"",
    //     selected:false,
    //     data: {
    //         measurement:[{TimeString:, selected_chemical}],
    //         wind:[{TimeString, wind_speed, wind_direction}],
    //     },
    //     selections:{},
    //     model:{
    //         type:'PSCF',
    //         c:0.8,
    //         grid:0.5,
    //         weight:[],
    //         values:[],
    //         traj:[],
    //         selected:fasle
    //     },
    //     expand:false
    // }
    case: [


    ],

    source_case:[

    ],

    // map layers
    // selected with 1. case/select data, 2.trajectory job, 3. method
    // trajectory clusters
    // text/markers
    map_layers: [{
            name: '111'
        },
        {
            name: '222'
        },
        {
            name: '333'
        }
    ],
};

const getters = {

};

const actions = {

};

const mutations = {
    // open previous section, set all the parameters
    OPENSECTION: (state, res) => {
        var df_index = ["sites", "conc_df"]
        for (var i in res) {
            if (df_index.includes(i)) {
                state[i].df = res[i].df
                state[i].attrs = res[i].attrs
                state[i].table_header = res[i].table_header
            } else if (i == "traj_data") {
                res[i].forEach(j => {
                    var temp = {
                        job_name: j.job_name,
                        df: new dv2_df(),
                    }
                    temp.df = j.df
                    state[i].push(temp)
                })
            } else if (i == "upload_files") {
                // if the section is resumed, no need to load old data files
                state[i] = []
            } else {
                state[i] = res[i]
            }
        }

        // re-initilze new variables

    },
    // generate site summary
    SITESUMMARY: (state) => {
        var site_summary = []
        // console.log(state.sites.df)
        // console.log(state.conc_df.df)
        // console.log(state.traj_data)

        var site_keys = ["site_name", "time_stamp",]
        var wind_keys = ["wind_direction", "wind_speed",]

        state.sites.df.forEach( site => {
            // find out site_name
            var site_name = site.site_name
            // do measurement
            var M = state.conc_df.df.filter((x) => {
                return x.site_name == site_name
            })
            var prev = {}
            var header = state.conc_df.attrs
            var chemical_name = []
            // console.log(header)

            for (var k in header) {
                var h = header[k]
                if ( !site_keys.includes(h.toLowerCase()) && !wind_keys.includes(h.toLowerCase())) {
                    prev[h] = {
                        name: h,
                        record: null,
                        missing: null,
                        mean: 0,
                        max: -9999,
                        min: 9999
                    }
                    chemical_name.push(h)
                }
            }

            // console.log(chemical_name)
            // console.log(prev)

            var chemicals = M.reduce(function (prev, current) {
                for (var k in chemical_name) {
                    var c = chemical_name[k]
                    var value = parseFloat(current[c])
                    if (!isNaN(value)) {
                        prev[c].record += 1
                        prev[c].mean += value
                        if (value > prev[c].max) {
                            prev[c].max = value
                        }
                        if (value < prev[c].min) {
                            prev[c].min = value
                        }
                    } else {
                        prev[c].missing += 1
                    }
                }
                return prev
            }, prev)

            for (var cc in chemicals) {
                chemicals[cc].mean = chemicals[cc].mean / chemicals[cc].record
            }

            // console.log(chemicals)


            var wind = {
                record: 0,
                missing: 0,
            }

            wind = M.reduce(function (prev, current) {
                if (current["wind_speed"] != null && current["wind_direction"] != null) {
                    prev.record += 1
                } else {
                    prev.missing += 1
                }
                return prev
            }, wind)

            // console.log(wind)

            var traj = {
                num: 0,
                jobs: []
            }
            state.traj_data.forEach(t=> {
                var T = t.df.filter((x) => {
                    return x.site_name == site_name
                })
                if (T.length > 0) {
                    traj.num += 1
                    traj.jobs.push(t.job_name)
                }
            })

            var item = {
                site_name: site_name,
                location: [site.lat, site.lon],
                chemicals: chemicals,
                wind: wind,
                traj: traj
            }
            // console.log(item)

            site_summary.push(item)
        })
        // console.log("site_summary", site_summary)

        state.site_summary = site_summary;
    },

    UPDATE_DATA: (state, res) => {
        state[res.name] = res.data;
    },

    MERGE_DATA: () => {

    }

};

export default {
    state,
    getters,
    actions,
    mutations
};

import data_filter from "./data_filter"
import traj_task from "./traj_task"
import {
    erf
} from 'mathjs'

export default class extends data_filter {
    constructor(df = [], fetch = "") {
        super(df, fetch)
        this.traj_task = new traj_task()
    }

    cal_wind_rose(df) {
        var directions = [{
                d: "N",
                lower: 348.75,
                upper: 11.25
            },
            {
                d: "NNE",
                lower: 11.25,
                upper: 33.75
            },
            {
                d: "NE",
                lower: 33.75,
                upper: 56.25
            },
            {
                d: "ENE",
                lower: 56.25,
                upper: 78.75
            },
            {
                d: "E",
                lower: 78.75,
                upper: 101.25
            },
            {
                d: "ESE",
                lower: 101.25,
                upper: 123.75
            },
            {
                d: "SE",
                lower: 123.75,
                upper: 146.25
            },
            {
                d: "SSE",
                lower: 146.25,
                upper: 168.75
            },
            {
                d: "S",
                lower: 168.75,
                upper: 191.25
            },
            {
                d: "SSW",
                lower: 191.25,
                upper: 213.75
            },
            {
                d: "SW",
                lower: 213.75,
                upper: 236.25
            },
            {
                d: "WSW",
                lower: 236.25,
                upper: 258.75
            },
            {
                d: "W",
                lower: 258.75,
                upper: 281.25
            },
            {
                d: "WNS",
                lower: 281.25,
                upper: 303.75
            },
            {
                d: "NW",
                lower: 303.75,
                upper: 326.25
            },
            {
                d: "NNW",
                lower: 326.25,
                upper: 348.75
            }
        ]
        var count = 0
        var wind_F = [{
                text: "Calm",
                speed: 2,
                legend: "<2 m/s",
                color: "#062CFB",
                r: Array(16).fill(0)
            },
            {
                text: "Light air",
                speed: 6,
                legend: "2-6 m/s",
                color: "#17D3FF",
                r: Array(16).fill(0)
            },
            {
                text: "Light breeze",
                speed: 12,
                legend: "6-12 m/s",
                color: "#7DFE7A",
                r: Array(16).fill(0)
            },
            {
                text: "Gentle breeze",
                speed: 19,
                legend: "12-19 m/s",
                color: "#FFE50D",
                r: Array(16).fill(0)
            },
            {
                text: "Moderate breeze",
                speed: 30,
                legend: "19-30 m/s",
                color: "#FFE50D",
                r: Array(16).fill(0)
            },
            {
                text: "Fresh",
                speed: 40,
                legend: "30-40 m/s",
                color: "#810006",
                r: Array(16).fill(0)
            },
            {
                text: "strong",
                speed: 100,
                legend: ">40 m/s",
                color: "#810006",
                r: Array(16).fill(0)
            },
        ]

        // calcualte each bins
        var WD, WS, Dir_index, Level
        for (let i = 0; i < df.length; i++) {
            WD = df[i].wind_dir
            WS = df[i].wind_speed
            if (WD !== null && WS !== null) {
                count += 1
                if (WD > 348.75) {
                    Dir_index = 0
                } else {
                    for (let j = 1; j < directions.length; j++) {
                        if (WD <= directions[j].upper) {
                            Dir_index = j
                            break;
                        }
                    }
                }

                for (let j = 0; j < wind_F.length; j++) {
                    if (WS <= wind_F[j].speed) {
                        Level = j
                        break;
                    }
                }
                wind_F[Level].r[Dir_index] += 1
            }
        }
        // var calm = 0
        // for (let i = 0; i < directions.length; i++) {
        //     calm += wind_F[0].r[i]
        // }
        // for (let i = 0; i < directions.length; i++) {
        //     wind_F[0].r[i]=calm
        // }

        for (let i = 0; i < directions.length; i++) {
            for (let j = 1; j < wind_F.length; j++) {
                if (wind_F[j].r[i] > 0) {
                    wind_F[j].r[i] += wind_F[j - 1].r[i]
                }
            }
        }
        var wind_rose = []
        for (let i = 0; i < wind_F.length; i++) {
            wind_rose.push({
                r: wind_F[i].r.map((x) => {
                    return Math.round(x / count * 100 * 100) / 100
                }),
                theta: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNS", "NW", "NNW"],
                name: wind_F[i].legend,
                marker: {
                    color: wind_F[i].color
                },
                type: "barpolar"
            })
        }
        // console.log(res)
        return wind_rose.reverse()
    }



    async cal_PSCF(res) {
        // data = {
        //     error: 0,
        //     data: [ {alt, lon, lat, conc}],
        //     model: {type, c, traj, weight,  },
        //     chemical: model_chemical,
        //   };

        // TODO: add mutiple site function

        var grid_lat = await this.gene_grid(res.model.grid)

        var c = res.model.c
        var data = res.data
        c = parseInt((1 - c) * data.length)
        data.sort((a, b) => (a.conc > b.conc) ? -1 : 1)

        var lat, lon
        var total = 0
        for (var i = 0; i < data.length; i++) {
            lat = data[i].lat.map(x => {
                return Math.ceil(x / res.model.grid) * res.model.grid
            })
            lon = data[i].lon.map(x => {
                return Math.ceil(x / res.model.grid) * res.model.grid
            })

            for (var j = 0; j < lat.length; j++) {
                if (i < c) {
                    grid_lat[lat[j]][lon[j]].up += 1
                }
                grid_lat[lat[j]][lon[j]].bottom += 1
                grid_lat[lat[j]][lon[j]].count += 1
                total += 1
            }

        }

        var out = await this.cal_res(grid_lat)
        var z = await this.apply_weight(out, total, res.model.weight)
        // console.log(z)
        // console.log(grid_lat)
        return Promise.resolve({
            lat: out.lat,
            lon: out.lon,
            z: z
        })
    }

    async cal_res(grid_lat) {
        var lat = []
        var lon = []
        var z = []
        var count = []
        for (const [key_lat, value_1] of Object.entries(grid_lat)) {
            for (const [key_lon, value_2] of Object.entries(value_1)) {
                var temp = value_2.up / value_2.bottom
                if (!isNaN(temp)) {
                    lat.push(key_lat)
                    lon.push(key_lon)
                    z.push(temp)
                    count.push(value_2.count)
                }
            }
        }
        return {
            lat: lat,
            lon: lon,
            z: z,
            count: count
        }
    }

    async apply_weight(out, total, weight) {
        // weight: [
        //     { n: 0.25, w: 0.1 },
        //     { n: 0.5, w: 0.25 },
        //     { n: 0.75, w: 0.5 },
        //     { n: 1, w: 0.75 },
        //     { n: 1.5, w: 0.9 },
        //   ],
        var z = out.z
        var count = out.count
        total = total / z.length
        weight = weight.map(x => {
            return {
                n: x.n * total,
                w: x.w
            }
        })
        for (var k = 0; k < count.length; k++) {
            for (var w = 0; w < weight.length; w++) {
                if (count[k] < weight[w].n) {
                    z[k] = z[k] * weight[w].w
                    break;
                }
            }
        }
        return z
    }

    async gene_grid(size) {
        // [{lat:[{lon:,z:}]}]
        // lat: [-90,90]
        // lon: [-180,180]
        var grid_lat = {}
        for (var i = 0; i <= 180 / size; i++) {
            var temp = {}
            for (var j = 0; j <= 360 / size; j++) {
                temp[-180 + (j) * size] = {
                    up: null,
                    bottom: null,
                    count:0,
                }
            }
            grid_lat[-90 + (i) * size] = temp
        }
        return grid_lat
    }

    async cal_CFA(res) {
        var grid_lat = await this.gene_grid(res.model.grid)

        var data = res.data
        var lat, lon
        var total = 0
        for (var i = 0; i < data.length; i++) {
            lat = data[i].lat.map(x => {
                return Math.ceil(x / res.model.grid) * res.model.grid
            })
            lon = data[i].lon.map(x => {
                return Math.ceil(x / res.model.grid) * res.model.grid
            })

            for (var j = 0; j < lat.length; j++) {
                grid_lat[lat[j]][lon[j]].up += Math.log10(data[i].conc)
                grid_lat[lat[j]][lon[j]].bottom += 1
                grid_lat[lat[j]][lon[j]].count += 1
                total += 1
            }

        }

        var out = await this.cal_res(grid_lat)
        var z = await this.apply_weight(out, total, res.model.weight)
        return Promise.resolve({
            lat: out.lat,
            lon: out.lon,
            z: z
        })
    }

    async cal_CWT(res) {
        var grid_lat = await this.gene_grid(res.model.grid)

        var data = res.data
        var lat, lon
        var total = 0
        for (var i = 0; i < data.length; i++) {
            lat = data[i].lat.map(x => {
                return Math.ceil(x / res.model.grid) * res.model.grid
            })
            lon = data[i].lon.map(x => {
                return Math.ceil(x / res.model.grid) * res.model.grid
            })

            for (var j = 0; j < lat.length; j++) {
                grid_lat[lat[j]][lon[j]].up += data[i].conc
                grid_lat[lat[j]][lon[j]].bottom += 1
                grid_lat[lat[j]][lon[j]].count += 1
                total += 1
            }
        }
        var out = await this.cal_res(grid_lat)
        var z = await this.apply_weight(out, total, res.model.weight)
        return Promise.resolve({
            lat: out.lat,
            lon: out.lon,
            z: z
        })
    }


    async cal_SQTBA(res) {
        var grid_lat = await this.gene_grid(res.model.grid)

        var data = res.data
        var lat, lon
        var total = 0
        var a = [...Array(data[0].lat.length).keys()]
        a = a.map(x => {
            return 1 / 5.4 / x
        })
        a[0] = 1

        for (var i = 0; i < data.length; i++) {
            lat = data[i].lat.map(x => {
                return Math.ceil(x / res.model.grid) * res.model.grid
            })
            lon = data[i].lon.map(x => {
                return Math.ceil(x / res.model.grid) * res.model.grid
            })
            var lat_0 = data[i].lat[0]
            var lon_0 = data[i].lon[0]
            var v = []
            var T = []
            var m = Infinity
            for (let j = 0; j < lat.length; j++) {
                v = (data[i].lat[j] - lat_0) ** 2 + (data[i].lon[j] - lon_0) ** 2
                T[j] = a[j] / 2 / Math.sqrt(2 * 3.14 * v) * (1 - erf(a[j] * Math.sqrt(v / 2)))
                m = T[j] < m ? T[j] : m
            }
            T[0] = m
            for (let j = 0; j < lat.length; j++) {
                grid_lat[lat[j]][lon[j]].up += data[i].conc * T[j]
                grid_lat[lat[j]][lon[j]].bottom += T[j]
                grid_lat[lat[j]][lon[j]].count += 1
                total += 1
            }
        }
        var out = await this.cal_res(grid_lat)
        var z = await this.apply_weight(out, total, res.model.weight)
        // console.log(z)
        // console.log(grid_lat)
        return Promise.resolve({
            lat: out.lat,
            lon: out.lon,
            z: z
        })
    }


    // cal_mean(arr) {
    //     arr = arr.map(Number);
    //     const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    //     return avg
    // }
}
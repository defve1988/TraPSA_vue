import my_df from "./my_df"
// import my_model from "./my_model"
import my_plot from "./my_plot"
import dateFormat from "dateformat";

export default class my_viz extends my_df {
    constructor() {
        super()
        this.plots = {}
    }

    init_plots(plots) {
        plots.forEach(plot_config => {
            var temp = new my_plot(plot_config)
            this.plots[plot_config["id"]] = temp
        });
    }

    async plot_map(date_index, type) {
        var res = this.gene_map_data(date_index, type);
        // console.log(res)

        var trace = [];
        trace = [{
            type: "scattermapbox",
            name: res.map((x) => x.name),
            text: res.map((x) => x.text),
            lon: res.map((x) => x.lon),
            lat: res.map((x) => x.lat),
            marker: {
                color: res.map((x) => x.color),
                size: res.map((x) => x.size),
                opacity: res.map((x) => x.op),
            },
            showlegend: false,
        }, ];
        // console.log(this.plots)
        this.plots["g_map"].update_map(trace);
    }

    gene_map_data(date, type) {
        if (type == "all") type = ["case", "recover", "death"]
        else type = [type]
        var res = []
        var df = this.df
        var color = {
            case: "#E65100",
            recover: "#4CAF50",
            death: "#4d0000",
            active: "#FF8F00",
        }
        var op = {
            case: 0.5,
            recover: 0.7,
            active: 0.7,
            death: 0.8,
        }

        type.forEach(t => {
            df.forEach(row => {
                row.location.forEach(l => {
                    if (t in row.data[l.name]) {
                        var name = l.name == "tot" ? row.country : l.name
                        var temp = {
                            lat: Math.floor(Number(l.lat) * 100) / 100,
                            lon: Math.floor(Number(l.lon) * 100) / 100,
                            text: name + ": " + t + ", " + row.data[l.name][t][date],
                            color: color[t],
                            size: Math.log2(row.data[l.name][t][date]) + 2,
                            op: op[t]
                        }
                        res.push(temp)
                    }
                })
            })
        })

        // console.log(res)
        return res
    }

    gene_daily_data(country, isDaily, type) {

        var df = this.df
        var x = [],
            y = [],
            y_daily = [],
            prev = 0;

        var Case = {
            name: "Case",
            x: x,
            y: [],
            marker: {
                color: "#E65100",
                opacity: 0.8
            },
            type: isDaily ? 'bar' : 'scatter'
        };

        var Recover = {
            name: "Recover",
            x: x,
            y: [],
            marker: {
                color: "#4CAF50",
                opacity: 0.8
            },
            type: isDaily ? 'bar' : 'scatter'
        };

        var Active = {
            name: "Recover",
            x: x,
            y: [],
            marker: {
                color: "#FF8F00",
                opacity: 0.8
            },
            type: isDaily ? 'bar' : 'scatter'
        };

        var Death = {
            name: "Death",
            x: x,
            y: [],
            marker: {
                color: "#FF1744",
                opacity: 0.8
            },
            type: isDaily ? 'bar' : 'scatter'
        };

        if (country == "Worldwide") {
            x = []
            y = []
            y_daily = []
            for (const [key, ] of Object.entries(df[177]["data"]["tot"]["case"])) {
                x.push({
                    key: key,
                    axis: dateFormat(new Date(key), "yyyy-mm-dd")
                })
                y.push(0)
                y_daily.push(0)
            }

            df.forEach(row => {
                prev = 0
                x.forEach((d, index) => {
                    y[index] += row["data"]["tot"]["case"][d.key]
                    y_daily[index] = y_daily[index] + row["data"]["tot"]["case"][d.key] - prev
                    prev = row["data"]["tot"]["case"][d.key]
                })
            })

            Case.y = isDaily ? y_daily : y
            Case.x = x.map(x => x.axis)

            x = []
            y = []
            y_daily = []
            for (const [key, ] of Object.entries(df[177]["data"]["tot"]["death"])) {
                x.push({
                    key: key,
                    axis: dateFormat(new Date(key), "yyyy-mm-dd")
                })
                y.push(0)
                y_daily.push(0)
            }

            df.forEach(row => {
                prev = 0
                x.forEach((d, index) => {
                    y[index] += row["data"]["tot"]["death"][d.key]
                    y_daily[index] = y_daily[index] + row["data"]["tot"]["death"][d.key] - prev
                    prev = row["data"]["tot"]["death"][d.key]
                })
            })

            Death.y = isDaily ? y_daily : y
            Death.x = x.map(x => x.axis)

            x = []
            y = []
            y_daily = []
            for (const [key, ] of Object.entries(df[177]["data"]["tot"]["recover"])) {
                x.push({
                    key: key,
                    axis: dateFormat(new Date(key), "yyyy-mm-dd")
                })
                y.push(0)
                y_daily.push(0)
            }

            df.forEach(row => {
                prev = 0
                x.forEach((d, index) => {
                    y[index] += row["data"]["tot"]["recover"][d.key]
                    y_daily[index] = y_daily[index] + row["data"]["tot"]["recover"][d.key] - prev
                    prev = row["data"]["tot"]["recover"][d.key]
                })
            })

            Recover.y = isDaily ? y_daily : y
            Recover.x = x.map(x => x.axis)

            x = []
            y = []
            y_daily = []
            for (const [key, ] of Object.entries(df[177]["data"]["tot"]["active"])) {
                x.push({
                    key: key,
                    axis: dateFormat(new Date(key), "yyyy-mm-dd")
                })
                y.push(0)
                y_daily.push(0)
            }

            df.forEach(row => {
                prev = 0
                x.forEach((d, index) => {
                    y[index] += row["data"]["tot"]["active"][d.key]
                    y_daily[index] = y_daily[index] + row["data"]["tot"]["active"][d.key] - prev
                    prev = row["data"]["tot"]["active"][d.key]
                })
            })

            Active.y = isDaily ? y_daily : y
            Active.x = x.map(x => x.axis)

        } else {
            var temp = df.filter(x => x.country == country)
            temp = temp[0]

            y = []
            x = []
            y_daily = []
            prev = 0
            for (const [key, value] of Object.entries(temp["data"]["tot"]["case"])) {
                x.push(dateFormat(new Date(key), "yyyy-mm-dd"))
                y.push(value)
                y_daily.push(value - prev)
                prev = value
            }
            Case.y = isDaily ? y_daily : y
            Case.x = x

            y = []
            x = []
            y_daily = []
            prev = 0
            for (const [key, value] of Object.entries(temp["data"]["tot"]["death"])) {
                x.push(dateFormat(new Date(key), "yyyy-mm-dd"))
                y.push(value)
                y_daily.push(value - prev)
                prev = value
            }
            Death.y = isDaily ? y_daily : y
            Death.x = x

            y = []
            x = []
            y_daily = []
            prev = 0
            for (const [key, value] of Object.entries(temp["data"]["tot"]["recover"])) {
                x.push(dateFormat(new Date(key), "yyyy-mm-dd"))
                y.push(value)
                y_daily.push(value - prev)
                prev = value
            }
            Recover.y = isDaily ? y_daily : y
            Recover.x = x

            y = []
            x = []
            y_daily = []
            prev = 0
            for (const [key, value] of Object.entries(temp["data"]["tot"]["active"])) {
                x.push(dateFormat(new Date(key), "yyyy-mm-dd"))
                y.push(value)
                y_daily.push(value - prev)
                prev = value
            }
            Active.y = isDaily ? y_daily : y
            Active.x = x
        }
        // console.log(Case, Recover, Death)

        switch (type) {
            case "all":
                return [Case, Recover, Death]
            case "case":
                return [Case]
            case "recover":
                return [Recover]
            case "death":
                return [Death]
            case "active":
                return [Active]
        }
    }
}

// NOTE: example 1
// this.df = new my_df();
// var csv_file =
//   "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv";

// await this.df.fetch_csv(csv_file);
// var date_range = this.df.date_format.getDaysArray(
//   "1/22/2020",
//   "10/3/2020",
//   "m/d/yy"
// );
// await this.df.add_new_col("total", date_range);
// await this.df.replace_missing("");
// console.log(this.df.get_col("total"));
// console.log(this.df.filter_col("Province_State", ["Alabama"]));
// console.log(this.df.group_by_col("Province_State", "9/29/20", "mean"));

// NOTE: example 2
// var json_file =
// "https://raw.githubusercontent.com/defve1988/glfmsp/master/src/assets/data.json";
// await this.df.fetch_json(json_file);
// await this.df.replace_missing("");
// console.log(this.df.df);
// this.df.filter_col("Year", ["2004"]);
// console.log(this.df.filter_col("Year", ["2004"]));
// console.log(this.df.group_by_col("Site", "Hg", "mean"));
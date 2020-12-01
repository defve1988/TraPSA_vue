import Plotly from 'plotly.js'

// import * as d3 from 'd3'

function covert_rgb(hex, alpha) {
    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${alpha})`;
}

export default class PlotCase {
    constructor(case_name) {
        this.case_name = case_name;

        this.small_fig = { width: 300, height: 180 }
        this.medium_fig = { width: 750, height: 400 }
        this.large_fig = { width: 1180, height: 600 }

        this.small_margin = { r: 20, t: 25, b: 25, l: 20 }
        this.medium_margin = { r: 20, t: 50, b: 25, l: 20 }
        this.large_margin = { r: 100, t: 50, b: 75, l: 125 }

        this.color_theme = [
            '1E88E5',
            '28965A',
            'E53E20',
            '7CB342',
            'd95282',
            'FBC02D',
            '00B8DC',
            '232322',
            'AAAAAA',
        ]

        this.plotly_config = {
            small: {
                displaylogo: false,
                responsive: true,
                displayModeBar: false,
                staticPlot: true
            },
            medium: {
                displaylogo: false,
                responsive: true,
                displayModeBar: false,
                staticPlot: false,
            },
            large: {
                displaylogo: false,
                responsive: true,
                displayModeBar: false,
                staticPlot: false,
                editable: true
            }
        };

        this.layout_default = {
            small: {
                margin: this.small_margin,
                width: this.small_fig.width,
                height: this.small_fig.height,
                font: { size: 10 },
                showlegend: false,
                autosize: true,
            },
            medium: {
                margin: this.medium_margin,
                width: this.medium_fig.width,
                height: this.medium_fig.height,
                font: { size: 14 },
                showlegend: true,
                legend: { font: { size: 12 }, xanchor: "auto", yanchor: "auto", x: 1, y: 0 },
                autosize: true,
            },
            large: {
                margin: this.large_margin,
                width: this.large_fig.width,
                height: this.large_fig.height,
                font: { size: 14 },
                showlegend: true,
                legend: { font: { size: 12 }, xanchor: "auto", yanchor: "auto", x: 1, y: 0 },
                autosize: true,
            }
        }
    }

    clear(my_div) {
        Plotly.purge(my_div)
    }

    save_image(my_div, file_name) {
        Plotly.toImage(
            my_div, {
            format: 'png',
            height: 800,
            width: 1200,
        }).then(
            function (url) {
                var pom = document.createElement("a");
                pom.href = url;
                pom.setAttribute("download", file_name+".png");
                pom.click();
            });
    }

    set_fig_size(type, fig_size, fig_margin) {
        // fig_size:{width:100,height:200}
        // fig_margin: { r: 20, t: 25, b: 25, l: 20 }
        if (type == "small") {
            this.layout_default.small.width = fig_size.width
            this.layout_default.small.height = fig_size.height
            this.layout_default.small.margin = fig_margin
        }
        else if (type == "medium") {
            this.layout_default.medium.width = fig_size.width
            this.layout_default.medium.height = fig_size.height
            this.layout_default.medium.margin = fig_margin
        }
        else {
            this.layout_default.large.width = fig_size.width
            this.layout_default.large.height = fig_size.height
            this.layout_default.large.margin = fig_margin
        }
    }

    set_layout(type, layout_config) {
        if (type == "small") {
            return Object.assign(this.layout_default.small, layout_config)
        }
        else if (type == "medium") {
            return Object.assign(this.layout_default.medium, layout_config)
        }
        else {
            return Object.assign(this.layout_default.large, layout_config)
        }
    }

    set_title(my_div, title) {
        var update = {
            title: title
        }
        Plotly.relayout(my_div, update)
    }

    plot_hist(my_div, data, type, layout_config = {}) {
        var color_count = 0
        var trace_data = []
        for (const [index, d] of data.entries()) {
            trace_data.push(
                {
                    x: d.x,
                    name: d.chemical,
                    autobinx: true,
                    histnorm: "count",
                    marker: {
                        color: covert_rgb(this.color_theme[(index + color_count) % 9], 1),
                        line: {
                            color: covert_rgb(this.color_theme[(index + color_count) % 9], 1),
                            width: 1
                        }
                    },
                    opacity: 0.7,
                    type: "histogram",
                })
        }
        var fig_layout_config = {
            bargap: 0.05,
            bargroupgap: 0.2,
            barmode: "overlay",
            title: type == "small" ? "" : "Histgram",
            xaxis: type == "small" ? {} : { title: "Value" },
            yaxis: type == "small" ? {} : { title: "Count" }
        }
        Object.assign(fig_layout_config, layout_config)
        var layout = this.set_layout(type, fig_layout_config)
        Plotly.newPlot(my_div, trace_data, layout, this.plotly_config[type]);
    }

    plot_line(my_div, data, type, layout_config = {}) {
        var color_count = 1
        var trace_data = []
        for (const [index, d] of data.entries()) {
            trace_data.push(
                {
                    mode: "lines",
                    name: d.chemical,
                    x: d.x,
                    y: d.y,
                    connectgaps: false,
                    line: { color: covert_rgb(this.color_theme[(index + color_count) % 9], 0.7) },
                    marker: {
                        size: type == "small" ? 2 : 5,
                        color: covert_rgb(this.color_theme[index], 0.7)
                    },
                }
            )
        }
        var fig_layout_config = {
            title: type == "small" ? "" : "Time Series",
            xaxis: type == "small" ? { type: 'date', tickformat: '%b %Y' } : { title: "Date", type: 'date', tickformat: '%b-%d %Y' },
            yaxis: type == "small" ? {} : { title: "Conc." },
        }
        Object.assign(fig_layout_config, layout_config)
        var layout = this.set_layout(type, fig_layout_config)

        Plotly.newPlot(my_div, trace_data, layout, this.plotly_config[type]);
    }

    plot_averaged_box(my_div, data, type, avg_type, layout_config = {}) {
        var box_data = []
        var color = ''
        var title = ''
        var x_title = ''
        var x_tickes = []

        for (const [index, d] of data.entries()) {
            var trace_data = []
            switch (avg_type) {
                case "monthly":
                    trace_data = d.x.map(x => x.getMonth())
                    title = "Monthly"
                    x_title = "month"
                    color = covert_rgb(this.color_theme[(index + 2) % 9], 0.7)
                    x_tickes = Array.from(Array(12).keys())
                    break
                case "diel":
                    trace_data = d.x.map(x => x.getHours())
                    title = "Diel"
                    x_title = "hour"
                    color = covert_rgb(this.color_theme[(index + 3) % 9], 0.7)
                    x_tickes = Array.from(Array(24).keys())
                    break
                case "weekday":
                    trace_data = d.x.map(x => x.getDay())
                    title = "Weekday"
                    x_title = "weekday"
                    color = covert_rgb(this.color_theme[(index + 4) % 9], 0.7)
                    x_tickes = Array.from(Array(7).keys())
                    break
            }

            box_data.push({
                x: trace_data,
                y: d.y,
                name: d.chemical,
                marker: {
                    color: color,
                    outliercolor: 'rgba(219, 64, 82, 0.6)',
                    line: {
                        outliercolor: 'rgba(219, 64, 82, 1.0)',
                    }
                },
                type: 'box',
                boxpoints: 'Outliers'
            })

        }

        var fig_layout_config = {
            boxmode: 'group',
            title: type == "small" ? "" : title,
            xaxis: type == "small" ? { tickvals: x_tickes, ticktext: x_tickes } : { title: x_title, tickvals: x_tickes, ticktext: x_tickes },
            yaxis: type == "small" ? {} : { title: "Conc." },
        }
        Object.assign(fig_layout_config, layout_config)
        var layout = this.set_layout(type, fig_layout_config)

        Plotly.newPlot(my_div, box_data, layout, this.plotly_config[type]);
    }

    plot_trend(my_div, data, type, layout_config = {}) {
        var color_count = 5
        var trace_data = []
        for (const [index, d] of data.entries()) {
            trace_data.push(
                {
                    type: "scatter",
                    mode: "markers",
                    name: d.chemical,
                    x: d.x,
                    y: d.y,
                    connectgaps: false,
                    line: { color: covert_rgb(this.color_theme[(index + color_count) % 9], 0.5) },
                    trendline: 'ols',
                    marker: {
                        size: type == "small" ? 2 : 5,
                        color: covert_rgb(this.color_theme[index], 0.7)
                    },
                }
            )
            trace_data.push(
                {
                    type: "scatter",
                    mode: "lines",
                    name: d.chemical,
                    x: [new Date(d.lr.line.x1), new Date(d.lr.line.x2)],
                    y: [d.lr.line.y1, d.lr.line.y2],
                    connectgaps: false,
                    line: { color: covert_rgb(this.color_theme[(index + color_count) % 9], 1) },
                }
            )
        }
        var fig_layout_config = {
            title: type == "small" ? "" : "Trend",
            xaxis: type == "small" ? { type: 'date', tickformat: '%b %Y' } : { title: "Date", type: 'date', tickformat: '%b-%d %Y' },
            yaxis: type == "small" ? {} : { title: "Conc." },
        }
        Object.assign(fig_layout_config, layout_config)
        var layout = this.set_layout(type, fig_layout_config)

        Plotly.newPlot(my_div, trace_data, layout, this.plotly_config[type]);
    }

    plot_windrose(my_div, data, type, layout_config = {}) {
        let d = ["North", "NNE", "NE", "ENE", "East", "ESE", "SE", "SSE", "South", "SSW", "SW", "WSW", "West", "WNS", "NW", "NNW"]

        if (data == null) {
            data = [{
                r: new Array(16).fill(0),
                theta: d,
                type: "barpolar"
            },
            ]
        }

        var fig_layout_config = {
            title: type == "small" ? "" : "Wind Rose",
            polar: {
                barmode: "overlay",
                bargap: 0,
                radialaxis: { ticksuffix: "%", angle: 45, dtick: 5 },
                angularaxis: { direction: "clockwise" },
            }
        }
        Object.assign(fig_layout_config, layout_config)
        var layout = this.set_layout(type, fig_layout_config)

        Plotly.newPlot(my_div, data, layout, this.plotly_config[type]);

    }

    plot_cpf(my_div, data, type, layout_config = {}) {
        var trace_data = [data.high, data.all]
        var fig_layout_config = {
            title: type == "small" ? "" : "CPF Analysis",
            polar: {
                radialaxis: { ticksuffix: "%", angle: 45, dtick: 5 },
                angularaxis: { direction: "clockwise" },
            }
        }
        Object.assign(fig_layout_config, layout_config)
        var layout = this.set_layout(type, fig_layout_config)

        Plotly.newPlot(my_div, trace_data, layout, this.plotly_config[type]);
    }

    plot_cbpf(my_div, data, type, layout_config = {}) {
        var fig_layout_config = {
            title: type == "small" ? "" : "CBPF Analysis",
            polar: {
                bgcolor: '#162876',
                radialaxis: { ticksuffix: "%", angle: 45, dtick: 5 },
                angularaxis: {
                    direction: "clockwise",
                    tickwidth: 2,
                    linewidth: 3,
                    layer: "above traces"
                },
            }
        }
        Object.assign(fig_layout_config, layout_config)
        var layout = this.set_layout(type, fig_layout_config)

        Plotly.newPlot(my_div, data, layout, this.plotly_config[type]);
    }
}

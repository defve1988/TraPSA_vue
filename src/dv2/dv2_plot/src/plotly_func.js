import Plotly from 'plotly.js'
import utlity from '../../utlity.js'


export default class {
    // default plotly settings
    config = {
        displaylogo: false,
        responsive: true,
        displayModeBar: false,
        staticPlot: false,
        editable: false,
        mapboxAccessToken: "pk.eyJ1IjoiZGVmdmUxOTg4IiwiYSI6ImNrNzNzZmN3dzBmMnMzZ3FvMzJ0MDRpa2QifQ.xLG4lim5AonGbkDtgP9-5A",
    }
    // NOTE: if the parameter are previously set, we can access them directly in future
    // like : this.layout.mapbox.style = 'dark'
    layout = {
        // figure size related
        width: 200,
        height: 200,
        autosize: true,
        margin: {
            r: 0,
            t: 0,
            b: 0,
            l: 0
        },
        // title
        title: "",
        // axis
        xaxis: {
            title: "",
            titlefont: {
                size: 10,
                family: '',
                color: 'black'
            },
            showticklabels: true,
            showline: true,
            showgrid: true,
            zeroline: true,
            autotick: true,
        },
        yaxis: {
            title: "",
            titlefont: {
                size: 10,
                family: '',
                color: 'black'
            },
            showticklabels: true,
            showline: true,
            showgrid: true,
            zeroline: true,
            autotick: true,
        },
        // font
        font: {
            size: 14,
            family: '',
            color: 'black'
        },
        // legend
        showlegend: false,
        legend: {
            font: {
                size: 10,
                family: '',
                color: 'black'
            },
            xanchor: "auto",
            yanchor: "auto",
            x: 1,
            y: 0
        },
        // color bar
        coloraxis: {
            colorscale: "hot",
            reversescale: false,
            colorbar: {
                xanchor: "right",
                yanchor: "top",
                x: 1,
                y: 1,
                len: 0.3
            },
        },
        // others
        dragmode: "zoom",
        bargap: 0.05,
        bargroupgap: 0.2,
        barmode: "overlay",
        // map box style
        mapbox: {
            style: "light",
            center: {
                lat: 0,
                lon: 0
            },
            zoom: 2,
        },

    }

    constructor(div, fig_type) {
        this.div = div
        this.fig_type = fig_type
        this.trace = []

        // this.set_fig()
    }

    hex2rgba(hex, alpha) {
        // convert hex color to rgba
        hex = hex.substring(1, )
        if (hex.length === 3) {
            hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r},${g},${b},${alpha})`;
    }
    

    set_trace(trace) {
        this.trace = this.trace.concat(trace)
    }

    plot_new(trace = this.trace, animated = false, animate_x = false) {
        if (animated) {
            var start_trace = []
            trace.forEach(t => {
                var temp = {}
                for (const [key, value] of Object.entries(t)) {
                    temp[key] = value
                }
                if (animate_x) {
                    temp.x = temp.x.map(x => x == null ? null : 0)
                }
                temp.y = temp.y.map(x => x == null ? null : 0)
                start_trace.push(temp)
            })
            Plotly.newPlot(this.div, start_trace, this.layout, this.config);
            Plotly.animate(this.div, {
                data: trace,
                traces: Array.from(Array(trace.length).keys()),
            }, {
                transition: {
                    duration: 1000,
                    easing: 'cubic-in-out'
                },
            })
        } else {
            Plotly.newPlot(this.div, trace, this.layout, this.config);
        }
    }

    async add_trace(trace = this.trace) {
        return Plotly.addTraces(this.div, trace);
    }

    set_layout(layout) {
        utlity.deep_merge(this.layout, layout)
    }

    set_config(config) {
        utlity.deep_merge(this.config, config)
    }

    update_layout() {
        // must be plot first
        Plotly.relayout(this.div, this.layout);
    }

    update_style(new_style){
        Plotly.restyle(this.div, new_style);
    }

    clear_image() {
        Plotly.purge(this.div)
    }

    save_image(file_name) {
        Plotly.toImage(
            this.div, {
                format: 'png',
                height: 800,
                width: 1200,
            }).then(
            function (url) {
                var pom = document.createElement("a");
                pom.href = url;
                pom.setAttribute("download", file_name + ".png");
                pom.click();
            });
    }

    del_trace(index) {
        Plotly.deleteTraces(this.div, index)
    }

    set_fig(fig_type = this.fig_type) {
        switch (fig_type) {
            case "thumb":
                this.config.staticPlot = true
                this.layout.showlegend = false
                this.layout.xaxis.showticklabels = false;
                this.layout.yaxis.showticklabels = false;
                this.layout.xaxis.zeroline = false;
                this.layout.height = 180
                this.layout.width = 300
                this.layout.margin = {
                    r: 20,
                    t: 25,
                    b: 25,
                    l: 20
                }
                break
            case "small":
                this.config.staticPlot = true
                this.layout.showlegend = false
                this.layout.xaxis.showticklabels = false;
                this.layout.yaxis.showticklabels = false;
                this.layout.xaxis.zeroline = false;
                this.layout.height = 180
                this.layout.width = 300
                this.layout.margin = {
                    r: 20,
                    t: 25,
                    b: 25,
                    l: 20
                }
                break
            case "meduim":
                this.layout.height = 400
                this.layout.width = 800
                this.layout.margin = {
                    r: 20,
                    t: 50,
                    b: 25,
                    l: 20
                }
                break
            case "large":
                this.config.editable = true
                this.layout.height = 600
                this.layout.width = 1200
                this.layout.margin = {
                    r: 100,
                    t: 50,
                    b: 75,
                    l: 125
                }
                break
        }

    }
}
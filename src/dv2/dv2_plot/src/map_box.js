import plotly_func from "./plotly_func"
import {
    mean
} from "mathjs";

const default_marker = {
    color: "rgb(0, 150, 100)",
    size: 12,
    opacity: 0.5
}

export default class extends plotly_func {
    color_theme = [
        '#1E88E5',
        '#28965A',
        '#E53E20',
        '#7CB342',
        '#d95282',
        '#FBC02D',
        '#00B8DC',
        '#232322',
        '#AAAAAA',
    ]
    constructor(div, fig_type) {
        super(div, fig_type)
        this.clear_image()
    }

    async gen_dots(data, marker = null, show_text = null, update = true, plot = true) {
        // gen one group of dots 
        if (marker == null) {
            marker = default_marker
        }
        var trace = [{
            type: "scattermapbox",
            text: data.text,
            lon: data.lon,
            lat: data.lat,
            hovertemplate: '%{text}<br>' +
                '%{lat:.2f}, %{lon:.2f}' +
                '<extra></extra>',
            hoverlabel: {
                bgcolor: "rgba(70,70,70,1)"
            },
            marker: marker
        }];

        if (show_text != null) {
            trace = trace.map(x => {
                x.mode = 'markers+text',
                    x.textposition = show_text;
                return x
            })
        }

        if (data.lon.length > 0) {
            this.layout.mapbox.zoom = 4
            this.layout.mapbox.center = {
                lat: mean(data.lat),
                lon: mean(data.lon)
            }
        }
        if (update) this.trace = this.trace.concat(trace)
        if (plot) this.plot_new()
        // console.log(trace)
        return trace
    }

    async plot_map_scatter(data, update = true) {
        var trace = [];
        trace = [{
            type: "scattermapbox",
            name: data.map((x) => x.name),
            text: data.map((x) => x.text),
            lon: data.map((x) => x.lon),
            lat: data.map((x) => x.lat),
            hovertemplate: '%{text}<br>' +
                '%{lat:.2f}, %{lon:.2f}' +
                '<extra></extra>',
            hoverlabel: {
                bgcolor: "rgba(70,70,70,1)"
            },
            marker: {
                color: data.map((x) => x.color),
                size: data.map((x) => x.size),
                opacity: data.map((x) => x.op),
            },
            showlegend: false,
        }, ];
        if (update) {
            this.trace = trace
            this.add_trace()
            this.del_trace(0)
        } else {
            this.trace = this.trace.concat(trace)
            this.plot_new()
        }
    }

    async plot_heat_map(data,radius=15, opacity=0.8) {
        data = [{
            type: "densitymapbox",
            lon: data.lon,
            lat: data.lat,
            z: data.z,
            coloraxis: 'coloraxis',
            radius: radius,
            opacity:opacity
        }, ];
        return this.add_trace(data)
    }

}
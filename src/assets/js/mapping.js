import Plotly from 'plotly.js'

export default class Mapping {
    constructor(div_name) {
        this.div = div_name
        this.layout = {
            dragmode: "zoom",
            margin: { r: 0, t: 0, b: 0, l: 0 },
            width: 800,
            height: 600,
            font: { size: 14 },
            showlegend: true,
            legend: {
                font: { size: 12 },
                xanchor: "auto",
                yanchor: "auto",
                x: 1,
                y: 0
            },
            coloraxis: {
                // colorscale: "Viridis",
                colorbar: {
                    xanchor: "right",
                    yanchor: "top",
                    x: 1,
                    y: 1,
                    len: 0.3
                },
            },
            autosize: true,
        }
        this.config = {
            mapboxAccessToken: "pk.eyJ1IjoiZGVmdmUxOTg4IiwiYSI6ImNrNzNzZmN3dzBmMnMzZ3FvMzJ0MDRpa2QifQ.xLG4lim5AonGbkDtgP9-5A",
            displaylogo: false,
            responsive: true,
            displayModeBar: false,
            editable: true
        };
    }

    // init layout, not redraw
    set_layout(layout) {
        Object.assign(this.layout, layout)
    }
    // init config, not redraw
    set_config(config) {
        Object.assign(this.config, config)
    }
    
    // update mapbox config and redraw
    update_map(map_config) {
        this.layout.mapbox = Object.assign(this.layout.mapbox, map_config)
        Plotly.relayout(this.div, this.layout);
    }

    // update layout and redraw
    update_layout(layout) {
        this.set_layout(layout)
        Plotly.relayout(this.div, layout);
    }

    // add new data trace
    add_trace(data) {
        Plotly.addTraces(this.div, data);
    }

    // init map
    plot_map(map_config) {
        this.set_layout({ mapbox: map_config })
        Plotly.newPlot(this.div, [{
            type: "scattermapbox",
        }], this.layout, this.config);
    }

    // plot dots with text (location = show_text)
    plot_dot(lat, lon, text, show_text = null) {
        var data = [
            {
                type: "scattermapbox",
                text: text,
                lon: lon,
                lat: lat,
                marker: { color: "rgb(0, 150, 100)", size: 12, opacity: 0.5 }
            }
        ];

        if (show_text!=null) {
            data = data.map(x => { 
                x.mode = 'markers+text', 
                x.textposition = show_text; 
                return x })
        }

        var map_config = {
            zoom: 4,
            center: { lat: cal_mean(lat), lon: cal_mean(lon) }
        }
        this.add_trace(data)
        this.update_map(map_config)
        this.update_layout({ showlegend: false })
    }


    plot_heat_map(data) {
        data = [
            {
                type: "densitymapbox",
                lon: data.lon,
                lat: data.lat,
                z: data.z,
                radius: 25,
                coloraxis: 'coloraxis'
            },
        ];
        this.add_trace(data)
    }

    cal_PSCF(res) {
        // data = {
        //     error: 0,
        //     data: [ {alt, lon, lat, conc}],
        //     model: {type, c, traj, weight,  },
        //     chemical: model_chemical,
        //   };
        var weight = res.model.weight
        var grid_lat = this.gene_grid(res.model.grid)
        var c = res.model.c
        var data = res.data
        c = parseInt((1 - c) * data.length)
        data.sort((a, b) => (a.conc > b.conc) ? -1 : 1)
        // TODO: correct the grid
        var lat, lon
        var total = 0
        for (var i = 0; i < data.length; i++) {
            lat = data[i].lat.map(x => { return Math.ceil(x) })
            lon = data[i].lon.map(x => { return Math.ceil(x) })
            for (var j = 0; j < lat.length; j++) {
                if (i < c) {
                    grid_lat[lat[j]][lon[j]].up += 1
                }
                grid_lat[lat[j]][lon[j]].bottom += 1
                total += 1
            }

        }
        lat = []
        lon = []
        var z = []
        var count = []
        for (const [key_lat, value_1] of Object.entries(grid_lat)) {
            for (const [key_lon, value_2] of Object.entries(value_1)) {
                var temp = value_2.up / value_2.bottom
                if (!isNaN(temp)) {
                    lat.push(key_lat)
                    lon.push(key_lon)
                    z.push(temp)
                    count.push(value_2.bottom)
                }
            }
        }

        // weight: [
        //     { n: 0.25, w: 0.1 },
        //     { n: 0.5, w: 0.25 },
        //     { n: 0.75, w: 0.5 },
        //     { n: 1, w: 0.75 },
        //     { n: 1.5, w: 0.9 },
        //   ],
        total = total / z.length
        weight = weight.map(x => { return { n: x.n * total, w: x.w } })
        console.log(weight)
        console.log(count)
        for (var k = 0; k < count.length; k++) {
            for (var w = 0; w < weight.length; w++) {
                if (count[k] < weight[w].n) {
                    z[k] = z[k] * weight[w].w
                    break;
                }
            }
        }
        return { lat: lat, lon: lon, z: z }
    }

    gene_grid(size) {
        // [{lat:[{lon:,z:}]}]
        // lat: [-90,90]
        // lon: [-180,180]
        var grid_lat = {}
        for (var i = 0; i < 180 / size; i++) {
            var temp = {}
            for (var j = 0; j < 360 / size; j++) {
                temp[-180 + (j + 1) * size] = {
                    up: null, bottom: null
                }
            }
            grid_lat[-90 + (i + 1) * size] = temp
        }
        return grid_lat
    }

    save_image(file_name = "map") {
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
}

function cal_mean(arr) {
    arr = arr.map(Number);
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    return avg
}
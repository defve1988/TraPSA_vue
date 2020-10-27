import Plotly from 'plotly.js'
import * as d3 from 'd3'

const config = {
    mapboxAccessToken: "pk.eyJ1IjoiZGVmdmUxOTg4IiwiYSI6ImNrNzNzZmN3dzBmMnMzZ3FvMzJ0MDRpa2QifQ.xLG4lim5AonGbkDtgP9-5A",
    displaylogo: false,
    responsive: true,
    displayModeBar: false
};

function plot_borderline(div_name, dots) {
    console.log(dots)
    var svg = d3.select('#' + div_name)
        .html("").append("svg").attr("viewBox", "0 0 1000 1000").attr("preserveAspectRatio", "xMinYMin meet");
    var projection = d3.geoEqualEarth().rotate([90, 0, 0]);
    var path = d3.geoPath().projection(projection);

    var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
    // url ="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    var data_url = "http://enjalot.github.io/wwsd/data/world/ne_50m_populated_places_simple.geojson";

    Promise.all([d3.json(url), d3.json(data_url)]).then(function (data) {
        var world = data[0];
        var places = data[1];

        console.log(places)

        svg.append("path")
            .attr("d", path(world))
            .attr("fill", "lightgray")
            .attr("stroke", "white");

        // svg.selectAll("circle")
        //     .data(places.features)
        //     .enter()
        //     .append("circle")
        //     .attr("r", function (d) {
        //         return d.properties.pop_max / 1000000;
        //     })
        //     .attr("cx", function (d) {
        //         return projection(d.geometry.coordinates)[0]
        //     })
        //     .attr("cy", function (d) {
        //         return projection(d.geometry.coordinates)[1]
        //     })
        //     .attr("fill", "darkgreen")
        //     .attr("opacity", 0.5)

        // window.setTimeout(function () {
        //     svg.selectAll("circle")
        //         .transition().duration(5000)
        //         .attr("r", function (d) {
        //             return d.properties.pop_min / 1000000;
        //         });
        // }, 5000);
    });
}

function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}

function cal_mean(arr) {
    arr = arr.map(Number);
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    return avg
}


function plot_map_dot(div_name, map_config, dots, dot_labels = { site_name: "site_name", lat: "lat", lon: "lon" }) {
    if (map_config == "outline") {
        plot_borderline(div_name, dots)
    }
    else {
        // console.log(dots)
        var data = [{
            type: "scattermapbox",
        }];
        if (dots.data.length > 0) {
            // TODO: more flexible to unpack, more color, more style, use a wigdet to control all the style
            data = [
                {
                    type: "scattermapbox",
                    text: unpack(dots.data, dot_labels.site_name),
                    lon: unpack(dots.data, dot_labels.lon),
                    lat: unpack(dots.data, dot_labels.lat),
                    marker: { color: "rgb(0, 150, 100)", size: 12, opacity: 0.5 }
                }
            ];
            map_config.zoom = 4
            map_config.center = { lat: cal_mean(data[0].lat), lon: cal_mean(data[0].lon) }

        }

        var layout = {
            dragmode: "zoom",
            mapbox: map_config,
            margin: { r: 0, t: 0, b: 0, l: 0 },
            autosize: true,
        };

        Plotly.newPlot(div_name, data, layout, config);
    }

}


export default { plot_map_dot }
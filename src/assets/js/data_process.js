export default {
    linearRegression,
    getStandardDeviation,
    cal_period_avg,
    sen_slope,
    data_filter,
    data_reduce,
    data_merge,
    data_cal_windrose,
    data_filter_2,
    data_cal_cpf,
    data_cal_pscf
}

function data_cal_pscf() {

}

function data_cal_cpf(measurement, wind, threshold = 0.7) {
    var directions = [
        { d: "N", lower: 348.75, upper: 11.25 },
        { d: "NNE", lower: 11.25, upper: 33.75 },
        { d: "NE", lower: 33.75, upper: 56.25 },
        { d: "ENE", lower: 56.25, upper: 78.75 },
        { d: "E", lower: 78.75, upper: 101.25 },
        { d: "ESE", lower: 101.25, upper: 123.75 },
        { d: "SE", lower: 123.75, upper: 146.25 },
        { d: "SSE", lower: 146.25, upper: 168.75 },
        { d: "S", lower: 168.75, upper: 191.25 },
        { d: "SSW", lower: 191.25, upper: 213.75 },
        { d: "SW", lower: 213.75, upper: 236.25 },
        { d: "WSW", lower: 236.25, upper: 258.75 },
        { d: "W", lower: 258.75, upper: 281.25 },
        { d: "WNS", lower: 281.25, upper: 303.75 },
        { d: "NW", lower: 303.75, upper: 326.25 },
        { d: "NNW", lower: 326.25, upper: 348.75 }]

    directions = [
        { d: "N", lower: 348.75, upper: 11.25 },
        { d: "NNE", lower: 11.25, upper: 33.75 },
        { d: "NE", lower: 33.75, upper: 56.25 },
        { d: "ENE", lower: 56.25, upper: 78.75 },
        { d: "E", lower: 78.75, upper: 101.25 },
        { d: "ESE", lower: 101.25, upper: 123.75 },
        { d: "SE", lower: 123.75, upper: 146.25 },
        { d: "SSE", lower: 146.25, upper: 168.75 },
        { d: "S", lower: 168.75, upper: 191.25 },
        { d: "SSW", lower: 191.25, upper: 213.75 },
        { d: "SW", lower: 213.75, upper: 236.25 },
        { d: "WSW", lower: 236.25, upper: 258.75 },
        { d: "W", lower: 258.75, upper: 281.25 },
        { d: "WNS", lower: 281.25, upper: 303.75 },
        { d: "NW", lower: 303.75, upper: 326.25 },
        { d: "NNW", lower: 326.25, upper: 348.75 }]

    var threshold_conc = null
    measurement.sort((a, b) => (a.selected_chemical > b.selected_chemical) ? -1 : 1)
    threshold_conc = measurement[parseInt(measurement.length * (1 - threshold))].selected_chemical
    // var max_wind_speed = Math.max(...wind.map(x => x.wind_speed))
    var max_wind_speed = wind.reduce((prev, curr) => curr.wind_speed > prev ? curr.wind_speed : prev, -999)

    var cbpf_high = Array(parseInt(max_wind_speed) + 1).fill(0)
    var cbpf_all = Array(parseInt(max_wind_speed) + 1).fill(0)
    cbpf_high = cbpf_high.map((x, index) => { return { speed: index + 1, r: Array(16).fill(0) } })
    cbpf_all = cbpf_all.map((x, index) => { return { speed: index + 1, r: Array(16).fill(0) } })

    var count_high = 0
    var count_all = 0

    var WD, WS, Dir_index, Level, conc
    for (let i = 0; i < wind.length; i++) {
        WD = wind[i].wind_direction
        WS = wind[i].wind_speed
        conc = measurement.find(x => x.TimeString == wind[i].TimeString)
        if (WD !== null && WS !== null && conc !== undefined) {
            conc = conc.selected_chemical
            if (WD > 348.75) { Dir_index = 0 }
            else {
                for (let j = 1; j < directions.length; j++) {
                    if (WD <= directions[j].upper) {
                        Dir_index = j
                        break;
                    }
                }
            }

            for (let j = 0; j < cbpf_high.length; j++) {
                if (WS <= cbpf_high[j].speed) {
                    Level = j
                    break;
                }
            }

            cbpf_all[Level].r[Dir_index] += 1
            count_all += 1
            if (conc > threshold_conc) {
                cbpf_high[Level].r[Dir_index] += 1
                count_high += 1
            }
        }
    }

    var cpf_high = Array(16).fill(0)
    var cpf_all = Array(16).fill(0)
    for (let i = 0; i < directions.length; i++) {
        for (let j = 0; j < cbpf_high.length; j++) {
            if (cbpf_high[j].r[i] > 0) {
                cpf_high[i] += cbpf_high[j].r[i]
            }
            if (cbpf_all[j].r[i] > 0) {
                cpf_all[i] += cbpf_all[j].r[i]
            }
        }
    }

    cpf_high = cpf_high.map(x => x / count_high)
    cpf_all = cpf_all.map(x => x / count_all)
    // TODO:
    // - speed up/ avoid ui block
    // - color map 
    // - layer order
    var color_map = [
        { value: 0.3, color: '#8ef5b7' },
        { value: 0.2, color: '#A0DAB7' },
        { value: 0.15, color: '#1F93C0' },
        { value: 0.1, color: '#2F528F' },
        { value: 0.05, color: '#162876' },
    ]
    // const theta = {
    //     "N": 0,
    //     "NNE": 22.5,
    //     "NE": 45,
    //     "ENE": 67.5,
    //     "E": 90,
    //     "ESE": 112.5,
    //     "SE": 135,
    //     "SSE": 157.5,
    //     "S": 180,
    //     "SSW": 202.5,
    //     "SW": 225,
    //     "WSW": 247.5,
    //     "W": 270,
    //     "WNS": 292.5,
    //     "NW": 315,
    //     "NNW": 337.5
    // }

    const theta = [
        0,
        22.5,
        45,
        67.5,
        90,
        112.5,
        135,
        157.5,
        180,
        202.5,
        225,
        247.5,
        270,
        292.5,
        315,
        337.5
    ]

    var cbpf = []
    for (let c = 0; c < color_map.length; c++) {
        var trace = {
            r: [],
            theta: [],
            type: "scatterpolargl",
            mode: "markers",
            marker: {
                color: color_map[c].color,
                // size: 10 + c * 5,
                size: 30,
                line: {
                    color: "white"
                },
                opacity: 0.7
            },
            cliponaxis: false
        }
        if (c == 0) {
            trace.r = Array(16).fill(0)
            trace.theta = theta
        }
        cbpf.push(trace)
    }
    // console.log(count_high, count_all)
    for (let i = 0; i < cbpf_high.length; i++) {
        for (let j = 0; j < cbpf_high[i].r.length; j++) {
            var value = cbpf_high[i].r[j] / cbpf_all[i].r[j]
            if (value > 0.3) {
                cbpf[0].r.push(i)
                cbpf[0].theta.push(theta[j])
            }
            else if (value > 0.2) {
                cbpf[1].r.push(i)
                cbpf[1].theta.push(theta[j])
            }
            else if (value > 0.15) {
                cbpf[2].r.push(i)
                cbpf[2].theta.push(theta[j])
            }
            else if (value > 0.1) {
                cbpf[3].r.push(i)
                cbpf[3].theta.push(theta[j])
            }
            else {
                cbpf[4].r.push(i)
                cbpf[4].theta.push(theta[j])
            }
        }

    }



    // for (let i = 0; i < cbpf_high.length; i++) {
    //     var r = []
    //     for (let j = 1; j < cbpf_high[i].r.length; j++) {
    //         r.push(cbpf_high[i].r[j] / cbpf_all[i].r[j])
    //     }
    //     cbpf.push({
    //         r: r,
    //         theta: theta,
    //         type: "scatterpolargl",
    //         mode: "markers",
    //         marker: {
    //             color: "rgb(102,166,30)",
    //             size: 15,
    //             line: {
    //                 color: "white"
    //             },
    //             opacity: 0.7
    //         },
    //         cliponaxis: false
    //     })
    // }
    var res = {
        cbpf: cbpf.reverse(),
        cpf: {
            high: { r: cpf_high, theta: theta, type: 'scatterpolar', fill: 'toself', name: 'High' },
            all: { r: cpf_all, theta: theta, type: 'scatterpolar', fill: 'toself', name: 'All' }
        }
    }
    // console.log(new Date - tic)
    // console.log(res.cbpf)
    return res
}

function data_cal_windrose(wind) {
    // directions.map((x) => x.d)
    var directions = [
        { d: "N", lower: 348.75, upper: 11.25 },
        { d: "NNE", lower: 11.25, upper: 33.75 },
        { d: "NE", lower: 33.75, upper: 56.25 },
        { d: "ENE", lower: 56.25, upper: 78.75 },
        { d: "E", lower: 78.75, upper: 101.25 },
        { d: "ESE", lower: 101.25, upper: 123.75 },
        { d: "SE", lower: 123.75, upper: 146.25 },
        { d: "SSE", lower: 146.25, upper: 168.75 },
        { d: "S", lower: 168.75, upper: 191.25 },
        { d: "SSW", lower: 191.25, upper: 213.75 },
        { d: "SW", lower: 213.75, upper: 236.25 },
        { d: "WSW", lower: 236.25, upper: 258.75 },
        { d: "W", lower: 258.75, upper: 281.25 },
        { d: "WNS", lower: 281.25, upper: 303.75 },
        { d: "NW", lower: 303.75, upper: 326.25 },
        { d: "NNW", lower: 326.25, upper: 348.75 }]
    var count = 0
    var wind_F = [
        { text: "Calm", speed: 2, legend: "<2 m/s", color: "#062CFB", r: Array(16).fill(0) },
        { text: "Light air", speed: 6, legend: "2-6 m/s", color: "#17D3FF", r: Array(16).fill(0) },
        { text: "Light breeze", speed: 12, legend: "6-12 m/s", color: "#7DFE7A", r: Array(16).fill(0) },
        { text: "Gentle breeze", speed: 19, legend: "12-19 m/s", color: "#FFE50D", r: Array(16).fill(0) },
        { text: "Moderate breeze", speed: 30, legend: "19-30 m/s", color: "#FFE50D", r: Array(16).fill(0) },
        { text: "Fresh", speed: 40, legend: "30-40 m/s", color: "#810006", r: Array(16).fill(0) },
        { text: "strong", speed: 100, legend: ">40 m/s", color: "#810006", r: Array(16).fill(0) },]

    // calcualte each bins
    var WD, WS, Dir_index, Level
    for (let i = 0; i < wind.length; i++) {
        WD = wind[i].wind_direction
        WS = wind[i].wind_speed
        if (WD !== null && WS !== null) {
            count += 1
            if (WD > 348.75) { Dir_index = 0 }
            else {
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
            r: wind_F[i].r.map((x) => { return Math.round(x / count * 100 * 100) / 100 }),
            theta: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNS", "NW", "NNW"],
            name: wind_F[i].legend,
            marker: { color: wind_F[i].color },
            type: "barpolar"
        })
    }
    // console.log(res)
    return wind_rose.reverse()
}

function sen_slope() {


}

function cal_period_avg(data, period) {
    function getDeviation(array) {
        const n = array.length
        const mean = array.reduce((a, b) => a + b) / n
        return array.map(x => (x - mean) * (x - mean)).reduce((a, b) => a + b) / n
    }
    var res = data.reduce((prev, curr) => {
        var year = curr.x.getFullYear()
        var month = curr.x.getMonth() + 1
        var date = curr.x.getDate()
        var hour = curr.x.getHours()
        var date_string
        switch (period) {
            case "hourly":
                date_string = year + '-' + month + '-' + date + ' ' + hour
                break
            case "daily":
                date_string = year + '-' + month + '-' + date
                break
            case "monthly":
                date_string = year + '-' + month
                break
            case "yearly":
                date_string = year
                break
        }

        if (curr.y !== null) {
            if (!prev.date.includes(date_string)) {
                prev.date.push(date_string)
                prev[date_string] = { sum: 0, count: 0, value: [] }
                prev[date_string].sum = curr.y
                prev[date_string].count = 1
                prev[date_string].value.push(curr.y)
            }
            else {
                prev[date_string].sum += curr.y
                prev[date_string].count += 1
                prev[date_string].value.push(curr.y)
            }
        }
        return prev
    }, { date: [] })
    var x = []
    var y = []
    var deviation = []
    for (var i = 0; i < res.date.length; i++) {
        x.push(new Date(res.date[i]))
        y.push(res[res.date[i]].sum / res[res.date[i]].count)
        deviation.push(getDeviation(res[res.date[i]].value))
    }
    return { x: x, y: y, deviation: deviation }
}

function getStandardDeviation(array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

function linearRegression(y, x) {
    var lr = {};
    var n = y.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;

    for (var i = 0; i < y.length; i++) {

        sum_x += x[i];
        sum_y += y[i];
        sum_xy += (x[i] * y[i]);
        sum_xx += (x[i] * x[i]);
        sum_yy += (y[i] * y[i]);
    }


    lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    lr['intercept'] = (sum_y - lr.slope * sum_x) / n;
    lr['r2'] = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);
    // apply max/min to array as follow to avoid error in web worker
    var min = Math.min.apply(null, x)
    var max = Math.max.apply(null, x)
    lr['line'] = {
        x1: min,
        y1: min * lr.slope + lr.intercept,
        x2: max,
        y2: max * lr.slope + lr.intercept,
    }
    return lr;
}


async function data_reduce() {
    // return the reduced the data with reduce_func for reduce_col
    // data: app_data.measurement.data
    // reduce_col: "year"
    // reduce_func: mean
    // reduced: average conc for each year

    // data, reduce_col, reduce_func
}

async function data_merge() {
    // merge two data with the same timestamp and site
}

async function data_filter(data, data_filter) {
    // return filtered data with data_filter
    // data: app_data.measurement.data
    // data_filter: {"site":["x1"],"year":["y1","y2"]}
    // data and data_filter should have same keys
    // filtered: the measurment data for site x1 at y1 and y2

    let filtered = data
    for (var k in data_filter) {
        filtered = filtered.filter(item => { return data_filter[k].includes(item[k]) })
    }
    return filtered

}

function data_filter_2(data, data_filter) {
    // return filtered data with data_filter
    // data: app_data.measurement.data
    // data_filter: {"site":["x1"],"year":["y1","y2"]}
    // data and data_filter should have same keys
    // filtered: the measurment data for site x1 at y1 and y2

    let filtered = data
    for (var k in data_filter) {
        filtered = filtered.filter(item => { return data_filter[k].includes(item[k]) })
    }
    return filtered

}
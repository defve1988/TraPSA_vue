// function convert_csv(data, missing, isExpand) {
//     let lines = data.split("\n")
//     let output = []
//     let header = lines[0].trim().split(",").filter((x) => { return x.length > 0 })
//     let vue_header = []
//     for (const h in header) {
//         vue_header.push({ text: header[h] + "_imported", value: header[h] })
//         if (header[h].toLowerCase().trim() == "timestamp" && isExpand) {
//             vue_header.push({ text: "TimeString_converted", value: "TimeString" })
//         }
//     }

//     // if (isExpand) {
//     //     vue_header.push({ text: "TimeString", value: "TimeString" })
//     //     vue_header.push({ text: "date_value", value: "date_value" })
//     //     vue_header.push({ text: "year", value: "year" })
//     //     vue_header.push({ text: "month", value: "month" })
//     //     vue_header.push({ text: "day", value: "day" })
//     //     vue_header.push({ text: "hour", value: "hour" })
//     //     vue_header.push({ text: "weekday", value: "weekday" })
//     // }
//     // let weekdays = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fir.', 'Sat.']

//     for (let l = 1; l < lines.length; l++) {
//         let content = lines[l].split(",").filter((x) => { return x.length > 0 })
//         if (content.length == header.length) {
//             let line = {}
//             for (const h in header) {
//                 if (header[h].toLowerCase().trim() == "timestamp" && isExpand) {
//                     let date = new Date(content[h])
//                     // line["year"] = date.getFullYear()
//                     // line["month"] = date.getMonth()
//                     // line["day"] = date.getDate()
//                     // line["hour"] = date.getUTCHours()
//                     // line["hour"] = date.getHours()
//                     // line["weekday"] = weekdays[date.getDay()]
//                     // line["date_value"] = date
//                     line["TimeString"] = date.toLocaleString().replace(",", " ")
//                 }
//                 line[header[h]] = (String(content[h]).trim() == String(missing).trim()) ? null : content[h].trim()
//             }

//             output.push(line)
//         }
//     }
//     return { header: vue_header, data: output }
// }


function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    })
}

async function read_csv(file, missing, isExpand) {
    console.log(file)
    let content = await readFileAsync(file);
    let res = convert_csv(content, missing, isExpand);
    // console.log(content);
    return {
        header: res.header,
        data: res.data,
    }

}

async function read_csv_multiple(file, missing, isExpand) {
    var res = {
        header: [],
        data: []
    }
    var header_text = []
    for (var i = 0; i < file.length; i++) {
        console.log(file[i])
        let content = await readFileAsync(file[i]);
        let temp = convert_csv(content, missing, isExpand);
        temp.header.forEach(x => {
            if (!header_text.includes(x.text)) {
                header_text.push(x.tex)
                res.header.push(x)
            }
        })
        console.log(temp.header, res.header, header_text);

        res.data = res.data.concat(temp.data)
    }
    return {
        header: res.header,
        data: res.data,
    }

}


function convert_csv(data, missing, isExpand) {
    missing = missing.split(",").map(x => x.trim())
    let lines = data.split("\n")
    let output = []
    let header = lines[0].trim().split(",").filter((x) => {
        return x.length > 0
    })
    let vue_header = []
    for (const h in header) {
        vue_header.push({
            text: header[h] + "_imported",
            value: header[h]
        })
        if (header[h].toLowerCase().trim() == "timestamp" && isExpand) {
            vue_header.push({
                text: "TimeString_converted",
                value: "TimeString"
            })
        }
    }

    // if (isExpand) {
    //     vue_header.push({ text: "TimeString", value: "TimeString" })
    //     vue_header.push({ text: "date_value", value: "date_value" })
    //     vue_header.push({ text: "year", value: "year" })
    //     vue_header.push({ text: "month", value: "month" })
    //     vue_header.push({ text: "day", value: "day" })
    //     vue_header.push({ text: "hour", value: "hour" })
    //     vue_header.push({ text: "weekday", value: "weekday" })
    // }
    // let weekdays = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fir.', 'Sat.']

    for (let l = 1; l < lines.length; l++) {
        let content = lines[l].split(",").filter((x) => {
            return x.length > 0
        })
        if (content.length == header.length) {
            let line = {}
            for (const h in header) {
                if (header[h].toLowerCase().trim() == "timestamp" && isExpand) {
                    let date = new Date(content[h])
                    // line["year"] = date.getFullYear()
                    // line["month"] = date.getMonth()
                    // line["day"] = date.getDate()
                    // line["hour"] = date.getUTCHours()
                    // line["hour"] = date.getHours()
                    // line["weekday"] = weekdays[date.getDay()]
                    // line["date_value"] = date
                    line["TimeString"] = date.toLocaleString().replace(",", " ")
                }
                line[header[h]] = (missing.includes(String(content[h]).trim())) ? null : content[h].trim()
            }

            output.push(line)
        }
    }
    return {
        header: vue_header,
        data: output
    }
}



export default {
    read_csv,
    readFileAsync,
    read_csv_multiple
}
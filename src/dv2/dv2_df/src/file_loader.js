import * as d3 from 'd3'
// load different type of files
// basically, aviod mutiple level objects
// update df 
// can return data is update = false

export default class filer_loader {
    constructor(df = [], fetch = "") {
        this.df = df
        if (fetch !== "") {
            let file = fetch.split(".").pop()
            if (file == "csv") this.fetch_csv(fetch)
            if (file == "json") this.fetch_json(fetch)
        }
    }

    // 1. local json file can directly use import
    // e.g: import json from '@/assets/json/data.json'

    // 2. online data
    async fetch_json(file, update = true) {
        const response = await d3.json(file)
        if (update) this.df = this.df.concat(response)
        else return response
    }
    async fetch_csv(file, update = true) {
        const response = await d3.csv(file)
        if (update) this.df = this.df.concat(response)
        else return response
    }

    // 3. uploaded file
    async load_json(file, update = true) {
        let response = await this.readFileAsync(file);
        if (update) this.df = this.df.concat(JSON.parse(response))
        else return JSON.parse(response)
    }
    async load_csv(file, update = true) {
        let response = await this.readFileAsync(file);
        let content = await this.convert_csv(response);
        if (update) {this.df = this.df.concat(content)}
        else return content
    }

    // read a local file
    async readFileAsync(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsText(file);
        })
    }

    // convert csv text to object
    async convert_csv(data) {
        let lines = data.split("\n")
        let output = []
        let header = lines[0].trim().split(",").filter((x) => { return x.trim().length > 0 })
        header = header.map(x => x.toLowerCase().trim())
        for (let l = 1; l < lines.length; l++) {
            let content = lines[l].split(",").filter((x) => { return x.trim().length > 0 })
            if (content.length == header.length) {
                let line = {}
                for (const h in header) {
                    line[header[h]] = content[h].trim()
                }
                output.push(line)
            }
        }
        return output
    }

}

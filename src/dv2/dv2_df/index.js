import data_model from "./src/data_model"
import date_format from "./src/date_format"

export default class extends data_model {

    constructor(df = [], fetch = "", read = "") {
        super(df, fetch, read)
        this.date_format = new date_format()
        this.get_attr()
        this.table_header = []
    }


    get_table_header() {
        this.table_header = []
        var replacer = {
            "site_name": "Site",
            "lat": "Latitude",
            "lon": "Longitude",
            "wind_speed": "Wind Speed",
            "wind_direction": "Wind Direction",
            "time_stamp": "Timestamp"
        }

        this.attrs.forEach(attr => {
            if (replacer[attr] == undefined) {
                this.table_header.push({
                    text: attr,
                    value: attr
                })
            } else {
                this.table_header.push({
                    text: replacer[attr],
                    value: attr
                })
            }
        })
        // reorder the column
        var default_vars = ["Timestamp", "Site", "Latitude", "Longitude", "Wind Speed", "Wind Direction"]
        var var_1 = this.table_header.filter(x => x.text == "Timestamp")
        var var_2 = this.table_header.filter(x => x.text == "Site")
        var var_3 = this.table_header.filter(x => x.text == "Latitude")
        var var_4 = this.table_header.filter(x => x.text == "Longitude")
        var var_5 = this.table_header.filter(x => !default_vars.includes(x.text))
        var var_6 = this.table_header.filter(x => x.text == "Wind Speed")
        var var_7 = this.table_header.filter(x => x.text == "Wind Direction")
        // console.log(var_1, var_2, var_3, var_4, var_5, var_6, var_7)

        this.table_header = [].concat(var_1, var_2, var_3, var_4, var_5, var_6, var_7)

    }



}
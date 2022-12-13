import file_loader from "./file_loader"
// import { mean } from 'mathjs'

// perform data selection, grouping, averaging, mostly like pandas
// will effect on the df, not df_filter
export default class data_clean extends file_loader {
    constructor(df=[],fetch="") {
        super(df,fetch)
    }

    // contact df
    concat(new_data){
        this.df = this.df.concat(new_data)
    }

    // merge new data based on cols
    // TODO test
    async merge(new_data, cols) {
        new_data.forEach(element => {
            let row_index = []
            let temp = this.df.filter((row, index) => {
                var isEqual = true
                cols.forEach(c => {
                    isEqual = isEqual && (row[c] == new_data[c])
                });
                if (isEqual) row_index.push(index)
                return isEqual
            })
            if (temp.length == 0) {
                // if this is a new row
                this.df.push(element)
            } else {
                // if row exists, update row with new non-null values
                temp.forEach(row_index => {
                    for (const [key, value] of Object.entries(element)) {
                        if (value != null) this.df[row_index][key] = value
                    }
                });
            }
        });
    }
    
    rename_attr(old_name, new_name) {
        if (old_name != new_name) {
            this.df = this.df.map(x => {
                if (x[old_name]!=undefined){
                    x[new_name] = x[old_name]
                    delete x[old_name]
                }
                return x
            })
            this.get_attr()
        }
    }

    // TODO finish remove_duplicate
    // after file loaded, run this function to make sure no duplicated rows
    // handle duplicated rows based on cols
    // keep_last, keep_first, mean

    // remove_duplicate(cols, methods = "keep_last") {
    //     var key_index=[]
    //     this.df.forEach(element => {
    //         var curr_key=""
    //         cols.forEach(c => {
    //             curr_key += element[c]
    //         });
    //         if (key_index.includes(curr_key)){

    //         }
    //     });

    // }

    // replace val1 with val2, can not handle mutiple level objects
    async replace(val1, val2) {
        this.df = this.df.map(row => {
            let temp = row
            for (const [key, value] of Object.entries(row)) {
                if (value == val1) row[key] = val2
            }
            return temp
        })
    }

    // missing value will be replaced by null
    async replace_missing(missing=null) {
        if (missing==null){
            missing = ["","NaN","nan"]
        }
        this.df = this.df.map(row => {
            let temp = row
            for (const [key, value] of Object.entries(row)) {
                if (missing.includes(value)) row[key] = null
            }
            return temp
        })
    }

    // change data from table to list
    // cols are key cols
    async table2list(cols, new_key_1, new_key_2, df = this.df) {
        var res = []
        df.forEach(row => {
            for (const [key, value] of Object.entries(row)) {
                if (!cols.includes(key)) {
                    var temp = {}
                    cols.forEach(c => temp[c] = row[c])
                    temp[new_key_1] = key
                    temp[new_key_2] = value
                    res.push(temp)
                }
            }
        });
        // TODO remove_duplicate
        return res
    }


}
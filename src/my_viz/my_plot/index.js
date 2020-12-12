import my_plotly from "./src/my_plotly"

import bar_race from "./src/bar_race"


// plot = {
//     viz_type: "plotly",
//     id:"",
//     name:"",
//     x_title:"",
//     y_title:"",
//     x_col:"",
//     y_col:"",
//     plot_type:null,
//     trace_data:null,
//     layout:null,

// }

export default class {
    constructor(plot_config) {
        this.plot_config = plot_config
        if (plot_config.viz_type == "plotly") {
            this.plot_obj = new my_plotly(plot_config)
        } else if (plot_config.viz_type == "bar_race") {
            this.plot_obj = new bar_race(plot_config)
        }
    }

    plot_new(trace) {
        this.plot_obj.plot_new(trace)
    }
    update_layout(update) {
        this.plot_obj.update_layout(update)
    }
    add_trace(trace) {
        this.plot_obj.add_trace(trace);
    }
    update_map(trace) {
        this.plot_obj.update_map(trace);
    }
    // plot_update(trace){}

    // run_bar_race(data, date_list, col) {
    //     this.plot_obj.run_bar_race(data, date_list, col)
    // }
    // stop_bar_race() {
    //     this.plot_obj.ticker.stop()
    //     console.log(this.plot_obj.ticker)
    // }
    // restart_bar_race() {
    //     this.plot_obj.ticker.restart(()=>{console.log(1)},500)
    //     console.log(this.plot_obj.ticker)
    // }
}
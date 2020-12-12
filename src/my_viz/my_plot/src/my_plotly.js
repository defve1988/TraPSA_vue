import Plotly from 'plotly.js'

export default class {
    constructor(plot_config) {
        this.plot_config = plot_config
        this.div = this.plot_config.div
        this.layout = this.plot_config.layout
        this.config = this.plot_config.config
    }

    plot_new(trace) {
        // console.log(this.div, this.layout, trace)

        Plotly.newPlot(this.div, trace, this.layout, this.config);
    }
    set_layout(layout) {
        Object.assign(this.layout, layout)
    }
    update_layout(update) {
        // this.set_layout(layout)
        Plotly.relayout(this.div, update);
    }

    add_trace(trace) {
        Plotly.addTraces(this.div, trace);
    }

    update_map(trace){
        Plotly.addTraces(this.div, trace);
        Plotly.deleteTraces(this.div, 0)
    }
}
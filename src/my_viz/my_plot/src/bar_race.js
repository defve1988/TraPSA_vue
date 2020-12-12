import * as d3 from "d3";
import dateFormat from "dateformat";


export default class {
    constructor(plot_config) {
        this.plot_config = plot_config
        this.div = this.plot_config.div
        this.layout = this.plot_config.layout
        this.svg = null
        this.ticker = null
    }
    gen_dataSlice(date) {
        let dateSlice = this.race_data
            .filter((d) => d.date == date && !isNaN(d.value))
            .sort((a, b) => b.value - a.value)
            .slice(0, this.top_n);

        dateSlice.forEach((d, i) => (d.rank = i));
        return dateSlice
    }
    gene_race_data(data, date_list, col) {
        var race_data = []
        var country_color = {}
        data.forEach(row => {
            country_color[row.country] = d3.hsl(Math.random() * 360, 0.75, 0.75)
        })

        data.forEach(row => {
            row.location.forEach(l => {
                var loc = l.name
                date_list.forEach((d, index) => {
                    if (col in row.data[loc]) {
                        var prev_date = index == 0 ? d : date_list[index - 1]
                        var loc_name
                        if (loc == "tot") {
                            loc_name = row.country
                        } else if (row.country != "US") {
                            loc_name = loc + ", " + row.country
                        } else {
                            loc_name = loc
                        }
                        race_data.push({
                            value: row.data[loc][col][d],
                            lastValue: row.data[loc][col][prev_date],
                            date: d,
                            name: loc_name,
                            colour: country_color[row.country]
                        })
                    }
                })
            })
        })
        return race_data

    }
    restart_race() {
        this.update_ticker()
    }
    stop_race() {
        this.ticker.stop()
    }
    init_race(data, date_list, col) {
        this.date_list = date_list
        this.col = col
        this.top_n = this.layout.top_n
        this.width = this.layout.width
        this.height = this.layout.height
        this.margin = this.layout.margin
        this.tickDuration = this.layout.tickDuration;
        this.barPadding = (this.height - (this.margin.bottom + this.margin.top)) / (this.top_n * 5);
        this.ticker = null
        
        if (this.svg != null) {
            console.log(this.svg)
            this.svg.selectAll("*").remove();
        } else {
            this.svg = d3
                .select(this.div)
                .append("svg")
                .attr("width", this.width)
                .attr("height", this.height);
        }

        // this.svg.append('text')
        //     .attr('x', 20)
        //     .attr('y', 20)
        //     .text(this.plot_config.title)
        //     .style("font-size", "14px")
        //     .style("fill", "white");

        this.race_data = this.gene_race_data(data, date_list, col)

        this.date_index = 0
        this.date = date_list[this.date_index];
        let dateSlice = this.gen_dataSlice(this.date)

        this.x = d3
            .scaleLinear()
            .domain([0, d3.max(dateSlice, (d) => d.value)])
            .range([this.margin.left, this.width - this.margin.right - 65]);

        this.y = d3
            .scaleLinear()
            .domain([this.top_n, 0])
            .range([this.height - this.margin.bottom, this.margin.top]);

        this.xAxis = d3
            .axisTop()
            .scale(this.x)
            .ticks(this.width > 500 ? 5 : 2)
            .tickSize(-(this.height - this.margin.top - this.margin.bottom))
            .tickFormat((d) => d3.format(",")(d));

        this.svg
            .append("g")
            .attr("class", "axis xAxis")
            .attr("transform", `translate(0, ${this.margin.top})`)
            .call(this.xAxis)
            .selectAll(".tick line")
            .classed("origin", (d) => d == 0);


        this.svg
            .selectAll("rect.bar")
            .data(dateSlice, (d) => d.name)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", this.x(0) + 1)
            .attr("width", (d) => this.x(d.value) - this.x(0))
            .attr("y", (d) => this.y(d.rank) + 5)
            .attr("height", this.y(1) - this.y(0) - this.barPadding)
            .style("fill", (d) => d.colour);

        this.svg
            .selectAll("text.label")
            .data(dateSlice, (d) => d.name)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", (d) => this.x(d.value) + 5)
            .attr("y", (d) => this.y(d.rank) + (this.y(1) - this.y(0)) / 2 + 9)
            .style("text-anchor", "start")
            .html((d) => d.name)
            .style("fill", d => d.colour);

        this.svg
            .selectAll("text.valueLabel")
            .data(dateSlice, (d) => d.name)
            .enter()
            .append("text")
            .attr("class", "valueLabel")
            .attr("x", () => this.x(0) + 5)
            .attr("y", (d) => this.y(d.rank) + (this.y(1) - this.y(0)) / 2 + 9)
            .style("text-anchor", "end")
            .text((d) => d3.format(",.0f")(d.lastValue))
            .style("fill", "grey");

            this.svg
            .append("rect")
            .attr("x", this.width - this.margin.right - 195)
            .attr("y", this.height - 50)
            .attr("width",150)
            .attr("height",35)
            .style("fill", "#424242")

        this.dateText = this.svg
            .append("text")
            .attr("x", this.width - this.margin.right - 50)
            .attr("y", this.height - 25)
            .style("text-anchor", "end")
            .style("font-size", "25px")
            .attr("font-weight", 800)
            .style("fill", "white")
            .text(dateFormat(new Date(this.date), "yyyy-mm-dd"));

        this.update_ticker()
    }
    update_ticker() {
        function update() {
            var dateSlice = obj.gen_dataSlice(obj.date)
            // console.log('IntervalYear: ', dateSlice);

            obj.x.domain([0, d3.max(dateSlice, (d) => d.value)]);

            obj.svg
                .select(".xAxis")
                .transition()
                .duration(obj.tickDuration)
                .ease(d3.easeLinear)
                .call(obj.xAxis);

            let bars = obj.svg.selectAll(".bar").data(dateSlice, (d) => d.name);

            bars
                .enter()
                .append("rect")
                .attr("class", (d) => `bar ${d.name.replace(/\s/g, "_")}`)
                .attr("x", obj.x(0) + 1)
                .attr("width", (d) => obj.x(d.value) - obj.x(0))
                .attr("y", () => obj.y(obj.top_n + 1) + 5)
                .attr("height", obj.y(1) - obj.y(0) - obj.barPadding)
                .style("fill", (d) => d.colour)
                .transition()
                .duration(obj.tickDuration)
                .ease(d3.easeLinear)
                .attr("y", (d) => obj.y(d.rank) + 5);

            bars
                .transition()
                .duration(obj.tickDuration)
                .ease(d3.easeLinear)
                .attr("width", (d) => obj.x(d.value) - obj.x(0))
                .attr("y", (d) => obj.y(d.rank) + 5);

            bars
                .exit()
                .transition()
                .duration(obj.tickDuration)
                .ease(d3.easeLinear)
                .attr("width", (d) => obj.x(d.value) - obj.x(0))
                .attr("y", () => obj.y(obj.top_n + 1) + 5)
                .remove();

            let labels = obj.svg.selectAll(".label").data(dateSlice, (d) => d.name);

            labels
                .enter()
                .append("text")
                .attr("class", "label")
                .attr("x", (d) => obj.x(d.value) + 12)
                .attr("y", () => obj.y(obj.top_n + 1) + (obj.y(1) - obj.y(0)) / 2 + 9)
                .style("text-anchor", "start")
                .html((d) => d.name)
                .style("fill", d => d.colour)
                .transition()
                .duration(obj.tickDuration)
                .ease(d3.easeLinear)
                .attr("y", (d) => obj.y(d.rank) + (obj.y(1) - obj.y(0)) / 2 + 9);

            labels
                .transition()
                .duration(obj.tickDuration)
                .ease(d3.easeLinear)
                .attr("x", (d) => obj.x(d.value) + 12)
                .attr("y", (d) => obj.y(d.rank) + (obj.y(1) - obj.y(0)) / 2 + 9);

            labels
                .exit()
                .transition()
                .duration(obj.tickDuration)
                .ease(d3.easeLinear)
                .attr("x", (d) => obj.x(d.value) + 12)
                .attr("y", () => obj.y(obj.top_n + 1) + 9)
                .remove();

            let valueLabels = obj.svg
                .selectAll(".valueLabel")
                .data(dateSlice, (d) => d.name);

            valueLabels
                .enter()
                .append("text")
                .attr("class", "valueLabel")
                .attr("x", () => obj.x(0) - 5)
                .attr("y", () => obj.y(obj.top_n + 1) + 9)
                .text((d) => d3.format(",.0f")(d.lastValue))
                .style("text-anchor", "end")
                .style("fill", "grey")
                .transition()
                .duration(obj.tickDuration)
                .ease(d3.easeLinear)
                .attr("y", (d) => obj.y(d.rank) + (obj.y(1) - obj.y(0)) / 2 + 9);

            valueLabels
                .transition()
                .duration(obj.tickDuration)
                .ease(d3.easeLinear)
                .attr("x", () => obj.x(0) - 5)
                .attr("y", (d) => obj.y(d.rank) + (obj.y(1) - obj.y(0)) / 2 + 9)
                .tween("text", function (d) {
                    let i = d3.interpolateRound(d.lastValue, d.value);
                    return function (t) {
                        this.textContent = d3.format(",")(i(t));
                    };
                });

            valueLabels
                .exit()
                .transition()
                .duration(obj.tickDuration)
                .ease(d3.easeLinear)
                .attr("x", () => obj.x(0) - 5)
                .attr("y", () => obj.y(obj.top_n + 2) + 9)
                .remove();

            obj.dateText.text(dateFormat(new Date(obj.date), "yyyy-mm-dd"));

            if (obj.date_index == obj.date_list.length - 1) obj.ticker.stop()
            obj.date_index++
            obj.date = obj.date_list[obj.date_index];
        }

        var obj = this
        if (this.ticker==null){
            this.ticker = d3.interval(update, this.tickDuration)
        }
        else{
            this.ticker.restart(update,this.tickDuration)
        }
    }

}
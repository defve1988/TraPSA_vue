<template>
  <v-card height="800" :loading="isLoading">
    <v-card-title
      class="py-1 title font-weight-medium secondary primary--text text--darken-2"
    >
      <span class="font-weight-light"> {{ view_title }}</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="app_data.ui_control.fig_view.show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout class="justify-center ma-0 pa-0">
      <v-col class="my-0 py-0">
        <v-row>
          <v-col cols="4">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-select
                  v-model="selected"
                  :items="items"
                  label="Select Cases"
                  chips
                  multiple
                  v-bind="attrs"
                  v-on="on"
                  @change="show_fig(false)"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span v-if="index === 1" class="grey--text caption">
                      (+{{ selected.length - 1 }} others)
                    </span>
                  </template>
                </v-select>
              </template>
              <span v-if="wind_plots.includes(view_title)">
                Note: data will be combined if multiple cases are selected.
              </span>
              <span v-else>Add trace of selected cases to plot.</span>
            </v-tooltip>
          </v-col>

          <v-col
            cols="4"
            align-self="end"
            v-if="view_title=='CPF Analysis'"
          >
            <v-slider
              v-model="app_data.parameters.cpf"
              :label="'Criteria: '+ app_data.parameters.cpf.toFixed(2)"
              thumb-color="primary"
              thumb-label="true"
              color="primary"
              track-color="primary lighten-3"
              max="1"
              min="0.05"
              step="0.05"
              @change="show_fig()"
            ></v-slider>
          </v-col>
          <v-col
            cols="4"
            align-self="end"
            v-if="view_title=='CBPF Analysis'"
          >
            <v-slider
              v-model="app_data.parameters.cbpf"
              :label="'Criteria: '+ app_data.parameters.cbpf.toFixed(2)"
              thumb-color="primary"
              thumb-label="true"
              color="primary"
              track-color="primary lighten-3"
              max="1"
              min="0.05"
              step="0.05"
              @change="show_fig()"
            ></v-slider>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="3" align-self="center">
            <v-btn class="mx-1" color="primary lighten-2" @click="edit_style">
              Style
            </v-btn>
            <v-btn class="mx-1" color="primary lighten-2" @click="export_fig">
              Save
            </v-btn>
          </v-col>
        </v-row>
        <v-row align-self="center">
          <v-carousel
            v-model="carousel_index"
            show-arrows-on-hover
            @change="show_fig()"
            height="651"
          >
            <v-carousel-item v-for="fig in figs" :key="fig.id">
              <v-row
                class="fill-height mx-3 py-0 my-0"
                align="center"
                justify="center"
              >
                <div :id="'fig_detail_' + fig.id" class="my_dataviz"></div>
              </v-row>
            </v-carousel-item>
          </v-carousel>

          <!-- <div id="fig_detail" class="my_dataviz mx-2 py-0 my-0"></div> -->
        </v-row>
      </v-col>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import PlotCase from "@/assets/js/data_plot";
import data_process from "@/assets/js/data_process";
export default {
  components: {},
  data: () => ({
    isLoading: false,
    selected: [],
    carousel_index: 0,
    wind_plots: ["Wind Rose", "CPF Analysis", "CBPF Analysis"],
    figs: [
      { id: "histgram", text: "Histgram" },
      { id: "time_series", text: "Concentration" },
      { id: "monthly", text: "Seasonality" },
      { id: "diel", text: "Diel Pattern" },
      { id: "weekday", text: "Weekday Pattern" },
      { id: "trend", text: "Trend" },
      { id: "windrose", text: "Wind Rose" },
      { id: "cpf", text: "CPF Analysis" },
      { id: "cbpf", text: "CBPF Analysis" },
    ],
  }),
  watch: {
    fig_view() {
      this.fig_ID = this.fig_view.id;
      this.reset_fig();
    },
  },
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
    view_title() {
      return this.figs[this.carousel_index].text;
    },
    items() {
      return this.app_data.case.map((x) => x.name);
    },
    fig_view() {
      return this.app_data.ui_control.fig_view;
    },
  },
  mounted() {
    // 1. app_data.ui_control.fig_view (ID or name) >> change from parent, need reset
    //  - resect selected data, set carousel_index
    //  - clear all figrues
    // 2. data selection change
    //  - display figure on current figure
    // 3. display figure change
    //  - clear current figure
    //  - display selected data

    // make sure first display is correct
    this.selected = this.app_data.ui_control.fig_view.selected_case_name;
    this.fig_ID = this.app_data.ui_control.fig_view.id;

    this.plot_case = new PlotCase("fig_view");
    this.reset_fig();
  },
  methods: {
    ...mapMutations(["SITESUMMARY"]),
    reset_fig() {
      this.selected = this.app_data.ui_control.fig_view.selected_case_name;
      this.carousel_index = this.figs.map((x) => x.id).indexOf(this.fig_ID);
      this.show_fig();
    },
    export_fig() {
      this.plot_case.save_image(
        "fig_detail_" + this.fig_ID,
        this.selected[0] + "_" + this.fig_type
      );
    },
    edit_style() {
      this.plot_case.set_title("fig_detail_" + this.fig_ID);
    },
    show_fig(clear = false) {
      this.isLoading = "primary lighten-2";
      this.fig_ID = this.figs[this.carousel_index].id;
      if (clear) {
        this.plot_case.clear("fig_detail_" + this.fig_ID);
      }
      var fig_data = [];
      var wind_data = { measurement: [], wind: [] };
      // make sure the data with the selection order not the case order
      for (const s of this.selected) {
        for (const c of this.app_data.case) {
          if (s == c.name) {
            fig_data.push(c);
            // if there is wind data, combine the wind data
            if (c.data.wind.length > 0) {
              wind_data.wind = wind_data.wind.concat(c.data.wind);
              wind_data.measurement = wind_data.measurement.concat(
                c.data.measurement
              );
            }
          }
        }
      }
      switch (this.fig_ID) {
        case "histgram":
          this.$worker
            .run(
              (fig_data) => {
                var res = [];
                for (var i = 0; i < fig_data.length; i++) {
                  res.push({
                    x: fig_data[i].data.measurement.map(
                      (x) => x.selected_chemical
                    ),
                    chemical: fig_data[i].name,
                  });
                }
                return res;
              },
              [fig_data]
            )
            .then((res) => {
              this.plot_case.plot_hist(
                "fig_detail_" + this.fig_ID,
                res,
                "large"
              );
              this.isLoading = false;
            });
          break;
        case "time_series":
          this.$worker
            .run(
              (fig_data) => {
                var res = [];
                for (var i = 0; i < fig_data.length; i++) {
                  res.push({
                    x: fig_data[i].data.measurement.map(
                      (x) => new Date(x.TimeString)
                    ),
                    y: fig_data[i].data.measurement.map(
                      (x) => x.selected_chemical
                    ),
                    chemical: fig_data[i].name,
                  });
                }
                return res;
              },
              [fig_data]
            )
            .then((res) => {
              this.plot_case.plot_line(
                "fig_detail_" + this.fig_ID,
                res,
                "large"
              );
              this.isLoading = false;
            });
          break;
        case "monthly":
        case "diel":
        case "weekday":
          this.$worker
            .run(
              (fig_data) => {
                var res = [];
                for (var i = 0; i < fig_data.length; i++) {
                  res.push({
                    x: fig_data[i].data.measurement.map(
                      (x) => new Date(x.TimeString)
                    ),
                    y: fig_data[i].data.measurement.map(
                      (x) => x.selected_chemical
                    ),
                    chemical: fig_data[i].name,
                  });
                }
                return res;
              },
              [fig_data]
            )
            .then((res) => {
              this.plot_case.plot_averaged_box(
                "fig_detail_" + this.fig_ID,
                res,
                "large",
                this.fig_ID
              );
              this.isLoading = false;
            });
          break;
        case "trend":
          // convert function to string then use in web worker
          var cal_period_avg = data_process.cal_period_avg.toString();
          var linearRegression = data_process.linearRegression.toString();
          this.$worker
            .run(
              (fig_data, func1, func2) => {
                func1 = new Function(`return ${func1}`)();
                func2 = new Function(`return ${func2}`)();
                var res = [];
                for (var i = 0; i < fig_data.length; i++) {
                  let d = fig_data[i].data.measurement.map((x) => {
                    return {
                      x: new Date(x.TimeString),
                      y: parseFloat(x.selected_chemical),
                    };
                  });
                  var temp = func1(d, "daily");
                  let lr = func2(
                    temp.y,
                    temp.x.map((x) => x.getTime())
                  );
                  res.push({
                    x: temp.x,
                    y: temp.y,
                    chemical: fig_data[i].name,
                    lr: lr,
                  });
                }
                return res;
              },
              [fig_data, cal_period_avg, linearRegression]
            )
            .then((res) => {
              this.plot_case.plot_trend(
                "fig_detail_" + this.fig_ID,
                res,
                "large",
                this.fig_ID
              );
              this.isLoading = false;
            });
          break;
        // for windrose, cpf, and cbpf, all the case data were combined together
        case "windrose":
          this.$worker
            .run(data_process.data_cal_windrose, [wind_data.wind])
            .then((res) => {
              this.plot_case.plot_windrose(
                "fig_detail_" + this.fig_ID,
                res,
                "large"
              );
              this.isLoading = false;
            });

          break;
        case "cpf":
          this.$worker
            .run(data_process.data_cal_cpf, [
              wind_data.measurement,
              wind_data.wind,
              [this.app_data.parameters.cpf],
            ])
            .then((res) => {
              this.plot_case.plot_cpf(
                "fig_detail_" + this.fig_ID,
                res.cpf,
                "large"
              );
              this.isLoading = false;
            });
          break;
        case "cbpf":
          this.$worker
            .run(data_process.data_cal_cpf, [
              wind_data.measurement,
              wind_data.wind,
              [this.app_data.parameters.cbpf],
            ])
            .then((res) => {
              this.plot_case.plot_cbpf(
                "fig_detail_" + this.fig_ID,
                res.cbpf,
                "large"
              );
              this.isLoading = false;
            });
          break;
      }
    },
  },
};
</script>
<style scoped>
/* .my_dataviz {
  background-color:dimgrey;
} */
</style>
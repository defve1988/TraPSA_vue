<template>
  <v-card color="secondary" flat>
    <v-container class="px-10 pt-1 pb-0">
      <v-row>
        <v-col cols="3" class="mt-2 px-0">
          <v-card height="725px">
            <v-card-title
              class="pa-1 px-4 title primary lighten-2 font-weight-regular white--text"
            >
              Research Cases
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    dark
                    icon
                    @click="add_new_case"
                    v-bind="attrs"
                    v-on="on"
                    >mdi-plus-circle</v-icon
                  >
                </template>
                <span>Add new research case.</span>
              </v-tooltip>
            </v-card-title>

            <v-list dense class="pa-0" v-if="app_data.case.length == 0">
              <v-list-item>No cases exist.</v-list-item>
            </v-list>

            <v-list v-else dense class="pa-0">
              <v-list-item-group
                v-model="app_data.ui_control.thumb_fig_index"
                mandatory
              >
                <v-list-item v-for="(item, i) in app_data.case" :key="i">
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active"></v-checkbox>
                    </v-list-item-action>
                    {{ item.name }}
                    <v-spacer></v-spacer>
                    <v-btn icon @click="edit_case(i)">
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                    <v-btn icon @click="remove_case(i)">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="9">
          <v-row dense>
            <v-col
              class="px-2 py-3"
              v-for="(fig, i) in figs"
              :key="i"
              cols="3"
              lg="4"
              md="6"
              sm="12"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :height="fig_height"
                  @click="enlarge(fig.id)"
                  :elevation="hover ? 16:2"
                >
                  <v-card-title
                    class="justify-center pt-2 pa-0 subtitle-1 font-weight-light"
                    >{{ fig.text }}</v-card-title
                  >

                  <!-- if no case is selected then display grey blocks -->
                  <v-sheet
                    v-if="!show_case[i]"
                    class="ma-2"
                    color="grey lighten-2"
                  >
                    <sheet-footer>No content can be dsiplayed</sheet-footer>
                  </v-sheet>

                  <div :ref="'my_'+fig.id" :id="fig.id" class="my_dataviz mx-0 py-0 my-0"></div>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="app_data.ui_control.new_case.show" width="800">
      <CaseSelect @data_edited="case_selected"/>
    </v-dialog>
    <v-dialog v-model="app_data.ui_control.fig_view.show" width="1200">
      <FigureView />
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import PlotCase from "@/assets/js/data_plot";
import data_process from "@/assets/js/data_process";
export default {
  name: "analysis",
  components: {
    CaseSelect: () => import("@/components/dialogs/CaseSelect.vue"),
    FigureView: () => import("@/components/dialogs/FigureView.vue"),
    SheetFooter: {
      functional: true,
      render(h, { children }) {
        return h(
          "v-sheet",
          {
            staticClass: "mt-auto align-center justify-center d-flex",
            props: {
              color: "rgba(0, 0, 0, .25)",
              dark: true,
              height: 170,
            },
          },
          children
        );
      },
    },
  },
  data: () => ({
    fig_height: "225px",
    show_case: [false, false, false, false, false, false, false, false, false],
    p1: "",
    p2: "",
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
  // this is important to let ui automatically update when new case is added
  watch: {
    selected() {
      this.case_selected();
    },
  },
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
    selected() {
      return this.app_data.ui_control.thumb_fig_index;
    },
  },
  mounted() {},
  methods: {
    add_new_case() {
      if (
        this.app_data.sites.data.length > 0 &&
        this.app_data.measurement.data.length > 0
      ) {
        this.app_data.ui_control.new_case.show = true;
        this.app_data.ui_control.new_case.edit = -1;
      } else {
        this.app_data.ui_control.snackbar = {
          show: false,
          text: "No data is uploaded, please upload data first.",
          color: "error",
        };
      }
    },
    remove_case(index) {
      this.app_data.case = this.app_data.case.filter((x, i) => i != index);
      if (index >= this.app_data.ui_control.thumb_fig_index) {
        this.app_data.ui_control.thumb_fig_index -= 1;
      }
    },
    edit_case(index) {
      var select_case = this.app_data.case[index];
      this.app_data.ui_control.new_case = {
        show: true,
        edit: index,
        selection: {
          case_name: select_case.name,
          site: select_case.site,
          chemical: select_case.chemical,
          traj_job: select_case.traj_job,
          year: select_case.selections.year,
          month: select_case.selections.month,
          hour: select_case.selections.hour,
        },
      };
    },
    enlarge(id) {
      var index_temp = this.selected;
      this.app_data.ui_control.fig_view = {
        show: true,
        id: id,
        text: this.figs.find((e) => e.id === id).text,
        selected_case_name: [this.app_data.case[index_temp].name],
      };
    },
    case_selected() {
      // alert(1)
      var index_temp = this.selected;
      var item = this.app_data.case[index_temp];
      this.plot_case = new PlotCase(item.name);

      var fig_size ={
        width: this.$refs.my_histgram[0].clientWidth,
        height: 180,
      }
      console.log(fig_size)
      var fig_margin = { r: 20, t: 25, b: 25, l: 30 }
      this.plot_case.set_fig_size("small", fig_size, fig_margin)

      this.app_data.ui_control.isLoading = "primary lighten-2";

      // plot 1: histgram
      this.$worker
        .run(
          (measurement) => {
            return measurement.map((x) => x.selected_chemical);
          },
          [item.data.measurement]
        )
        .then((res) => {
          this.show_case.splice(0, 1, true);
          this.plot_case.plot_hist(
            "histgram",
            [{ x: res, chemical: item.chemical }],
            "small"
          );
        });

      // plot 2: time series
      this.$worker
        .run(
          (measurement) => {
            let x = measurement.map((x) => new Date(x.TimeString));
            let y = measurement.map((x) => x.selected_chemical);
            return { x: x, y: y };
          },
          [item.data.measurement]
        )
        .then((res) => {
          this.show_case.splice(1, 1, true);
          this.plot_case.plot_line(
            "time_series",
            [{ x: res.x, y: res.y, chemical: item.chemical }],
            "small"
          );
        });

      // plot 3 monthly box plot
      this.$worker
        .run(
          (measurement) => {
            let x = measurement.map((x) => new Date(x.TimeString));
            let y = measurement.map((x) => x.selected_chemical);
            return { x: x, y: y };
          },
          [item.data.measurement]
        )
        .then((res) => {
          this.show_case.splice(2, 1, true);
          this.plot_case.plot_averaged_box(
            "monthly",
            [{ x: res.x, y: res.y, chemical: item.chemical }],
            "small",
            "monthly"
          );
        });

      // plot 4 diel box plot
      this.$worker
        .run(
          (measurement) => {
            let x = measurement.map((x) => new Date(x.TimeString));
            let y = measurement.map((x) => x.selected_chemical);
            return { x: x, y: y };
          },
          [item.data.measurement]
        )
        .then((res) => {
          this.show_case.splice(3, 1, true);
          this.plot_case.plot_averaged_box(
            "diel",
            [{ x: res.x, y: res.y, chemical: item.chemical }],
            "small",
            "diel"
          );
        });

      // plot 5 weekday box plot
      this.$worker
        .run(
          (measurement) => {
            let x = measurement.map((x) => new Date(x.TimeString));
            let y = measurement.map((x) => x.selected_chemical);
            return { x: x, y: y };
          },
          [item.data.measurement]
        )
        .then((res) => {
          this.show_case.splice(4, 1, true);
          this.plot_case.plot_averaged_box(
            "weekday",
            [{ x: res.x, y: res.y, chemical: item.chemical }],
            "small",
            "weekday"
          );
        });

      // plot 6: averaged line plot with sen's slope
      let d = item.data.measurement.map((x) => {
        return {
          x: new Date(x.TimeString),
          y: parseFloat(x.selected_chemical),
        };
      });
      this.$worker
        .run(data_process.cal_period_avg, [d, "daily"])
        .then((res) => {
          this.show_case.splice(5, 1, true);
          let lr = data_process.linearRegression(
            res.y,
            res.x.map((x) => x.getTime())
          );
          this.plot_case.plot_trend(
            "trend",
            [
              {
                x: res.x,
                y: res.y,
                chemical: item.chemical,
                lr: lr,
              },
            ],
            "small"
          );
          if (!item.data.wind.length > 0) {
            this.app_data.ui_control.isLoading = false;
          }
        });

      if (item.data.wind.length > 0) {
        // plot 7: wind rose
        this.$worker
          .run(data_process.data_cal_windrose, [item.data.wind])
          .then((res) => {
            this.show_case.splice(6, 1, true);
            this.plot_case.plot_windrose("windrose", res, "small");
          });

        this.$worker
          .run(data_process.data_cal_cpf, [
            item.data.measurement,
            item.data.wind,
            [this.app_data.parameters.cpf],
          ])
          .then((res) => {
            // plot 8: CPF
            this.show_case.splice(7, 1, true);
            this.plot_case.plot_cpf("cpf", res.cpf, "small");
            // plot 9: CBPF
            this.show_case.splice(8, 1, true);
            this.plot_case.plot_cbpf("cbpf", res.cbpf, "small");
            this.app_data.ui_control.isLoading = false;
          });
      }
    },
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: scroll;
}
.v-list {
  max-height: 650px;
  overflow-y: auto;
}
</style>
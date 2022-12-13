<template>
  <v-card color="secondary" flat>
    <v-container class="px-10 pt-1 pb-0">
      <v-row>
        <v-col cols="3" class="mt-2 px-0">
          <source_case />
          <v-btn
            class="mt-2"
            block
            height="25"
            color="primary"
            v-if="!progress_bar"
            @click="display_map"
          >
            Show Potential Source >>
          </v-btn>
          <v-progress-linear
            v-else
            indeterminate
            color="primary"
            height="25"
            class="mt-2"
          >
          </v-progress-linear>
        </v-col>

        <v-col cols="9" class="mt-2 px-5">
          <v-row dense>
            <map_card
              map_div_id="source_map"
              map_title="Potential Source Map"
              :button_not_uesd="button_not_uesd"
              :card_height="700"
              map_obj="source_map"
              :map_card_type="'source_map'"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import dv2_df from "@/dv2/dv2_df";
export default {
  name: "potential_source",
  components: {
    map_card: () => import("@/components/widgets/MapCard.vue"),
    source_case: () => import("@/components/widgets/SourceCase.vue"),
  },
  data: () => ({
    button_not_uesd: [],
    progress_bar: false,
    progress: 0,
  }),
  watch: {},
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
      plot_data: "plot_data",
    }),
  },
  mounted() {},
  methods: {
    async display_map() {
      this.progress_bar = true;
      try {
        var selected = this.app_data.source_case.filter(
          (x) => x.model.selected
        );
        if (selected.length == 0) {
          res = {
            error: 1,
            text: "No cases selected.",
          };
        } else {
          var res = {
            error: 0,
            data: [],
            model: selected[0].model,
            chemical: model_chemical,
          };

          var model_type = selected[0].model.type;
          var model_chemical = selected[0].chemical;
          // var traj_job = selected[0].model.traj;
          // check whether the selected data has error
          for (var s = 0; s < selected.length; s++) {
            if (model_type != selected[s].model.type) {
              res = {
                error: 1,
                text: "Ensemble model types should be the same.",
              };
            } else if (model_chemical != selected[s].chemical) {
              res = {
                error: 1,
                text: "Chemicals should be the same.",
              };
            } else if (selected[s].model.traj == "") {
              res = {
                error: 1,
                text: "Please select one trajectory job.",
              };
            }
            // else if (traj_job != selected[s].model.traj) {
            //   res = {
            //     error: 1,
            //     text: "Trajectory jobs should be the same.",
            //   };
            // }
          }
        }

        if (res.error == 1) {
          this.ui_control.snackbar = {
            show: true,
            text: res.text,
            color: "error",
          };
          this.progress_bar = false;
        } else {
          await this.processing_model(
            selected,
            res,
            this.plot_data.dot_size,
            this.plot_data.opacity
          ).then(() => {
            this.progress_bar = false;
          });
        }
      } catch (err) {
        this.progress_bar = false;
        console.error(err);
      }
    },
    async processing_model(selected, res, dot_size, opacity) {
      // TODO: resolve the loading effect
      // if the data is correct
      var data = [];
      for (var i = 0; i < selected.length; i++) {
        var measurement = selected[i].data.measurement;
        var traj_data = this.app_data.traj_data.filter(
          (x) => x.job_name == selected[i].model.traj
        );
        traj_data = traj_data[0].df.filter(
          (x) => x.site_name == selected[i].site
        );

        var conc_index = measurement.reduce((prev, curr) => {
          prev[curr.time_stamp] = curr.selected_chemical;
          return prev;
        }, {});

        var temp = traj_data.map((x) => {
          x.conc = conc_index[x.time_stamp];
          return x;
        });
        temp = temp.filter((x) => x.conc != null);
        data = data.concat(temp);
      }
      res.data = data;

      var dv2 = new dv2_df();
      this.plot_data["source_map"].init_map();
      var grid_res, p;
      console.log(res.model);
      switch (res.model.type) {
        case "PSCF":
          grid_res = await dv2.cal_PSCF(res);
          break;
        case "CFA":
          grid_res = await dv2.cal_CFA(res);
          break;
        case "CWT":
          grid_res = await dv2.cal_CWT(res);
          break;
        case "SQTBA":
          grid_res = await dv2.cal_SQTBA(res);
          break;
      }
      p = await this.plot_data["source_map"].plot_obj.plot_heat_map(
        grid_res,
        dot_size,
        opacity
      );
      return p;
    },
  },
};
</script>
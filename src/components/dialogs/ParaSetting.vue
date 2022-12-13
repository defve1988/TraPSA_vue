<template>
  <v-card>
    <v-card-title
      class="py-1 title font-weight-medium secondary primary--text text--darken-2"
    >
      Model Parameters
      <v-spacer></v-spacer>

      <v-btn icon @click="app_data.parameters.dialog_show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <v-row dense>
        <v-col
          cols="4"
          class="mt-3"
          style="text-align: right"
          align-self="center"
        >
          Ensemble Model:
        </v-col>
        <v-col cols="7" class="mt-3">
          <v-select
            v-model="app_data.parameters.model"
            :items="model_type"
            dense
          ></v-select>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          cols="4"
          class="mt-3"
          style="text-align: right"
          align-self="center"
        >
          Enpoints:
        </v-col>
        <v-col cols="7" class="mt-3">
          <v-select
            v-model="app_data.parameters.traj_job"
            :items="app_data.traj_data.map((x) => x.job_name)"
            dense
            label="Default trajectory data"
          ></v-select>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          cols="4"
          class="mt-3"
          style="text-align: right"
          align-self="center"
        >
          PSCF criteria:
        </v-col>

        <v-col cols="7" class="mt-3">
          <v-slider
            v-model="app_data.parameters.pscf"
            :label="app_data.parameters.pscf.toFixed(2)"
            thumb-color="primary"
            :thumb-label="true"
            color="primary"
            track-color="primary lighten-3"
            max="0.95"
            min="0.5"
            step="0.05"
            inverse-label
            hide-details
          ></v-slider>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          cols="4"
          class="mt-3"
          style="text-align: right"
          align-self="center"
        >
          Grid size:
        </v-col>
        <v-col cols="7" class="mt-3">
          <v-slider
            v-model="app_data.parameters.grid_size"
            :label="app_data.parameters.grid_size.toFixed(2)"
            thumb-color="primary"
            :thumb-label="true"
            color="primary"
            track-color="primary lighten-3"
            max="2"
            min="0.25"
            step="0.25"
            inverse-label
            hide-details
          ></v-slider>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col
          cols="4"
          class="mt-3"
          style="text-align: right"
          align-self="center"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                <u> Weight levels: </u>
              </span>
            </template>
            <p style="width: 200px">
              Note: Weight levels are ranging (from r1 to r2)*mean endpoint
              number, and the corresponding weights will be used for that level.
              You can only adjust r2 here. If the endpoint number is large than
              the heighest level range, then weight value = 1 will be used
              (actually no weight applied).
            </p>
          </v-tooltip>
        </v-col>
        <v-col cols="7" class="mt-3">
          <v-slider
            v-model="weight_level"
            :label="String(weight_level)"
            thumb-color="primary"
            :thumb-label="true"
            color="primary"
            track-color="primary lighten-3"
            max="10"
            min="0"
            step="1"
            inverse-label
            hide-details
            @change="change_weight_levels"
          ></v-slider>
        </v-col>
      </v-row>

      <template v-for="(w, index) of this.app_data.parameters.weight">
        <v-row dense :key="index">
          <v-col
            cols="4"
            class="mt-3"
            style="text-align: right"
            align-self="center"
          >
            Level {{ index + 1 }}: From
          </v-col>

          <v-col cols="1" class="mt-3">
            <v-text-field
              :value="index > 0 ? app_data.parameters.weight[index - 1].n : '0'"
              dense
              hide-details
              disabled
            ></v-text-field>
          </v-col>

          <v-col
            cols="1"
            class="mt-3"
            style="text-align: right"
            align-self="center"
          >
            to
          </v-col>

          <v-col cols="1" class="mt-3">
            <v-text-field v-model="w.n" dense hide-details></v-text-field>
          </v-col>

          <v-col
            cols="2"
            class="mt-3"
            style="text-align: right"
            align-self="center"
          >
            - weight
          </v-col>

          <v-col cols="1" class="mt-3">
            <v-text-field v-model="w.w" dense hide-details></v-text-field>
          </v-col>
        </v-row>
      </template>

      <v-btn class="mt-3" @click="set_parameters">Finish</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data: () => ({
    weight_level: 5,
    zero: "0",
    model_type: ["CFA", "CWT", "PSCF", "SQTBA"],
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  mounted() {},
  methods: {
    change_weight_levels(level) {
      var curr = this.app_data.parameters.weight.length;
      // console.log(curr, level);

      if (level > curr) {
        for (let i = 0; i <= level - curr - 1; i++) {
          this.app_data.parameters.weight.push({ n: null, w: null });
        }
      } else if (level < curr) {
        for (let i = 0; i <= curr - level - 1; i++) {
          this.app_data.parameters.weight.pop();
        }
      }
    },
    set_parameters() {
      //  console.log(this.app_data.parameters)
      this.app_data.source_case = this.app_data.source_case.map((x) => {
        x.model = {
          type: this.app_data.parameters.model,
          c: this.app_data.parameters.pscf,
          grid: this.app_data.parameters.grid_size,
          weight: this.app_data.parameters.weight,
          traj: this.app_data.parameters.traj_job,
          selected: x.model.selected,
        };

        return x;
      });

      console.log(this.app_data.source_case);
      this.ui_control.snackbar = {
        show: true,
        text: "Model parameter updated!",
        color: "info",
      };

      this.app_data.parameters.dialog_show = false;
    },
  },
};
</script>
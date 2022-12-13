<template>
  <v-card height="690">
    <v-system-bar :class="ui_control.system_bar_class">
      Research Cases
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            dark
            icon
            @click="move_cases"
            v-bind="attrs"
            v-on="on"
            class="ml-2"
            >mdi-file-send</v-icon
          >
        </template>
        <span>Add from research cases.</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            dark
            icon
            @click="add_new_case"
            v-bind="attrs"
            v-on="on"
            class="ml-2"
            >mdi-plus-circle</v-icon
          >
        </template>
        <span>Add new research case.</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            dark
            icon
            @click="set_parameters"
            v-bind="attrs"
            v-on="on"
            class="ml-2"
            >mdi-cog</v-icon
          >
        </template>
        <span>Adjust default parameters.</span>
      </v-tooltip>
    </v-system-bar>

    <v-list dense class="pa-0" v-if="app_data.source_case.length == 0">
      <v-list-item>No cases exist.</v-list-item>
    </v-list>

    <v-list v-else class="pa-0" expand dense shaped>
      <v-list-group
        v-model="item.expand"
        v-for="(item, i) in app_data.source_case"
        :key="i"
      >
        <template v-slot:activator>
          <v-list-item-action>
            <v-checkbox
              v-model="item.model.selected"
              @click.native.stop
            ></v-checkbox>
          </v-list-item-action>
          <v-list-item-title class="subtitle-1">
            {{ item.name }}
          </v-list-item-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="edit_case(i)" @click.native.stop>
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn icon @click="remove_case(i)" class="mr-n9" @click.native.stop>
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>

        <!-- <v-list-item>
          <v-row dense class="mt-2 ml-1">
            <v-col cols="10">
              <v-select
                v-model="item.model.type"
                :items="model_type"
                label="Ensemble Model"
                dense
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-btn icon @click="edit_model_setting(i)">
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item> -->

        <!-- <v-list-item>
          <v-row dense class="mt-1 ml-1">
            <v-col cols="10">
              <v-select
                v-model="item.model.traj"
                :items="app_data.traj_data.map((x) => x.job_name)"
                label="Trajectory data"
                dense
              ></v-select>
            </v-col>
            <v-col cols="2" class="px-0"> </v-col>
          </v-row>
        </v-list-item> -->
      </v-list-group>
    </v-list>
    <v-dialog v-model="ui_control.new_case.show" width="800">
      <CaseSelect :select_type="'source_case'" @data_edited="case_selected" />
    </v-dialog>

    <v-dialog v-model="app_data.parameters.dialog_show" width="400">
      <ParaSetting />
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "map_layer",
  components: {
    CaseSelect: () => import("@/components/dialogs/CaseSelect.vue"),
    ParaSetting: () => import("@/components/dialogs/ParaSetting.vue"),
  },
  data: () => ({
    // TODO: add RTWC
    // model_type: ["CFA", "CWT", "PSCF", "SQTBA"],
  }),
  watch: {
    selected() {
      this.case_selected();
    },
  },
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    selected() {
      return this.ui_control.thumb_fig_index;
    },
    // list_height(){
    //     alert(this.$refs.infoBox.$el.clientHeight)
    //     return this.$refs.infoBox.$el.clientHeight;
    // }
  },
  mounted() {},
  methods: {
    add_new_case() {
      if (
        this.app_data.sites.df.length > 0 &&
        this.app_data.conc_df.df.length > 0
      ) {
        this.ui_control.new_case.show = true;
        this.ui_control.new_case.edit = -1;
      } else {
        this.ui_control.snackbar = {
          show: false,
          text: "No data is uploaded, please upload data first.",
          color: "error",
        };
      }
    },
    set_parameters() {
      this.app_data.parameters.dialog_show = true;
    },
    move_cases() {
      this.app_data.source_case = this.app_data.case.map((x) => x);
    },
    edit_case(index) {
      var select_case = this.app_data.source_case[index];
      this.ui_control.new_case = {
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
    edit_model_setting() {},
    remove_case(index) {
      this.app_data.source_case = this.app_data.source_case.filter(
        (x, i) => i != index
      );
      if (
        index <= this.ui_control.source_case_index &&
        this.ui_control.source_case_index > 0
      ) {
        this.ui_control.source_case_index -= 1;
      }
    },
    case_selected() {},
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: scroll;
}
.v-list {
  max-height: 660px;
  overflow-y: auto;
}
</style>
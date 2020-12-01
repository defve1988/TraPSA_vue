<template>
  <v-card height="725">
    <v-card-title
      class="pa-1 px-4 title primary lighten-2 font-weight-regular white--text"
    >
      Research Cases
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon dark icon @click="add_new_case" v-bind="attrs" v-on="on"
            >mdi-plus-circle</v-icon
          >
        </template>
        <span>Add new research case.</span>
      </v-tooltip>
    </v-card-title>

    <v-list dense class="pa-0" v-if="app_data.case.length == 0">
      <v-list-item>No cases exist.</v-list-item>
    </v-list>

    <v-list v-else class="pa-0" expand dense shaped>
      <v-list-group
        v-model="item.expand"
        v-for="(item, i) in app_data.case"
        :key="i"
      >
        <template v-slot:activator>
          <v-list-item-action>
            <v-checkbox v-model="item.model.selected"></v-checkbox>
          </v-list-item-action>
          <v-list-item-title class="subtitle-1">
            {{ item.name }}
          </v-list-item-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="edit_case(i)">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn icon @click="remove_case(i)" class="mr-n9">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>

        <v-list-item>
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
        </v-list-item>

        <v-list-item>
          <v-row dense class="mt-1 ml-1">
            <v-col cols="10">
              <v-select
                v-model="item.model.traj"
                :items="app_data.traj_jobs"
                label="Trajectory data"
                dense
              ></v-select>
            </v-col>
            <v-col cols="2" class="px-0"> </v-col>
          </v-row>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-dialog v-model="app_data.ui_control.new_case.show" width="800">
      <CaseSelect @data_edited="case_selected" />
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "map_layer",
  components: {
    CaseSelect: () => import("@/components/dialogs/CaseSelect.vue"),
  },
  data: () => ({
    model_type: ["CPF", "CFA", "CWT", "RTWC", "PSCF", "SQTBA"],
  }),
  watch: {},
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
    // list_height(){
    //     alert(this.$refs.infoBox.$el.clientHeight)
    //     return this.$refs.infoBox.$el.clientHeight;
    // }
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
    edit_case() {},
    edit_model_setting() {},
    remove_case(index) {
      this.app_data.case = this.app_data.case.filter((x, i) => i != index);
    },
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
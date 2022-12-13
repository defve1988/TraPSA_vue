<template>
<!-- TODO: auto adjust the card height -->
  <v-card :loading="isloading">
    <v-card-title class="py-1 title font-weight-medium secondary primary--text text--darken-2">
      Data View
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon icon @click="reset_data_view" v-bind="attrs" v-on="on">mdi-refresh</v-icon>
        </template>
        <span>Refresh.</span>
      </v-tooltip>

      <v-btn icon @click="ui_control.data_view = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-select
            v-model="data_view_type"
            :items="data_view_items"
            label="Select View"
            dense
            class="mx-5 mt-5 mb-n3"
            @change="update_data_view"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="select_traj_jobs"
            :items="traj_jobs"
            label="Select Trajectory Job"
            dense
            class="mx-5 mt-5 mb-n3"
            :disabled="!isTraj"
            @change="update_data_view"
          ></v-select>
        </v-col>
        <v-col cols="5">
          <v-radio-group v-model="select_alt" row :disabled="!isTraj" @change="update_data_view">
            <v-radio class="mx-1" v-for="n in alt" :key="n" :label="n" :value="n"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-card-text>

    <SiteSummary v-if="data_view_type=='Overview'" />
    <v-data-table
      v-else
      :headers="view_header"
      :items="view_data"
      item-key="name"
      class="px-10 mt-n5"
      :items-per-page="10"
      no-data-text="No data available, try refresh."
    ></v-data-table>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "data_view",
  components: {
    SiteSummary: () => import("@/components/widgets/SiteSummary.vue"),
  },
  data: () => ({
    data_view_type: "Overview",
    data_view_items: ["Overview", "Measurement", "Trajectory"],
    select_traj_jobs: null,
    traj_jobs:[],
    alt: ["Latitude", "Longitude", "Altitude"],
    select_alt: "Latitude",
    isTraj: false,
    view_data: null,
    view_header: null,
    isloading: false,
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  mounted() {
    this.SITESUMMARY();
  },
  methods: {
    ...mapMutations(["SITESUMMARY"]),
    reset_data_view() {
      this.data_view_type = "Overview";
      this.SITESUMMARY();
    },
    update_data_view() {
      this.isloading = true;
      switch (this.data_view_type) {
        case "Overview":
          this.SITESUMMARY();
          this.isTraj = false;
          this.isloading = false;
          return;
        case "Measurement":
          this.view_header = this.app_data.conc_df.table_header;
          this.view_data = this.app_data.conc_df.df;
          this.isTraj = false;
          this.isloading = false;
          break;
        case "Trajectory":
          this.isTraj = true;

          this.traj_jobs = this.app_data.traj_data.map(x => x.job_name);
          if (this.select_traj_jobs==null){
            this.select_traj_jobs = this.traj_jobs[0]
          }

          var traj_job = this.app_data.traj_data.filter(
            (x) => x.job_name == this.select_traj_jobs
          )[0];

          // console.log(this.traj_jobs, this.select_traj_jobs, traj_job)

          var header = [
            {
              text: "Timestamp",
              value: "time_stamp",
            },
            {
              text: "Site",
              value: "site_name",
            },
            {
              text: "Traj Start",
              value: "traj_date",
            },
          ];

          var time_header = [];
          for (var i = 0; i < traj_job.df[0].lat.length; i++) {
            time_header.push("-" + i + "H");
            header.push({
              text: "-" + parseInt(i+1) + "H",
              value: "-" + parseInt(i+1) + "H",
            });
          }

          this.view_header = header;
          this.view_data = traj_job.df.map((x) => {
            var temp = {};
            if (this.select_alt == "Latitude") {
              time_header.forEach((key, i) => (temp[key] = x.lat[i]));
            } else if (this.select_alt == "Longitude") {
              time_header.forEach((key, i) => (temp[key] = x.lon[i]));
            } else {
              time_header.forEach((key, i) => (temp[key] = x.alt[i]));
            }
            var temp2 = {
              time_stamp: x.time_stamp,
              site_name: x.site_name,
              traj_date: x.traj_date,
            };
            return Object.assign(temp, temp2);
          });
          this.isloading = false;

      }
    },
  },
};
</script>
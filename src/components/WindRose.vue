<template>
  <v-hover v-slot:default="{ hover }">
    <v-card height="500" :elevation="hover ? 5 : 2">
      <v-row class="mb-n10">
        <v-col cols="12" lg="3" md="12">
          <p class="pl-12 pr-0 mt-5 font-weight-light title">Wind Rose</p>
        </v-col>
        <v-col cols="12" lg="4" md="12">
          <v-select
            v-model="selected_site"
            :items="app_data.sites.data.map((x)=>{return x.site_name})"
            label="Select Site"
            dense
            class="mx-5 mt-5 mb-n3"
            @change="update_wind_rose"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <!-- <v-skeleton-loader v-if="isLoading" type="card" max-width="300" class="mx-auto py-10"></v-skeleton-loader> -->
          <div id="my_figure" class="my_dataviz mx-auto my-auto"></div>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
// canvas: show a data plot
//  eg:
//     canvas_config:{
//     title:"Upload Site Data",
//     label:"Site Locations",
//     isLoading:false,
//     update_data:"sites"}
import { mapState } from "vuex";
import PlotCase from "@/assets/js/data_plot";
import data_process from "@/assets/js/data_process";
export default {
  name: "wind_rose",
  props: ["canvas_config"],
  data: () => ({
    selected_site: "",
  }),
  async mounted() {
    // this.isLoading = true;
    this.plot_case = new PlotCase('wind_rose');
    this.plot_case.plot_windrose("my_figure", null, "medium");
    // this.isLoading = false;
  },
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
  },
  methods: {
    async update_wind_rose(){
      let data_filter = {
        site_name:[this.selected_site],
      }
      let selected_data = await data_process.data_filter(this.app_data.wind_data.data, data_filter)
      let wind_rose_data = await data_process.data_cal_windrose(selected_data)
      this.plot_case.plot_windrose("my_figure", wind_rose_data, "medium")
    }
  },
};
</script>

<style scoped>
.my_dataviz {
  height: 100%;
  width: 100%;
}
</style>
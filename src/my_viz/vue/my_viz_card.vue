<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-0 pa-0"
      :height="card_height"
      :elevation="hover ? 25 : 2"
      @click="expand"
    >
      <v-system-bar tile class="py-1 px-2 grey darken-3" @dblclick="expand">
        <v-row class="ma-0 pa-0" no-gutters>
          <div class="ml-2 mt-1 mb-0">
            <!-- <span id="header" class="subtitle-1 font-weight-bold">{{
              app_data.plot_data[card_index].name
            }}</span> -->
          </div>
          <v-spacer></v-spacer>
        </v-row>
        <v-btn small icon>
          <v-icon small @click="expand"> mdi-arrow-expand </v-icon>
        </v-btn>
        <v-btn small icon>
          <v-icon small @click="close_view"> mdi-close </v-icon>
        </v-btn>
      </v-system-bar>
      <!-- <v-divider class="mx-2"></v-divider> -->
      <!-- <div class="mx-1" :id="app_data.plot_data[card_index].name"></div> -->
    </v-card>
  </v-hover>
</template>
<script>
// import plotting from "@/assets/js/plot_GL";
// import { mapState, mapMutations } from "vuex";
export default {
  name: "viz_card",
  props: ["card_height", "my_plot"],
  mounted() {
    // this.CHANGE_PLOT_DATA(this.card_index);
    // this.card_name = this.app_data.plot_data[this.card_index].name;
    // this.card_data = this.app_data.plot_data[this.card_index];
    // this.plotting = new plotting(this.card_name, this.card_data);
    // this.plotting.set_layout("small_plot");
    // this.plotting.draw(this.card_data.plots.type);
    // window.scrollTo(0, 300);
  },
  data: () => ({}),
  computed: {
    // ...mapState({
    //   lakes: "lakes",
    //   app_data: "app_data",
    // }),
    // is_update() {
    //   return this.lakes.prev_filter;
    // },
  },
  watch: {
    // is_update() {
    //   this.CHANGE_PLOT_DATA(this.card_index);
    //   this.card_name = this.app_data.plot_data[this.card_index].name;
    //   this.card_data = this.app_data.plot_data[this.card_index];
    //   this.plotting.set_data(this.card_data);
    //   this.plotting.set_layout("small_plot");
    //   this.plotting.draw(this.card_data.plots.type);
    //   this.lakes.update = false;
    // },
  },
  methods: {
    // ...mapMutations(["CHANGE_PLOT_DATA"]),
    expand() {
      //   var index = this.app_data.current_plot_order.indexOf(this.card_index);
      //   this.app_data.last_expand = this.app_data.main_card_index;
      //   this.app_data.current_plot_order[index] = this.app_data.main_card_index;
      //   this.app_data.main_card_index = this.card_index;
    },
    close_view() {
      //   var index_1 = this.app_data.current_plot_order.indexOf(this.card_index);
      //   this.app_data.current_plot_order.splice(index_1, 1);
      //   var index_2 = this.app_data.view_selected.indexOf(this.card_index);
      //   this.app_data.view_selected.splice(index_2, 1);
      //   // console.log(this.app_data.view_selected);
      //   // console.log(this.app_data.current_plot_order);
      //   if (this.app_data.last_expand == this.card_index)
      //     this.app_data.last_expand = -1;
    },
  },
};
</script>
<style scoped>
.span #header {
  display: inline-block;
  vertical-align: middle;
  height: 150px;
}
/* .v-card__title {
  height: 30px;
} */
</style>
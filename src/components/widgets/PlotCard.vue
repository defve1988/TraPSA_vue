<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-0 pa-0"
      :height="card_config.height"
      :elevation="hover ? 4 : 1"
    >
      <v-system-bar :class="ui_control.system_bar_class">
        {{ card_config.title }}
        <v-spacer></v-spacer>
      </v-system-bar>

      <v-container class="pt-0">
        <v-row justify="center" class="py-0 my-0">
          <v-col class="mx-0 px-0 py-0 my-0">
            <v-select
              v-if="card_config.selector.type == 'v-select'"
              v-model="v_select_value"
              :items="
                app_data.sites.df.map((x) => {
                  return x.site_name;
                })
              "
              :label="card_config.selector.label"
              dense
              class="mx-5 mt-5 mb-n3"
              @change="update_value"
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row justify="center">
          <v-col class="mx-0 px-0 pt-0 mt-0">
            <div :ref="card_config.card_ref" :id="card_config.card_div"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-hover>
</template>
    
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "plot_card",
  props: ["card_obj", "card_config"],
  components: {},
  mounted() {
    this.init_fig();
    //  this.change_values();
  },
  data: () => ({
    v_select_value: "",
  }),
  computed: {
    ...mapState({
      ui_control: "ui_control",
      app_data: "app_data",
      plot_data: "plot_data",
    }),
  },
  watch: {},
  created() {
    window.addEventListener("resize", this.resize_fig);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize_fig);
  },
  methods: {
    ...mapMutations(["GEN_WINDROSE"]),
    resize_fig() {
      this.plot_data[this.card_obj].plot_obj.set_layout({
        width: this.$refs[this.card_config.card_ref].clientWidth,
      });
      this.plot_data[this.card_obj].plot_obj.update_layout();
    },

    update_value() {
      if (this.card_config.selector.type == "v-select") {
        console.log(this.v_select_value);
        this.GEN_WINDROSE(this.card_config.selector.trace_data, {
          [this.card_config.selector.select_attr]: this.v_select_value,
        });
        this.plot_data[this.card_obj].plot_obj.gen_wind_rose(this.plot_data[this.card_config.selector.select_attr]);
      }
      // this.GENE_HIST_TRACE_ALL(this.selectors.tabs[this.tab_index]);
      // this.app_data.hist_view.plot_obj.gen_hist(
      //   this.app_data.hist_trace.data,
      //   this.app_data.hist_trace.max_y
      // );
    },

    init_fig() {
      var plot = {
        div: this.card_config.card_div,
        id: this.card_config.card_div,
        title: "",
        viz_type: "plotly",
        fig_type: "meduim",
        layout: {
          title: "",
          showlegend: true,
          legend: {
            font: {
              size: 10,
              family: "",
              color: "black",
            },
            xanchor: "auto",
            yanchor: "auto",
            x: 1,
            y: 1,
          },
          width: this.$refs[this.card_config.card_ref].clientWidth,
          height: this.card_config.height,
          autosize: true,
          margin: { r: 25, t: 25, b: 25, l: 50 },
        },
        config: {
          displaylogo: false,
          responsive: true,
          displayModeBar: false,
        },
      };
      this.plot_data[this.card_obj].init_config(plot);
      this.update_value()
    },
  },
};
</script>
<style scoped>
.v-list {
  overflow-y: auto;
  overflow-x: auto;
  scrollbar-width: none;
  max-height: 500px;
}
.v-list::-webkit-scrollbar {
  display: none;
}
</style>
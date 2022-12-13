<template>
  <v-hover v-slot:default="{ hover }">
    <v-card height="card_height" width="1000" :elevation="hover ? 4 : 1">
      <v-card-text class="map_card_full_screen pa-0 ma-0">
        <v-system-bar :class="ui_control.system_bar_class">
          {{ map_title }}
          <v-spacer></v-spacer>
          <v-tooltip
            bottom
            v-for="(button, index) in map_tool_buttons"
            :key="index"
          >
            <template v-slot:activator="{ on: tooltip }" v-if="button.show">
              <v-btn
                icon
                x-small
                v-on="{ ...tooltip }"
                v-if="
                  button.text != 'change_map_type' &&
                  button.text != 'color_map' &&
                  button.text != 'dot_size' &&
                  button.text != 'opacity'
                "
                @click="tool_buttons_func(button.text)"
                :disabled="button.isdisabled"
                class="mr-1"
              >
                <v-icon
                  small
                  v-if="
                    button.text != 'full_screen' && button.text != 'show_site'
                  "
                  class="ma-0"
                  >{{ button.mdi }}</v-icon
                >
                <v-icon
                  small
                  v-if="button.text == 'full_screen' && !full_screen_map"
                  >{{ button.mdi }}</v-icon
                >

                <v-icon
                  small
                  v-if="button.text == 'full_screen' && full_screen_map"
                  >mdi-arrow-collapse-all</v-icon
                >

                <v-icon small v-if="button.text == 'show_site' && show_site">
                  {{ button.mdi }}</v-icon
                >

                <v-icon small v-if="button.text == 'show_site' && !show_site"
                  >mdi-map-marker</v-icon
                >
              </v-btn>
              <!-- How to bind two activators -->
              <v-menu
                offset-y
                transition="scroll-x-transition"
                v-if="button.text == 'change_map_type'"
              >
                <template v-slot:activator="{ on: meun }">
                  <v-btn
                    x-small
                    icon
                    v-on="{ ...tooltip, ...meun }"
                    class="mr-1"
                  >
                    <v-icon small class="ma-0"> {{ button.mdi }}</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <!-- <v-subheader>Change Map Style</v-subheader> -->
                  <v-list-item-group>
                    <v-list-item
                      v-for="(map, index) in plot_data.map_style"
                      :key="index"
                      @click="change_map_type(index)"
                    >
                      {{ map.text }}
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>

              <v-menu
                offset-y
                transition="scroll-x-transition"
                v-if="button.text == 'color_map'"
              >
                <template v-slot:activator="{ on: meun }">
                  <v-btn
                    x-small
                    icon
                    v-on="{ ...tooltip, ...meun }"
                    class="mr-1"
                  >
                    <v-icon small class="ma-0"> {{ button.mdi }}</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <!-- <v-subheader>Change Map Style</v-subheader> -->
                  <v-list-item-group>
                    <v-list-item
                      v-for="(color, index) in color_scale"
                      :key="index"
                      @click="change_color_scale(index)"
                    >
                      {{ color }}
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>

              <v-menu
                offset-y
                transition="scroll-x-transition"
                v-if="button.text == 'dot_size'"
              >
                <template v-slot:activator="{ on: meun }">
                  <v-btn
                    x-small
                    icon
                    v-on="{ ...tooltip, ...meun }"
                    class="mr-1"
                  >
                    <v-icon small class="ma-0"> {{ button.mdi }}</v-icon>
                  </v-btn>
                </template>
                <v-card width="200" height="80">
                  <v-row dense class="ma-1 pa-2">
                    <v-col
                      cols="3"
                      class="mt-3"
                      style="text-align: right"
                      align-self="center"
                    >
                      Size:
                    </v-col>

                    <v-col cols="9" class="mt-3">
                      <v-slider
                        v-model="plot_data.dot_size"
                        :label="plot_data.dot_size.toFixed(2)"
                        color="primary"
                        track-color="primary lighten-3"
                        max="50"
                        min="1"
                        step="1"
                        inverse-label
                        hide-details
                        @change="change_dot_size"
                      ></v-slider>
                    </v-col>
                  </v-row>
                </v-card>
              </v-menu>

              <v-menu
                offset-y
                transition="scroll-x-transition"
                v-if="button.text == 'opacity'"
              >
                <template v-slot:activator="{ on: meun }">
                  <v-btn
                    x-small
                    icon
                    v-on="{ ...tooltip, ...meun }"
                    class="mr-1"
                  >
                    <v-icon small class="ma-0"> {{ button.mdi }}</v-icon>
                  </v-btn>
                </template>
                <v-card width="200" height="80">
                  <v-row dense class="ma-1 pa-2">
                    <v-col
                      cols="3"
                      class="mt-3"
                      style="text-align: right"
                      align-self="center"
                    >
                      Size:
                    </v-col>

                    <v-col cols="9" class="mt-3">
                      <v-slider
                        v-model="plot_data.opacity"
                        :label="plot_data.opacity.toFixed(1)"
                        color="primary"
                        track-color="primary lighten-3"
                        max="1"
                        min="0"
                        step="0.1"
                        inverse-label
                        hide-details
                        @change="change_opacity"
                      ></v-slider>
                    </v-col>
                  </v-row>
                </v-card>
              </v-menu>
            </template>
            <span>{{ button.tooltips }}</span>
          </v-tooltip>
        </v-system-bar>

        <div :ref="map_div_id" :id="map_div_id"></div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "mapping_widget",
  components: {},
  props: [
    "map_div_id",
    "map_title",
    "button_not_uesd",
    "card_height",
    "map_card_type",
    "map_obj",
  ],
  data: () => ({
    full_screen_map: false,
    color_scale: ["Default", "Hot", "Viridis", "Greys"],
    show_site: false,
    map_tool_buttons: [
      {
        text: "change_map_type",
        show: true,
        tooltips: "Change Map Style",
        mdi: "mdi-map",
        isdisabled: false,
      },
      {
        text: "reset_map",
        show: true,
        tooltips: "Reset Map",
        mdi: "mdi-refresh",
        icnisdisabled: false,
      },
      {
        text: "show_site",
        show: true,
        tooltips: "Show Sites",
        mdi: "mdi-map-marker-circle",
        isdisabled: false,
      },
      // {
      //   text: "show_text",
      //   show: true,
      //   tooltips: "Show text notation",
      //   mdi: "mdi-format-text",
      //   isdisabled: false,
      // },
      {
        text: "dot_size",
        show: true,
        tooltips: "Dot size",
        mdi: "mdi-grain",
        isdisabled: false,
      },
      {
        text: "color_map",
        show: true,
        tooltips: "Select Colormap",
        mdi: "mdi-palette",
        isdisabled: false,
      },
      {
        text: "opacity",
        show: true,
        tooltips: "Set opacity",
        mdi: "mdi-opacity",
        isdisabled: false,
      },
      {
        text: "full_screen",
        show: true,
        tooltips: "Full Screen",
        mdi: "mdi-arrow-expand-all",
        isdisabled: false,
      },
      {
        text: "save_image",
        show: true,
        tooltips: "Save Current Map",
        mdi: "mdi-download",
        isdisabled: false,
      },
    ],
  }),
  watch: {
    //   if app_data.mapping changed then plot
    site_data() {
      if (this.map_card_type == "site_preview") {
        this.plot_site();
      }
    },
  },
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
      plot_data: "plot_data",
    }),
    site_data() {
      return this.app_data.sites.df;
    },
    // compute a app_data.mapping as watch
  },
  created() {
    window.addEventListener("resize", this.resize_fig);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize_fig);
  },
  mounted() {
    this.init_map();
    // if some buttons are not used
    for (var i = 0; i < this.button_not_uesd.length; i++) {
      this.map_tool_buttons[this.button_not_uesd[i]].show = false;
    }
  },
  methods: {
    resize_fig() {
      this.plot_data[this.map_obj].plot_obj.set_layout({
        width: this.$refs[this.map_div_id].clientWidth,
      });
      this.plot_data[this.map_obj].plot_obj.update_layout();
    },

    init_map() {
      var plot = {
        div: this.map_div_id,
        id: this.map_div_id,
        title: this.map_title,
        viz_type: "mapbox",
        fig_type: "map",
        layout: {
          mapbox: this.plot_data.map_style[0].mapbox,
          dragmode: "zoom",
          showlegend: false,
          width: this.$refs[this.map_div_id].clientWidth,
          height: this.card_height,
          autosize: true,
          margin: { r: 0, t: 0, b: 0, l: 0 },
        },
        config: {
          mapboxAccessToken:
            "pk.eyJ1IjoiZGVmdmUxOTg4IiwiYSI6ImNrNzNzZmN3dzBmMnMzZ3FvMzJ0MDRpa2QifQ.xLG4lim5AonGbkDtgP9-5A",
          displaylogo: false,
          responsive: true,
          displayModeBar: false,
        },
      };
      plot.layout.mapbox.center = { lat: 0, lon: 0 };
      plot.layout.mapbox.zoom = 0;
      //   console.log(plot)
      this.plot_data[this.map_obj].init_map(plot);
    },
    change_map_type(index) {
      var map_box = { mapbox: this.plot_data.map_style[index].mapbox };
      this.plot_data[this.map_obj].plot_obj.set_layout(map_box);
      this.plot_data[this.map_obj].plot_obj.update_layout();
    },

    plot_site() {
      var sites = {
        text: this.app_data.sites.get_col("site_name"),
        lon: this.app_data.sites.get_col("lon"),
        lat: this.app_data.sites.get_col("lat"),
      };
      // console.log(sites);
      this.site = this.plot_data[this.map_obj].plot_obj.gen_dots(
        sites,
        null,
        null,
        true
      );
      console.log(this.site);
    },

    hide_site() {
      this.plot_data[this.map_obj].plot_obj.trace.map((trace, index) => {
        if (trace.type == "scattermapbox" && trace.lat.length > 0) {
          this.plot_data[this.map_obj].plot_obj.del_trace(index);
        }
      });
    },

    change_color_scale(index) {
      var reverse = this.color_scale[index] == "Greys" ? true : false;
      var new_layout = {
        coloraxis: {
          colorscale: this.color_scale[index],
          reversescale: reverse,
          colorbar: {
            xanchor: "right",
            yanchor: "top",
            x: 1,
            y: 1,
            len: 0.3,
          },
        },
      };
      this.plot_data[this.map_obj].plot_obj.set_layout(new_layout);
      this.plot_data[this.map_obj].plot_obj.update_layout();
    },
    change_dot_size() {
      var new_style = {
        radius: this.plot_data.dot_size,
      };
      // console.log(new_style)
      this.plot_data[this.map_obj].plot_obj.update_style(new_style);
    },
    // TODO: not change instantly
    change_opacity() {
      var new_style = {
        opacity: this.plot_data.opacity,
      };
      console.log(new_style);
      this.plot_data[this.map_obj].plot_obj.update_style(new_style);
    },
    tool_buttons_func(func_text) {
      switch (func_text) {
        case "save_image":
          this.plot_data[this.map_obj].plot_obj.save_image("saved_map");
          break;
        case "show_site":
          this.show_site = !this.show_site;
          if (this.show_site) {
            this.plot_site();
          } else {
            this.hide_site();
          }
          break;
        case "color_map":
          break;
        case "dot_size":
          break;
        case "reset_map":
          if (this.map_card_type == "site_preview") {
            this.init_map();
            this.plot_site();
          } else {
            this.init_map();
          }
          break;
        case "full_screen":
          this.$fullscreen.toggle(
            this.$el.querySelector(".map_card_full_screen"),
            {
              wrap: false,
              callback: this.fullscreenChange,
            }
          );
          this.full_screen_map = !this.full_screen_map;
          if (this.full_screen_map) {
            this.mapping.update_layout({
              width: this.$refs.map_card.clientWidth,
              height: this.$refs.map_card.clientHeight,
            });
          } else {
            this.mapping.update_layout({
              width: this.$refs.map_card.clientWidth,
              height: this.card_height - 40,
            });
          }
          break;
      }
    },
    fullscreenChange(full_screen_map) {
      this.full_screen_map = full_screen_map;
    },
  },
};
</script>


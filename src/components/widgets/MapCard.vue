<template>
  <v-card height="card_height" width="1000">
    <v-card-text class="map_card_full_screen pa-0 ma-0">
      <v-toolbar class="elevation-0">
        <v-toolbar-title class="font-weight-light pr-3">
          Mapping Tools
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-tooltip bottom v-for="(button, index) in tool_buttons" :key="index">
          <template v-slot:activator="{ on: tooltip }" v-if="button.show">
            <v-btn
              icon
              v-on="{ ...tooltip }"
              v-if="button.text != 'change_map_type'"
              @click="tool_buttons_func(button.text)"
              :disabled="button.isdisabled"
            >
              <v-icon v-if="button.text != 'full_screen' || !full_screen_map">{{
                button.mdi
              }}</v-icon>
              <v-icon v-if="button.text == 'full_screen' && full_screen_map"
                >mdi-arrow-collapse-all</v-icon
              >
            </v-btn>
            <!-- How to bind two activators -->
            <v-menu offset-y transition="scroll-x-transition" v-else>
              <template v-slot:activator="{ on: meun }">
                <v-btn icon v-on="{ ...tooltip, ...meun }">
                  <v-icon> mdi-map</v-icon>
                </v-btn>
              </template>
              <v-list>
                <!-- <v-subheader>Change Map Style</v-subheader> -->
                <v-list-item-group>
                  <v-list-item
                    v-for="map in map_type"
                    :key="map"
                    @click="change_map_type(map)"
                  >
                    {{ map }}
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </template>
          <span>{{ button.tooltips }}</span>
        </v-tooltip>
      </v-toolbar>

      <div ref="map_card" id="map_div_source"></div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import Mapping from "@/assets/js/mapping";
export default {
  name: "mapping_widget",
  components: {},
  props: ["button_not_uesd", "card_height", "map_card_type"],
  data: () => ({
    map_type: ["Simple Map", "Dark Theme", "Land Map", "Satellite Map"],
    full_screen_map: false,
    tool_buttons: [
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
        text: "full_screen",
        show: true,
        tooltips: "Full Screen",
        mdi: "mdi-arrow-expand-all",
        isdisabled: false,
      },
      {
        text: "grid_smoothing",
        show: true,
        tooltips: "Grid Smoothing",
        mdi: "mdi-grain",
        isdisabled: false,
      },
      {
        text: "identify_source",
        show: true,
        tooltips: "Identify hotspots",
        mdi: "mdi-map-marker-circle",
        isdisabled: false,
      },
      {
        text: "show_text",
        show: true,
        tooltips: "Show text notation",
        mdi: "mdi-format-text",
        isdisabled: false,
      },
      {
        text: "color_map",
        show: true,
        tooltips: "Adjust Colormap",
        mdi: "mdi-palette",
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
    }),
    site_data() {
      return this.app_data.sites.data;
    },
    // compute a app_data.mapping as watch
  },
  created() {
    window.addEventListener("resize", this.resize_map);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize_map);
  },
  mounted() {
    this.init_map();
    // if some buttons are not used
    for (var i = 0; i < this.button_not_uesd.length; i++) {
      this.tool_buttons[this.button_not_uesd[i]].show = false;
    }
  },
  methods: {
    init_map() {
      this.map_config = {
        style: "light",
        center: { lat: 45, lon: -90 },
        zoom: 1,
      };
      this.mapping = new Mapping("map_div_source");
      this.mapping.set_layout({
        width: this.$refs.map_card.clientWidth,
        height: this.card_height - 40,
      });
      this.mapping.plot_map(this.map_config);
    },
    resize_map() {
      this.mapping.update_layout({
        width: this.$refs.map_card.clientWidth,
      });
    },
    tool_buttons_func(func_text) {
      switch (func_text) {
        case "save_image":
          this.mapping.save_image();
          break;
        case "reset_map":
          if (this.map_card_type == "site_preview") {
            this.init_map();
            this.plot_site();
          } else {
            this.show_map();
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
              height: 1000,
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
    plot_site() {
      var lat = this.app_data.sites.data.map((x) => x.lat);
      var lon = this.app_data.sites.data.map((x) => x.lon);
      var site_name = this.app_data.sites.data.map((x) => x.site_name);
      this.mapping.plot_dot(lat, lon, site_name, "right");
    },
    show_map() {
      if (this.app_data.case.filter((x) => x.model.selected).length > 0) {
        this.app_data.ui_control.isLoading = "primary lighten-2";
        this.isdisabled = true;
        this.$worker
          .run(
            (cases, traj) => {
              var selected = cases.filter((x) => x.model.selected);
              var model_type = selected[0].model.type;
              var model_chemical = selected[0].chemical;
              var traj_job = selected[0].model.traj;
              var res = {
                error: 0,
                data: [],
                model: selected[0].model,
                chemical: model_chemical,
              };
              var data = [];
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
                } else if (traj_job != selected[s].model.traj) {
                  res = {
                    error: 1,
                    text: "Trajectory jobs should be the same.",
                  };
                }
              }

              if (res.error == 1) {
                return res;
              }

              // if the data is correct
              for (var i = 0; i < selected.length; i++) {
                var measurement = selected[i].data.measurement;
                var traj_data = traj.filter(
                  (x) => x.job_name == selected[i].model.traj
                );
                traj_data = traj_data[0].data;
                traj_data = traj_data.filter(
                  (x) => x.site_name == selected[i].site
                );

                measurement = measurement.map((x) => {
                  x.id = +new Date(x.TimeString);
                  return x;
                });
                traj_data = traj_data.map((x) => {
                  x.id = +new Date(x.timestamp);
                  return x;
                });

                var conc_index = measurement.reduce((prev, curr) => {
                  prev[curr.id] = curr.selected_chemical;
                  return prev;
                }, {});

                var temp = traj_data.map((x) => {
                  x.conc = conc_index[x.id];
                  return x;
                });
                temp = temp.filter((x) => x.conc != null);
                data = data.concat(temp);
              }
              res.data = data;
              return res;
            },
            [this.app_data.case, this.app_data.traj_data]
          )
          .then((res) => {
            // data: lon, lat, conc, alt
            console.log(res)
            if (res.error == 1) {
              console.log("display warning");
            } else {
              switch (res.model.type) {
                case "PSCF":
                  var pscf = this.mapping.cal_PSCF(res);
                  this.mapping.plot_heat_map(pscf);
                  break;
              }
            }

            this.app_data.ui_control.isLoading = false;
            this.isdisabled = false;
          });
      }
    },
    change_map_type(map_type) {
      delete this.map_config.layers;
      switch (map_type) {
        case "Land Map":
          this.map_config.style = "outdoors";
          break;
        case "Simple Map":
          this.map_config.style = "light";
          break;
        case "Satellite Map":
          this.map_config.style = "white-bg";
          this.map_config.layers = [
            {
              sourcetype: "raster",
              source: [
                "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
              ],
              below: "traces",
            },
            { sourcetype: "streets" },
          ];
          break;
        case "Dark Theme":
          this.map_config.style = "dark";
          break;
      }
      this.mapping.update_map(this.map_config);
    },
  },
};

// m = [
//   { id: 1, conc: 1 },
//   { id: 2, conc: 2 },
//   { id: 3, conc: 3 },
//   { id: 4, conc: 4 },
//   { id: 5, conc: 5 },
//   { id: 6, conc: 6 },
//   { id: 7, conc: 7 },
// ];
// t = [
//   { id: 1, traj: 11 },
//   { id: 1, traj: 111 },
//   { id: 2, traj: 22 },
//   { id: 2, traj: 222 },
//   { id: 3, traj: 33 },
//   { id: 4, traj: 44 },
// ];
</script>


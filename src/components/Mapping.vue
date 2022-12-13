<template>
  <v-card height="700" width="1000">
    <v-toolbar class="elevation-0">
      <v-toolbar-title class="font-weight-light pr-3">
        Mapping Tools
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            icon
            v-on="{ ...tooltip }"
            @click="show_map"
            :disabled="isdisabled"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Display results</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-on="{ ...tooltip }">
            <v-icon>mdi-grain</v-icon>
          </v-btn>
        </template>
        <span>Grid Smoothing</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-on="{ ...tooltip }">
            <v-icon>mdi-arrow-expand-all</v-icon>
          </v-btn>
        </template>
        <span>Grid Smoothing</span>
      </v-tooltip>

      <v-btn-toggle group>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon v-on="{ ...tooltip }">
              <v-icon>mdi-map-marker-circle</v-icon>
            </v-btn>
          </template>
          <span>Identify hotspots</span>
        </v-tooltip>
      </v-btn-toggle>

      <!-- How to bind two activators -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-menu offset-y transition="scroll-x-transition">
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
        <span>Change Map Style</span>
      </v-tooltip>

      <v-btn-toggle group>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon v-on="{ ...tooltip }">
              <v-icon>mdi-format-text</v-icon>
            </v-btn>
          </template>
          <span>Show text notation</span>
        </v-tooltip>
      </v-btn-toggle>

      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-on="{ ...tooltip }">
            <v-icon>mdi-palette</v-icon>
          </v-btn>
        </template>
        <span>Adjust Colormap</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-on="{ ...tooltip }" @click="save_image">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </template>
        <span>Save Current Map</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-text class="pa-0 ma-0">
      <div id="map_div_source"></div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import Mapping from "@/assets/js/mapping";
export default {
  name: "mapping_widget",
  components: {},
  data: () => ({
    map_type: ["Simple Map", "Borderline", "Land Map", "Satellite Map"],
    isdisabled: false,
  }),
  watch: {
    //   if app_data.mapping changed then plot
  },
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
    // compute a app_data.mapping as watch
  },
  mounted() {
    (this.map_config = {
      style: "light",
      center: { lat: 45, lon: -90 },
      zoom: 1,
    }),
      (this.mapping = new Mapping("map_div_source"));
    this.mapping.set_layout({ width: 978, height: 630 });
    this.mapping.plot_map(this.map_config);
  },
  methods: {
    save_image() {
      this.mapping.save_image();
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
            // console.log(res)
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
        case "Borderline":
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



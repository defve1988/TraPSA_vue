import dv2_plot from "@/dv2/dv2_plot"

const state = {
   site_preview: new dv2_plot(),
   source_map: new dv2_plot(),
   wind_rose_preview: new dv2_plot(),
   wind_rose_preview_trace:null,
   dot_size:15,
   opacity:0.8,

   map_style: [
      {
        text: "Light Style",
        mapbox: {
          style: "light",
        },
      },
      {
        text: "Dark Style",
        mapbox: {
          style: "dark",
        },
      },
      {
        text: "Land Map",
        mapbox: {
          style: "outdoors",
        },
      },
      {
        text: "Satellite Map",
        mapbox: {
          style: "white-bg",
          layers: [
            {
              sourcetype: "raster",
              source: [
                "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
              ],
              below: "traces",
            },
            { sourcetype: "streets" },
          ],
        },
      },
    ],

};

const getters = {

};

const actions = {

};

const mutations = {
  GEN_WINDROSE(state, trace_data, filter){

  }
};

export default {
   state,
   getters,
   actions,
   mutations
};
<template>
  <v-card color="secondary" flat class="pb-0">
    <v-container class="px-10 pt-1 pb-0 mb-0">
      <v-row>
        <v-col cols="6" class="mt-2 px-2 mb-3">
          <v-hover v-slot:default="{ hover }">
          <v-card height="455" :elevation="hover ? 4 : 1">
            <v-system-bar
              :class="ui_control.system_bar_class"
            >
              About TraPSA Web Application
            </v-system-bar>
            <v-card-text class="subtitle-1">
              <p>
               <strong>TraPSA</strong> is an open source web application for air pollutant
                potential source location apportionments. TraPSA performs trajectory ensemble 
                receptor models using pollutant measurement and
                <abbr title="National Oceanic and Atmospheric Administration">
                  NOAA</abbr
                >
                &nbsp;
                <abbr
                  title="Hybrid Single-Particle Lagrangian Integrated Trajectory"
                  >HYSPLIT
                </abbr>
                trajectory data. TraPSA aims to provide the air quality
                community a user-friendly and powerful tool to:
                <ol>
                  <li>Manage research projects, </li>
                  <li>Generate trajectory endpoints, and mixed layer height,</li>
                  <li>Analysis pollutant patterns,</li>
                  <li>Perform various trajectory ensemble receptor models, such as
                <abbr title="Conditional Probability Function">CPF </abbr>,
                <abbr title="Concentration Field Analysis">CFA </abbr>,
                <abbr title="Concentration Weighted Trajectory">CWT </abbr>,
                <abbr title="Potential Source Contribution Function">PSCF </abbr
                >,
                <abbr title="Residence Time Weighted Concentration">RTWC </abbr
                >, and
                <abbr title="Simplified Quantitative Transport Bias Analysis"
                  >SQTBA </abbr
                >.</li>
                </ol>
              </p>

              <p>
                TraPSA is developed using
                <a href="https://vuejs.org/" target="_blank">Vue.js</a>,
                combined with
                <a
                  href="https://flask.palletsprojects.com/en/1.1.x/"
                  target="_blank"
                  >Python-Flask</a
                >
                backend.
                <a href="https://d3js.org/" target="_blank">D3.js</a>,
                <a href="https://plotly.com/javascript/" target="_blank"
                  >Plotly.js</a
                >
                are used for the data visualizations, and the interactive map is
                provided by
                <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>
                .
              </p>
              <p class="caption">
                If you find any issues with using this application, please firstly switch to Incognito windows 
                as some plug-in may have unkonwn effect on it. If the problem still exists, please contact 
                <a href = "mailto:zhouchuanlong1988@gmail.com">me</a>.
              </p>
            </v-card-text>
          </v-card>
          </v-hover>
        </v-col>
        <v-col cols="6" class="mt-2 px-2">
          <v-hover v-slot:default="{ hover }">
          <v-card height="455" id="video_conatiner" class="pa-0" :elevation="hover ? 4 : 1">
            <v-system-bar
              :class="ui_control.system_bar_class"
            >
              Video Turtorial
            </v-system-bar>
            <v-container class="pa-3 pt-0 pb-0">
              <v-row justify="center">
                <!-- <video :width="video_width" height="430" controls>
                  <source src="data/turtorial.mp4" type="video/mp4" />
                </video>
                src="https://vimeo.com/manage/videos/542644809" -->

                <!-- <iframe :width="video_width" height="430" src="https://player.vimeo.com/542644809" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->

                <iframe src="https://player.vimeo.com/video/542644809?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                frameborder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowfullscreen 
                 title="TraPSA_tutorial" 
                 :width="video_width" height="430"></iframe>
                <!-- <script src="https://player.vimeo.com/api/player.js"> -->

              </v-row>
            </v-container>
          </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pt-0" cols="5">
          <v-hover v-slot:default="{ hover }">

          <v-card height="270" :elevation="hover ? 4 : 1">
            <v-system-bar
              :class="ui_control.system_bar_class"
            >
              Example Dataset
            </v-system-bar>
            <v-card-text class="subtitle-1">
              <p class="my-0">Example dataset with saved TraPSA sections.</p>
              <ul>
                <li>
                  <a href="example_data.rar">Example Dataset</a>
                  What data files are needed?
                </li>
                <li>
                  <a href="example_hysplit.bat">Example HYSPLIT</a>
                  What 
                  <i>
                    <abbr title=
                    "TraPSA currently supports only windows version of HYSPLIT4, 
however, it is possible to upload the generated endpoint files 
with a certain format for further analysis."
                    >
                    .bat
                    </abbr>
                </i> 
                  file will be genereated for HYSPLIT?
                </li>
                <li>
                  <a href="example_trajectory.csv">Example Endpoints</a>
                  What trajectory endpoint file will be generated?
                </li>
                <li>
                  <a href="example.trapsa" download>Example TraPSA section</a>
                  How can you resume your prvious sections? Upload with
                  <i>Open Section</i> button.
                </li>
              </ul>
              <p></p>
              <p></p>
              <p></p>
            </v-card-text>
          </v-card>
          </v-hover>
        </v-col>
        <v-col class="pt-0">
          <v-hover v-slot:default="{ hover }">

          <v-card height="270" :elevation="hover ? 4 : 1">
            <v-system-bar
              :class="ui_control.system_bar_class"
            >
              Resourse
            </v-system-bar>
            <v-card-text class="subtitle-1">
              <p class="my-0">
                Useful resources for getting started with TraPSA.
              </p>
              <ul>
                <li>
                  <a
                    @click="ui_control.mete_dialog = true;"
                    ><u>Meteorological Data</u></a
                  >
                </li>
                <li>
                  <a
                    href="Review of receptor modeling methods for source.pdf"
                    target="_blank"
                    >Receptor Modeling Paper</a
                  >
                </li>
                <li>
                  <a
                    href="https://webspace.clarkson.edu/projects/TraPSA/public_html/en/userguide.html"
                    target="_blank"
                    >Trajectory Ensemble Algorithms</a
                  >
                </li>
                <li>
                  <a
                    href="Atmospheric Mercury Temporal Trends.pdf"
                    target="_blank"
                    >TraPSA Application Paper (Mercury)</a
                  >
                </li>
                <li>
                  <a
                    href="Ambient Ammonia Concentrations Across New York.pdf"
                    target="_blank"
                    >TraPSA Application Paper (Ammonia)</a
                  >
                </li>
                <li>
                  <a
                    href="https://github.com/defve1988/TraPSA_vue"
                    target="_blank"
                    >TraPSA Source Code</a
                  >,
                  <a
                    href="https://webspace.clarkson.edu/projects/TraPSA/public_html/index.html"
                    target="_blank"
                    >MATLAB version</a
                  >
                </li>
              </ul>
            </v-card-text>
          </v-card>
          </v-hover>
        </v-col>
        <v-col class="pt-0">
          <v-hover v-slot:default="{ hover }">
          <v-card height="270" :elevation="hover ? 4 : 1">
            <v-system-bar
              :class="ui_control.system_bar_class"
            >
              <v-icon> mdi-alert-circle </v-icon>
              HYSPLIT
            </v-system-bar>
            <v-card-text class="subtitle-1">
              <p>
                We provide a <a href="HYSPLIT_demo.rar">demo</a> HYSPLIT 4
                package, which can help you quickly run the example dataset. 
                However, we strongly recommend that
                users register and install the most updated version of HYSPLIT
                software form NOAA in order to generate the
                most accurate trajectories. You can register and download
                <a href="https://www.ready.noaa.gov/HYSPLIT.php" target="_blank"
                  >here</a
                >.
              </p>
            </v-card-text>
          </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
              
<script>
import { mapState } from "vuex";
export default {
  name: "about",
  data: () => ({
    video_width: 500,
  }),
  mounted() {
    this.video_width = document
      .getElementById("video_conatiner")
      .getBoundingClientRect().width;
    // console.log(this.video_width)
  },
  computed: {
    ...mapState({
      ui_control: "ui_control",
    }),
  },
};
</script>
              
<style scoped>
/* div {
  outline: 1px dashed red;
} */
.v-card {
  overflow-y: auto;
}
</style>
<template>
  <v-card color="secondary" flat class="pb-0">
    <v-container class="px-10 pt-1 pb-0 mb-0">
      <v-row>
        <v-col cols="6" class="mt-2 px-2">
          <v-card height="450">
            <v-system-bar
              class="pa-1 px-2 subtitle-1 primary lighten-2 font-weight-regular white--text"
            >
              About TraPSA Web Application
            </v-system-bar>
            <v-card-text class="subtitle-1">
              <p>
                The TraPSA (Trajectory-based Potential Source Apportionment)
                project was developed as a free, open-source toolkit for air
                pollution pattern analysis and potential source locations
                apportionment based on trajectory ensemble receptor models.
              </p>

              <p>
                TraPSA software is a powerful, graphical tool to help the air
                quality community use large monitoring and trajectory data for
                pollutant potential source location apportionment. TraPSA
                provides monitoring site database management, smart trajectory
                generation and handling, pollutant temporal pattern analysis,
                most of existing trajectory ensemble receptor models, and
                sufficient GIS editing functions. TraPSA uses HYSPLIT, a
                state-of-art trajectory model, developed by NOAA, but it also
                functions well without the HYSPLIT software suite on the local
                computer because an unregistered version of the HYSPLIT_4
                trajectory model executable are included in TraPSA.
              </p>
              <p>
                TraPSA was developed at the
                <a href="https://www.clarkson.edu/caares" target="_blank">
                  Center for Air Resource Engineering & Science (CARES)</a
                >
                at Clarkson University.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" class="mt-2 px-2">
          <v-card height="450">
            <v-system-bar
              class="pa-1 px-2 subtitle-1 primary lighten-2 font-weight-regular white--text"
            >
              Video Turtorial
            </v-system-bar>
            <v-container class="pa-3 pt-0">
              <v-row justify="center">
                <iframe
                  width="650"
                  height="400"
                  src="https://www.youtube.com/embed/tgbNymZ7vqY"
                >
                </iframe>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pt-0">
          <v-card height="250">
            <v-system-bar
              class="pa-1 px-2 subtitle-1 primary lighten-2 font-weight-regular white--text"
            >
              Examples
            </v-system-bar>
            <p>
              <a href="\data\data.csv">Measurement Data</a>
            </p>
            <p>
              <a href="\data\site.csv">Site Data</a>
            </p>
            <p>This is an example dataset of O3 measurement.</p>
            <a
              href="https://webspace.clarkson.edu/projects/TraPSA/public_html/index.html"
              >previous MATLAB version</a
            >
          </v-card>
        </v-col>
        <v-col class="pt-0">
          <v-card height="250">
            <v-system-bar
              class="pa-1 px-2 subtitle-1 primary lighten-2 font-weight-regular white--text"
            >
              Resourse
            </v-system-bar>
            <p>
              <a href="\data\data.csv">Measurement Data</a>
            </p>
            <p>
              <a href="\data\site.csv">Site Data</a>
            </p>
            <p>This is an example dataset of O3 measurement.</p>
            <a
              href="https://webspace.clarkson.edu/projects/TraPSA/public_html/index.html"
              >previous MATLAB version</a
            >
          </v-card>
        </v-col>
        <v-col class="pt-0">
          <v-card height="250">
            <v-system-bar
              class="pa-1 px-2 subtitle-1 primary lighten-2 font-weight-regular white--text"
            >
              HYSPLIT
            </v-system-bar>
            <v-card-text>
              <p>
                However, it is strongly recommended that users register and
                install the most current version of HYSPLIT software in order to
                generate the most accurate trajectories.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
              
<script>
export default {
  name: "about",
  data: () => ({}),
  mounted() {},
};
</script>
              
<style scoped>
/* div {
  outline: 1px dashed red;
} */
</style>
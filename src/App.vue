<template>
  <v-app>
    <v-layout class="justify-center">
      <v-col lg="9">
        <!-- app header -->
        <v-card
          color="secondary"
          height="100%"
          :loading="app_data.ui_control.isLoading"
        >
          <v-card-title class="justify-left py-5 px-10">
            <v-icon color="rgba(53, 104, 89, 0.5)" class="mr-n5" size="50"
              >mdi-grid</v-icon
            >
            <v-icon color="primary" size="30" class="ml-n5"
              >mdi-rhombus-medium</v-icon
            >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                  class="font-weight-bold display-2 primary--text ml-6"
                >
                  TraPSA
                </div>
              </template>
              <span
                >Trajectory-based Potential Sourece Apportionment Project</span
              >
            </v-tooltip>

            <v-spacer></v-spacer>
            <!-- <v-btn dark @click="test">Test</v-btn> -->
            <v-btn color="primary lighten-2" class="ml-5" @click="open_section">
              <v-icon left>mdi-folder-open</v-icon>Open Section
            </v-btn>
            <v-btn color="primary lighten-2" class="ml-5" @click="save_section">
              <v-icon left>mdi-download</v-icon>Save Section
            </v-btn>
            <v-btn
              color="primary lighten-2"
              class="ml-5"
              @click="app_data.ui_control.data_view = true"
            >
              <v-icon left>mdi-table-multiple</v-icon>Data Summary
            </v-btn>
            <input
              ref="open_section"
              class="d-none"
              type="file"
              accept=".trapsa"
              @change="upload_section"
            />
          </v-card-title>
          <!-- <v-card-subtitle class="justify-left px-12">
            <div
              class="subtitle-1 primary--text"
            >Trajectory-based Potential Sourece Apportionment Project</div>
          </v-card-subtitle> -->
          <v-divider></v-divider>

          <!-- app tabs -->
          <v-tabs
            v-model="app_data.ui_control.curr_tab"
            background-color="transparent"
            color="primary"
            grow
            height="45px"
            slider-color="primary"
          >
            <v-tab v-for="t in tabs" :key="t.index">
              <v-avatar>
                <v-icon
                  :color="
                    app_data.ui_control.curr_tab === t.index ? 'primary' : ''
                  "
                  >{{ t.icon }}</v-icon
                >
              </v-avatar>
              {{ t.name }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="app_data.ui_control.curr_tab">
            <v-tab-item>
              <About />
            </v-tab-item>
            <v-tab-item>
              <Upload />
            </v-tab-item>
            <v-tab-item>
              <Trajectory />
            </v-tab-item>
            <v-tab-item>
              <Analysis />
            </v-tab-item>
            <v-tab-item>
              <Source />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-layout>

    <!-- app footer -->
    <v-footer height="30">
      <span class="primary--text caption"
        >Chuanlong Zhou &copy; 2020, Center for Air and Aquatic Resources
        Engineering and Sciences (CAARES)</span
      >
    </v-footer>

    <!-- dialogs -->
    <Message />
    <MetedataDialog />
    <MeteDataRequired />
    <v-dialog v-model="app_data.ui_control.data_view" width="1000">
      <DataView />
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import data_format from "@/assets/js/data_format";
export default {
  name: "App",
  components: {
    About: () => import("@/components/tabs/About.vue"),
    Source: () => import("@/components/tabs/Source.vue"),
    Trajectory: () => import("@/components/tabs/Trajectory.vue"),
    Analysis: () => import("@/components/tabs/Analysis.vue"),
    Upload: () => import("@/components/tabs/Upload.vue"),
    Message: () => import("@/components/dialogs/Message.vue"),
    MetedataDialog: () => import("@/components/dialogs/MetedataDialog.vue"),
    MeteDataRequired: () => import("@/components/dialogs/MeteDataRequired.vue"),
    DataView: () => import("@/components/dialogs/DataView.vue"),
  },
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
  },
  mounted() {},
  data: () => ({
    tab_height: "800px",
    tabs: [
      { name: "Introduction", icon: "mdi-information", index: 0 },
      { name: "Upload Data", icon: "mdi-arrow-up-bold-circle", index: 1 },
      { name: "Trajectory", icon: "mdi-earth", index: 2 },
      { name: "Basic Analysis", icon: "mdi-chart-bar", index: 3 },
      { name: "Potential Soure", icon: "mdi-hexagon-multiple", index: 4 },
    ],
  }),
  methods: {
    ...mapMutations(["OPENSECTION"]),
    test() {
      this.app_data.ui_control.data_view = true;
    },
    save_section() {
      this.app_data.ui_control.isLoading = "primary";
      this.$worker
        .run(
          (content) => {
            return new Blob([content], {
              type: "application/json",
            });
          },
          [JSON.stringify(this.app_data)]
        )
        .then((blob) => {
          var pom = document.createElement("a");
          var url = URL.createObjectURL(blob);
          let mm = new Date().getMonth() + 1;
          var section =
            new Date().getFullYear() +
            ("0" + mm).substr(-2) +
            new Date().getDate() +
            ".trapsa";
          pom.href = url;
          pom.setAttribute("download", section);
          pom.click();
          this.app_data.ui_control.isLoading = false;
          this.app_data.ui_control.snackbar = {
            show: true,
            text: "Current section is saved!",
            color: "info",
          };
        });
    },
    open_section() {
      this.$refs.open_section.click();
    },
    upload_section(e) {
      this.app_data.ui_control.isLoading = "primary";
      data_format.readFileAsync(e.target.files[0]).then((res) => {
        this.OPENSECTION(JSON.parse(res));
        this.app_data.ui_control.snackbar = {
          show: true,
          text: "Your previous section is loaded!",
          color: "info",
        };
        this.app_data.ui_control.isLoading = false;
      });
    },
  },
};
</script>

<style>
.span {
  display: inline-block;
  vertical-align: bottom;
}
.my_dataviz {
  height: 100%;
  width: 100%;
}
</style>
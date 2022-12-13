<template>
  <v-app>
    <v-layout class="justify-center">
      <v-col lg="9">
        <!-- app header -->
        <v-card color="secondary" height="100%" :loading="ui_control.isLoading">
          <v-card-title class="justify-left py-2 px-0 pr-5">
            <v-img
              class="img_logo"
              src="logo.png"
              height="100"
              width="100"
              contain
              ele
            ></v-img>
            <v-spacer></v-spacer>
            <!-- <v-btn dark @click="test">Test</v-btn> -->
            <v-btn
              color="primary lighten-2"
              class="ml-5 mt-10"
              @click="open_section"
            >
              <v-icon left>mdi-folder-open</v-icon>Open Section
            </v-btn>
            <v-btn
              color="primary lighten-2"
              class="ml-5 mt-10"
              @click="save_section"
            >
              <v-icon left>mdi-download</v-icon>Save Section
            </v-btn>
            <v-btn
              color="primary lighten-2"
              class="ml-5 mt-10"
              @click="ui_control.data_view = true"
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
          <v-divider></v-divider>

          <!-- app tabs -->
          <v-tabs
            v-model="ui_control.curr_tab"
            background-color="transparent"
            color="primary"
            grow
            height="45px"
            slider-color="primary"
          >
            <v-tab v-for="t in tabs" :key="t.index">
              <v-avatar>
                <v-icon
                  :color="ui_control.curr_tab === t.index ? 'primary' : ''"
                  >{{ t.icon }}</v-icon
                >
              </v-avatar>
              {{ t.name }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="ui_control.curr_tab">
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
        >Chuanlong Zhou &copy; 2020-2021, Center for Air and Aquatic Resources
        Engineering and Sciences (<a href="https://www.clarkson.edu/caares"
          >CAARES</a
        >)
      </span>
    </v-footer>

    <!-- dialogs -->
    <Message />
    <MetedataDialog />
    <MeteDataRequired />
    <v-dialog v-model="ui_control.data_view" width="1000">
      <DataView />
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    About: () => import("@/components/tabs/About.vue"),
    Source: () => import("@/components/tabs/Source.vue"),
    Trajectory: () => import("@/components/tabs/Trajectory.vue"),
    Analysis: () => import("@/components/tabs/Analysis.vue"),
    Upload: () => import("@/components/tabs/Upload.vue"),

    // information dialogs
    Message: () => import("@/components/dialogs/infor/Message.vue"),
    MetedataDialog: () =>
      import("@/components/dialogs/infor/MetedataDialog.vue"),
    MeteDataRequired: () =>
      import("@/components/dialogs/infor/MeteDataRequired.vue"),
    DataView: () => import("@/components/dialogs/infor/DataView.vue"),
  },
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
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
      { name: "Potential Sources", icon: "mdi-hexagon-multiple", index: 4 },
    ],
  }),
  methods: {
    ...mapMutations(["OPENSECTION", "OPENSECTION_UI"]),
    test() {
      this.ui_control.data_view = true;
    },
    save_section() {
      this.ui_control.isLoading = "primary";
      this.$worker
        .run(
          (content) => {
            return new Blob([content], {
              type: "application/json",
            });
          },
          [
            '{"app_data":' +
              JSON.stringify(this.app_data) +
              "," +
              '"ui_control":' +
              JSON.stringify(this.ui_control) +
              "}",
          ]
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
          this.ui_control.isLoading = false;
          this.ui_control.snackbar = {
            show: true,
            text: "Current section is saved!",
            color: "info",
          };
        });
    },
    open_section() {
      this.$refs.open_section.click();
    },
    async upload_section(e) {
      this.ui_control.isLoading = "primary";
      await this.readFileAsync(e.target.files[0]).then((res) => {
        this.OPENSECTION(JSON.parse(res)["app_data"]);
        this.OPENSECTION_UI(JSON.parse(res)["ui_control"]);
        this.ui_control.snackbar = {
          show: true,
          text: "Your previous section is loaded!",
          color: "info",
        };
        this.ui_control.isLoading = false;
      });
    },
    async readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
      });
    },
  },
};
</script>

<style  lang="scss">
.span {
  display: inline-block;
  vertical-align: bottom;
}
.my_dataviz {
  height: 100%;
  width: 100%;
}
.img_logo {
  filter: drop-shadow(0 0 0.2rem rgba(102, 102, 102, 0.5));
}
.img_logo:hover {
  filter: drop-shadow(0 0 0.25rem rgba(3, 184, 99, 0.5));
}

::-webkit {
    &-scrollbar {
      width: 5px;
      &-track {
        /* background: transparent; */
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
      }
    &-thumb {
        background: #888;
        /* -webkit-box-shadow: inset 0 0 6px #888;  */
        border-radius: 12px;
        background-clip: padding-box;
        &:hover {
          /* background: #555; */
          -webkit-box-shadow: inset 0 0 6px #333;
        }
      }
    }
  }


</style>

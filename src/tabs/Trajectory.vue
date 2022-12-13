<template>
  <v-card color="secondary" flat>
    <v-container class="px-10">
      <v-stepper v-model="e1" class="mt-5" vertical>
        <!-- introduction/working folder -->
        <v-stepper-step :rules="isStep1" color="primary lighten-2" :complete="e1 > 1" step="1">
          HYSPLIT Model
          <small v-if="!isStep1[0]()">Please enter HYSPLIT installization path.</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-card class="stepper_card" flat>
            <v-card-text>
              <p class="subtitle-1">
                NOAA HYSPLIT4 model (windows-based version) will be used for trajectory endpoints generation. More infromation can be found
                <a
                  href="https://www.ready.noaa.gov/HYSPLIT.php"
                  target="_blank"
                >here</a>.
              </p>
              <ul class="subtitle-1">
                <li>
                  If you haven't installed HYSPLIT model, please register and download full HYSPLIT version
                  <a
                    href="https://www.ready.noaa.gov/HYSPLIT_register.php"
                    target="_blank"
                  >here</a>.
                </li>
                <li>
                  If you haven't installed HYSPLIT model, you can try TraPSA with HYSPLIT
                  <a
                    href="\data\HYSPLIT_demo.rar"
                  >demo</a>.
                </li>
              </ul>
            </v-card-text>

            <v-card-text>
              <p
                class="subtitle-1"
              >After HYSPLIT has been installed, copy HYSPLIT installization path:</p>
              <v-col cols="12" lg="8" md="12" class="my-n5">
                <v-text-field
                  label="For example: C:\HYSPLIT"
                  prepend-inner-icon="mdi-folder"
                  v-model="app_data.hysplit.working"
                ></v-text-field>
              </v-col>
            </v-card-text>
          </v-card>
          <v-btn color="primary" @click="next_1">Continue</v-btn>
        </v-stepper-content>

        <!-- Trajectory Date -->
        <v-stepper-step :rules="isStep2" color="primary lighten-2" :complete="e1 > 2" step="2">
          Starting Timestamps
          <small v-if="!isStep2[0]()">Please correct expansion parameters.</small>
          <small v-else>Optional</small>
        </v-stepper-step>
        <v-stepper-content step="2">
          <v-card class="stepper_card" flat>
            <v-card-text>
              <p
                class="subtitle-1"
              >Trajectory timestamps can be expanded for the dataset with long sampling periods. For example:</p>
              <ul class="subtitle-1" style="list-style: none;">
                <li>
                  - Measurement was sampled for
                  <b>24 hours</b> and data was collected at
                  <b>2020/1/2 00:00</b>
                </li>
                <li>
                  - You can expand to
                  <b>4 timestamps</b> to cover the whole sampling period
                </li>
                <li>- The strating timestamp for generating back-trajectory in this case will be:
                  <b>2020/1/1 06:00, 2020/1/1 12:00, 2020/1/1 18:00, 2020/1/2 00:00</b>
                </li>
              </ul>
            </v-card-text>
            <v-switch
              v-model="app_data.hysplit.start_time.isExpand"
              :label="(!app_data.hysplit.start_time.isExpand)?'Enable Timestamp Expansion':'Disable Timestamp Expansion'"
              class="mx-5 my-0 py-0"
            ></v-switch>
            <v-row>
              <v-col cols="4" class="my-n5">
                <v-text-field
                  label="Data sampling period (hour)"
                  hint="For the example above: 24"
                  v-model="app_data.hysplit.start_time.sample_period"
                  class="mx-5"
                  :disabled="!app_data.hysplit.start_time.isExpand"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="my-n5">
                <v-text-field
                  label="Expanded timestamp number"
                  hint="For the example above: 4"
                  v-model="app_data.hysplit.start_time.expand_number"
                  class="mx-5"
                  :disabled="!app_data.hysplit.start_time.isExpand"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <v-btn color="primary" @click="next_2">Continue</v-btn>
          <v-btn text @click="e1 = 1">Previous</v-btn>
        </v-stepper-content>
        <!-- trejectory parameter -->
        <v-stepper-step :rules="isStep3" color="primary lighten-2" :complete="e1 > 3" step="3">
          Trejectory Parameters
          <small v-if="!isStep3[0]()">Please correct trejectory parameters.</small>
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-card class="stepper_card pt-2" flat>
            <v-row dense class="mx-0">
              <v-col cols="12" lg="5" md="12">
                <v-select
                  v-model="app_data.hysplit.sites"
                  :items="app_data.sites.data.map((x)=>{return x.site_name})"
                  label="Select strating sites"
                  chips
                  multiple
                ></v-select>
              </v-col>
            </v-row>
            <v-row dense class="mx-0">
              <v-col cols="12" lg="5" md="12">
                <v-text-field
                  label="Back-trajectory time (hour)"
                  hint="Example for back-trajectory 24 hours: -24"
                  v-model="app_data.hysplit.trajectory_time"
                  :rules="[value => !!parseInt(value) || 'Integer number required.']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense class="mx-0">
              <v-col cols="12" lg="5" md="12">
                <v-select
                  v-model="app_data.hysplit.start_height.value_type"
                  :items="app_data.hysplit.height_type"
                  :rules="[v => !!v || 'Item is required']"
                  label="Starting point height unit"
                ></v-select>
              </v-col>
              <v-col cols="12" lg="5" md="12" class="px-10">
                <v-text-field
                  label="Starting point height value (m)"
                  v-model="app_data.hysplit.start_height.value"
                  :rules="[value => !!parseInt(value) || 'Integer number required.']"
                  hint="Example for fraction of mixed layer: 0.5"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <v-btn color="primary" @click="next_3">Continue</v-btn>
          <v-btn text @click="e1 = 2">Previous</v-btn>
        </v-stepper-content>
        <!-- mete data -->
        <v-stepper-step :rules="isStep4" color="primary lighten-2" :complete="e1 > 4" step="4">
          Meteorological Data
          <small v-if="!isStep4[0]()">Please select mete data folder.</small>
        </v-stepper-step>
        <v-stepper-content step="4">
          <v-card class="stepper_card" flat>
            <v-card-text>
              <p class="subtitle-1">
                Various gridded meteorological data format can be used for HYSPLIT model. More information can be found
                <a
                  href="https://www.ready.noaa.gov/archives.php"
                  target="_blank"
                >here</a>.
              </p>
              <p class="subtitle-1">
                Before continuing analysis,
                <v-btn small @click="show_mete_data">Download</v-btn>&nbsp;meteorological data, and
                select corresponding meteorological data format:
              </p>
              <v-radio-group v-model="app_data.hysplit.mete.type" row>
                <v-radio v-for="n in app_data.hysplit.mete_types" :key="n" :label="n" :value="n"></v-radio>
              </v-radio-group>
              <p
                class="subtitle-1"
              >Please store all meteorological data in one folder and copy the path here:</p>
              <v-col cols="12" lg="8" md="12" class="my-n5 ml-n2">
                <v-text-field
                  label="For example: D:\metedata"
                  prepend-inner-icon="mdi-folder"
                  v-model="app_data.hysplit.mete.path"
                ></v-text-field>
              </v-col>
            </v-card-text>
          </v-card>
          <v-btn color="primary" @click="next_4">Continue</v-btn>
          <v-btn text @click="e1 = 3">Previous</v-btn>
        </v-stepper-content>
        <!-- finish -->
        <v-stepper-step color="primary lighten-2" :complete="e1 > 5" step="5">Generate Trajectory</v-stepper-step>
        <v-stepper-content step="5">
          <v-card class="stepper_card" flat>
            <v-card-text>
              <p class="subtitle-1">
                HYSPLIT model need to be run on your local machine.
                TraPSA will generate batch file that controls all the necessary processes:
              </p>
              <ol class="subtitle-1">
                <li>
                  <v-btn small @click="generate_bat">Download</v-btn>&nbsp; and copy
                  <b>run_HYSPLIT.bat</b> to
                  <b>{{app_data.hysplit.working}}</b> (HYSPLIT model path).
                </li>
                <li class="my-1">
                  Run
                  <b>run_hysplit.bat</b> and wait with patient.
                </li>
                <li>
                  <v-btn small @click="upload_traj">Open</v-btn>
                  <input
                    ref="uploader"
                    class="d-none"
                    type="file"
                    accept=".csv"
                    @change="onFileChanged"
                  />
                  &nbsp;the CSV file generated in
                  <b>{{app_data.hysplit.working}}</b>, if the processes were succeeded.
                </li>
              </ol>
            </v-card-text>
          </v-card>
          <v-btn color="primary" @click="traj_finish">Continue</v-btn>
          <v-btn text @click="e1 = 4">Previous</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import data_traj from "@/assets/js/data_traj";
export default {
  name: "trajectory",
  components: {},
  data: () => ({
    e1: 1,
    stepper_height: 600,
    isStep1: [() => true],
    isStep2: [() => true],
    isStep3: [() => true],
    isStep4: [() => true],
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
  },
  mounted() {},
  methods: {
    next_1() {
      console.log(this.app_data.hysplit.working);
      this.isStep1 =
        this.app_data.hysplit.working == null ? [() => false] : [() => true];
      if (this.isStep1[0]()) {
        this.e1 = 2;
      }
    },
    next_2() {
      console.log(this.app_data.hysplit.start_time);
      this.isStep2 = [() => true];
      if (this.app_data.hysplit.start_time.isExpand) {
        this.app_data.hysplit.start_time.sample_period = parseInt(
          this.app_data.hysplit.start_time.sample_period
        );
        this.app_data.hysplit.start_time.expand_number = parseInt(
          this.app_data.hysplit.start_time.expand_number
        );
        console.log(this.app_data.hysplit.start_time.sample_period);
        console.log(this.app_data.hysplit.start_time.expand_number);
        if (
          this.app_data.hysplit.start_time.sample_period &&
          this.app_data.hysplit.start_time.expand_number
        ) {
          this.isStep2 = [() => true];
          this.e1 = 3;
        } else {
          this.isStep2 = [() => false];
        }
      } else {
        this.e1 = 3;
      }
    },
    next_3() {
      console.log(this.app_data.start_height);
      console.log(this.app_data.trajectory_time);
      console.log(this.app_data.hysplit.sites);

      this.app_data.hysplit.start_height.value = parseInt(
        this.app_data.hysplit.start_height.value
      );
      this.app_data.hysplit.trajectory_time = parseInt(
        this.app_data.hysplit.trajectory_time
      );
      if (
        this.app_data.hysplit.start_height.value &&
        this.app_data.hysplit.trajectory_time &&
        this.app_data.hysplit.sites.length > 0
      ) {
        this.isStep3 = [() => true];
        this.e1 = 4;
      } else {
        this.isStep3 = [() => false];
      }
    },
    next_4() {
      console.log(this.app_data.hysplit.mete);
      this.isStep4 =
        this.app_data.hysplit.mete.path == 0 ? [() => false] : [() => true];
      if (this.isStep4[0]()) {
        this.e1 = 5;
      }
    },
    traj_finish() {
      console.log(this.app_data);
      // Todo: change the conditions
      if (
        this.isStep1[0]() &&
        this.isStep2[0]() &&
        this.isStep3[0]() &&
        this.isStep4[0]()
      ) {
        this.app_data.ui_control.curr_tab +=1;
      } else {
        this.app_data.ui_control.snackbar = {
          show: true,
          text: "Please fix the errors before continuing!",
          color: "error",
        };
      }
    },
    show_mete_data() {
      console.log(this.app_data.ui_control);
      this.app_data.ui_control.mete_dialog = true;
    },
    async generate_bat() {
      this.app_data.ui_control.isLoading = "primary";
      // set all parameters
      this.app_data.curr_job = data_traj.set_job_parameter(
        this.app_data.hysplit
      );
      // get selected data
      var selected = data_traj.get_selected_data(
        this.app_data.measurement.data,
        this.app_data.hysplit.sites
      );
      // console.log("selected",selected)
      // generate timestamps
      this.app_data.curr_job.start_point = data_traj.generate_timestamp(
        selected,
        this.app_data.hysplit.start_time
      );

      // console.log( this.app_data.curr_job.start_point)
      // genereate bat file
      var bat_content = await data_traj.generate_bat(
        this.app_data.curr_job,
        this.app_data.sites.data
      );

      // required mete data check
      this.app_data.ui_control.mete_required.items = bat_content.mete_data_required.sort();
      this.app_data.ui_control.mete_required.show = true;

      this.$worker
        .run(
          (content) => {
            // TODO: how to use funcitons inside the worker
            var blob = new Blob(content, {
              type: "plain/text;charset=utf-8;",
            });
            return blob;
          },
          [bat_content.content]
        )
        .then((blob) => {
          var pom = document.createElement("a");
          var url = URL.createObjectURL(blob);
          pom.href = url;
          pom.setAttribute("download", "run_hysplit.bat");
          pom.click();
          this.app_data.ui_control.isLoading = false;
        });
    },
    upload_traj() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      // return table name, and lat, lon, alt, for each time stamp
      data_traj
        .upload_traj(e.target.files[0], this.app_data.curr_job)
        .then((res) => {
          // this.app_data.traj_data = [];
          this.app_data.traj_data.push(res);
          // this.app_data.traj_jobs = [];
          this.app_data.traj_jobs.push(res.job_name);
          console.log(this.app_data.traj_data);
          console.log(this.app_data.traj_jobs);
          this.app_data.ui_control.snackbar = {
            show: true,
            text: "Data Uploaded!",
            color: "success",
          };
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
</script>

<style scoped>
.stepper_card {
  margin-top: -16px;
  margin-bottom: 16px;
  margin-right: 4px;
  margin-left: 4px;
}
</style>
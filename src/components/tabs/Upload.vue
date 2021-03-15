<template>
  <v-card color="secondary" flat>
    <v-container class="px-10">
      <v-stepper v-model="e1" class="mt-5">
        <!-- stepper header -->
        <v-stepper-header height="100px" class="px-5">
          <v-stepper-step
            :rules="isStep1"
            color="primary lighten-2"
            :complete="e1 > 1"
            step="1"
          >
            Site Locations
            <small v-if="!isStep1[0]()"
              >Please Upload Site location Data.</small
            >
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            color="primary lighten-2"
            :complete="e1 > 2"
            step="2"
            :rules="isStep2"
          >
            Upload Measurement Data
            <small v-if="!isStep2[0]()">Please Upload Measurement Data.</small>
          </v-stepper-step>

          <v-divider></v-divider>
          <v-stepper-step color="primary lighten-2" :complete="e1 > 3" step="3">
            Upload Wind Data
            <small>Optional</small>
          </v-stepper-step>
        </v-stepper-header>
        <!-- stepper pages -->
        <v-stepper-items>
          <!-- upload site data -->
          <v-stepper-content step="1">
            <v-card :height="stepper_height">
              <v-card :height="stepper_height - 80" flat>
                <v-row justify="center">
                  <v-col cols="4" class="pa-1">
                    <v-row>
                      <v-col cols="12" class="ml-3">
                        <upload_card :upload_card="upload_site" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="ml-3">
                        <v-card class="pa-3">
                          <v-data-table
                            :headers="app_data.sites.header"
                            :items="app_data.sites.data"
                            :items-per-page="5"
                            height="210"
                          ></v-data-table>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="8" class="px-5 pt-1">
                    <v-container>
                      <map_card 
                      map_div_id="site_map"
                      map_title="Site Map"
                      :button_not_uesd="button_not_uesd" :card_height="475"
                      :map_card_type="'site_preview'" />
                    </v-container>
                  </v-col>
                </v-row>
              </v-card>
              <v-divider class="my-5"></v-divider>
              <v-btn dark color="primary" @click="next_1">Continue</v-btn>
            </v-card>
          </v-stepper-content>
          <!-- upload measurement data -->
          <v-stepper-content step="2">
            <v-card :height="stepper_height">
              <v-card :height="stepper_height - 80" flat>
                <v-row justify="center">
                  <v-col cols="4" class="pa-1">
                    <v-row>
                      <v-col cols="12" class="ml-3">
                        <v-card class="py-2">
                          <v-card-title>
                            <span class="subtitle-1">Missing Value</span>
                          </v-card-title>
                          <v-text-field
                            class="px-5 py-2"
                            label="Missing value will be excluded for analysis."
                            hint="For example, -999 or NaN"
                            v-model="app_data.missing_data"
                          ></v-text-field>
                          <v-divider class="mx-3"></v-divider>
                          <v-card-title>
                            <span class="subtitle-1">Datetime Formats</span>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="dateFromat_check"
                              >Check</v-btn
                            >
                          </v-card-title>
                          <v-text-field
                            class="px-5 py-2"
                            label="Copy a timestamp from your data."
                            hint="For example, yyyy/mm/dd hh:mm"
                            v-model="date_example"
                          ></v-text-field>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="ml-3">
                        <upload_card :upload_card="upload_measurement" />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="8" class="px-5 pt-1">
                    <v-container>
                      <v-card class="pa-3">
                        <v-data-table
                          :headers="app_data.measurement.header"
                          :items="app_data.measurement.data"
                          :items-per-page="10"
                          class="pl-1"
                          height="415"
                        ></v-data-table>
                      </v-card>
                    </v-container>
                  </v-col>
                </v-row>
              </v-card>
              <v-divider class="my-5"></v-divider>
              <v-btn color="primary" @click="next_2">Continue</v-btn>
              <v-btn text @click="e1 = 1">Previous</v-btn>
            </v-card>
          </v-stepper-content>
          <!-- upload wind data -->
          <v-stepper-content step="3">
            <v-card :height="stepper_height">
              <v-card :height="stepper_height - 80" flat>
                <v-row justify="center">
                  <v-col cols="4" class="pa-1">
                    <v-row>
                    <v-col cols="12" class="ml-3">
                        <upload_card :upload_card="upload_wind" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="ml-3">
                        <v-card class="pa-3">
                          <v-data-table
                            :headers="app_data.wind_data.header"
                            :items="app_data.wind_data.data"
                            :items-per-page="5"
                            height="210"
                          ></v-data-table>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="8" class="px-5 pt-1">
                    <v-container>
                      <wind_rose :canvas_config="wind_rose_config" />
                    </v-container>
                  </v-col>
                </v-row>
              </v-card>

              <v-divider class="my-5"></v-divider>
              <v-btn color="primary" @click="finish_upload">Continue</v-btn>
              <v-btn text @click="e1 = 2">Previous</v-btn>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    upload_card: () => import("@/components/widgets/UploadCard.vue"),
    map_card: () => import("@/components/widgets/MapCard.vue"),
    wind_rose: () => import("@/components/widgets/WindRose.vue"),
  },
  data: () => ({
    button_not_uesd: [2, 3, 4, 5, 6],
    e1: 1,
    stepper_height: 600,
    isStep1: [() => true],
    isStep2: [() => true],
    date_example: "",
    upload_measurement: {
      title: "Upload Measurement Data",
      label: "Measurement Data",
      isLoading: false,
      update_data: "measurement",
      isExpand: true,
    },
    upload_site: {
      title: "Upload Site Data",
      label: "Site Locations",
      isLoading: false,
      update_data: "sites",
      isExpand: false,
    },
    upload_wind: {
      title: "Upload Wind Data",
      label: "Wind Speed and Direction",
      isLoading: false,
      update_data: "wind_data",
      isExpand: true,
    },
    wind_rose_config: {},
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
  },
  methods: {
    next_1() {
      this.isStep1 =
        this.app_data.sites.data.length > 0 ? [() => true] : [() => false];
      if (this.isStep1[0]()) {
        this.e1 = 2;
      }
    },
    next_2() {
      this.isStep2 =
        this.app_data.measurement.data.length > 0
          ? [() => true]
          : [() => false];
      if (this.isStep2[0]()) {
        this.e1 = 3;
      }
    },
    finish_upload() {
      if (this.app_data.wind_data.data.length == 0) {
        this.app_data.i_control.snackbar = {
          show: true,
          text:
            "You did not upload wind data, CPF and CBPF analysis will not be avaiable!",
          color: "warning",
        };
      }
      this.app_data.ui_control.curr_tab += 1;
    },
    dateFromat_check() {
      let isvalid = Date.parse(this.date_example);
      this.app_data.ui_control.snackbar = {
        show: true,
        text: isNaN(isvalid)
          ? "Date format error."
          : "ISO String: " + new Date(this.date_example).toISOString(),
        color: isNaN(isvalid) ? "error" : "info",
      };
    },
  },
};
</script>

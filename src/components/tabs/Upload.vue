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
            Measurement Data
            <small v-if="!isStep2[0]()">Please Upload Measurement Data.</small>
          </v-stepper-step>

          <v-divider></v-divider>
          <v-stepper-step color="primary lighten-2" :complete="e1 > 3" step="3">
            Data Preview
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
                        <UploadCard :upload_card="upload_site" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="ml-3">
                        <v-hover v-slot:default="{ hover }">
                          <v-card :elevation="hover ? 4 : 1">
                            <v-system-bar :class="ui_control.system_bar_class">
                              Data Uploaded
                            </v-system-bar>
                            <v-data-table
                              class="mx-1"
                              :headers="app_data.sites.table_header"
                              :items="app_data.sites.df"
                              :items-per-page="5"
                              height="230"
                            ></v-data-table>
                          </v-card>
                        </v-hover>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="8" class="px-5 pt-1">
                    <v-container>
                      <MapCard
                        map_div_id="site_map"
                        map_title="Site Map"
                        map_obj="site_preview"
                        :button_not_uesd="button_not_uesd"
                        :card_height="475"
                        :map_card_type="'site_preview'"
                      />
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
                        <UploadCard :upload_card="upload_measurement" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="ml-3">
                        <v-hover v-slot:default="{ hover }">
                          <v-card :elevation="hover ? 4 : 1">
                            <v-system-bar :class="ui_control.system_bar_class">
                              Data Formats
                            </v-system-bar>
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
                        </v-hover>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="8" class="px-5 pt-1">
                    <v-container>
                      <ColumnSelect />
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
              <v-card :height="stepper_height - 80" flat class="px-1">
                <v-hover v-slot:default="{ hover }">
                  <v-card :elevation="hover ? 4 : 1">
                    <v-system-bar :class="ui_control.system_bar_class">
                      Data Uploaded
                    </v-system-bar>
                    <v-data-table
                      :headers="app_data.conc_df.table_header"
                      :items="app_data.conc_df.df"
                      :items-per-page="10"
                      class="ml-1"
                      height="425"
                    ></v-data-table>
                  </v-card>
                </v-hover>
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
import dv2_df from "@/dv2/dv2_df";
export default {
  name: "App",
  components: {
    UploadCard: () => import("@/components/widgets/UploadCard.vue"),
    MapCard: () => import("@/components/widgets/MapCard.vue"),
    ColumnSelect: () => import("@/components/widgets/ColumnSelect.vue"),
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
      update_data: "conc_df",
      tooltips: "You can upload multiple files.",
    },
    upload_site: {
      title: "Upload Site Data",
      label: "Site Locations",
      update_data: "sites",
      tooltips:
        "Column name must be <i>site_name</i>, <i>lat</i>, and <i>lon</i>.",
    },
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
      plot_data: "plot_data",
    }),
  },
  methods: {
    next_1() {
      this.isStep1 =
        this.app_data.sites.df.length > 0 ? [() => true] : [() => false];
      if (this.isStep1[0]()) {
        this.e1 = 2;
      }
    },
    next_2() {
      this.isStep2 =
        this.app_data.conc_df.df.length > 0 ? [() => true] : [() => false];

      // if the section is resumed, there is no need to update df
      // console.log(this.app_data.upload_files)
      var column_assigned =true
      if (this.app_data.upload_files.length>0){
        column_assigned = this.update_conc_df();
      }
      // console.log(this.app_data.conc_df);

      if (!column_assigned){
      // TODO: error message if not correctly assign columns
      }

      if (this.isStep2[0]() && column_assigned) {
        this.e1 = 3;
      }
    },
    finish_upload() {
      this.ui_control.snackbar = {
        show: true,
        text:
          "Note: If you did not upload wind data, CPF and CBPF analysis will not be avaiable!",
        color: "warning",
      };
      this.ui_control.curr_tab += 1;
    },
    dateFromat_check() {
      let isvalid = Date.parse(this.date_example);
      this.ui_control.snackbar = {
        show: true,
        text: isNaN(isvalid)
          ? "Date format error."
          : "ISO String: " + new Date(this.date_example).toISOString(),
        color: isNaN(isvalid) ? "error" : "info",
      };
    },
    async update_conc_df() {
      var column_assigned = true;
      this.isloading = true;
      this.app_data.conc_df = new dv2_df();
      var data_index = {};
      var time_stamp = this.ui_control.column_import[1].var[0];
      var site_name = this.ui_control.column_import[2].var[0];
      for (var i = 0; i < this.app_data.upload_files.length; i++) {
        // note: merge the data from mutiple files based on time_stamp and site_name
        // use time_stamp+site_name as index
        var temp_df = new dv2_df();
        await temp_df
          .load_csv(this.app_data.upload_files[i])
          .then(() => {
            var missing = this.app_data.missing_data
              .split(",")
              .map((x) => x.trim());
            temp_df.replace_missing(missing);
            // merge df
            temp_df.df.forEach((x) => {
              var temp_index = x[time_stamp] + "-" + x[site_name];
              if (temp_index in data_index) {
                // console.log(temp_index, data_index[temp_index])
                // console.log(this.app_data.conc_df.df[data_index[temp_index]])
                // console.log(x)
                this.app_data.conc_df.df[
                  data_index[temp_index]
                ] = Object.assign(
                  this.app_data.conc_df.df[data_index[temp_index]],
                  x
                );
              } else {
                this.app_data.conc_df.df.push(x);
                data_index[temp_index] = this.app_data.conc_df.df.length - 1;
              }
            });
          })
          .catch((err) => {
            console.log(err);
            this.ui_control.snackbar = {
              show: true,
              text: "Failed to load file!",
              color: "error",
            };
          });
      }
      // rename the selected column
      this.app_data.conc_df.rename_attr(
        this.ui_control.column_import[1].var[0],
        "time_stamp"
      );
      this.app_data.conc_df.rename_attr(
        this.ui_control.column_import[2].var[0],
        "site_name"
      );
      this.app_data.conc_df.rename_attr(
        this.ui_control.column_import[4].var[0],
        "wind_direction"
      );
      this.app_data.conc_df.rename_attr(
        this.ui_control.column_import[5].var[0],
        "wind_speed"
      );
      this.app_data.conc_df.get_attr();

      var default_attr = [
        "time_stamp",
        "site_name",
        "wind_direction",
        "wind_speed",
      ];
      this.app_data.conc_df.attrs.forEach((x) => {
        if (!default_attr.includes(x)) {
          if (!this.ui_control.column_import[3].var.includes(x)) {
            this.app_data.conc_df.df = this.app_data.conc_df.df.map((row) => {
              delete row[x];
              return row;
            });
          }
        }
      });

      this.app_data.conc_df.get_attr();
      this.app_data.conc_df.get_table_header();
      this.isloading = false;

      // TODO: error message if not correctly assign columns
      return column_assigned
    },
  },
};
</script>

<template>
  <v-card>
    <v-card-title
      class="py-1 title font-weight-medium secondary primary--text text--darken-2"
    >
      New Resaerch Case
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon icon @click="reset_dialog" v-bind="attrs" v-on="on"
            >mdi-refresh</v-icon
          >
        </template>
        <span>Reset selections.</span>
      </v-tooltip>

      <v-btn icon @click="app_data.ui_control.new_case.show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <v-row dense>
        <v-col cols="6" class="mt-3">
          <v-text-field
            label="Name the new case"
            v-model="app_data.ui_control.new_case.selection.case_name"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col>
          <v-select
            v-model="app_data.ui_control.new_case.selection.site"
            :items="
              app_data.measurement.data.map((x) => {
                return x.site_name;
              })
            "
            label="Select sites"
            chips
          ></v-select>
        </v-col>

        <v-col class="mx-5">
          <v-select
            v-model="app_data.ui_control.new_case.selection.chemical"
            :items="chemical_calculated"
            label="Select chemicals"
            chips
            multiple
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @click="toggle_chemical">
                <v-list-item-action>
                  <v-icon
                    :color="
                      app_data.ui_control.new_case.selection.chemical.length > 0
                        ? 'primary'
                        : ''
                    "
                    >{{ chemical_icon }}</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Select All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <!-- <v-row dense>
        <v-col cols="9">
          <v-select
            v-model="app_data.ui_control.new_case.selection.traj_job"
            :items="app_data.traj_jobs"
            label="Select Trajectory"
            chips
          ></v-select>
        </v-col>
      </v-row> -->

      <v-row dense>
        <v-col cols="9">
          <v-select
            v-model="app_data.ui_control.new_case.selection.year"
            :items="year_calculated"
            label="Select years"
            chips
            multiple
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @click="toggle_year">
                <v-list-item-action>
                  <v-icon
                    :color="
                      app_data.ui_control.new_case.selection.year.length > 0
                        ? 'primary'
                        : ''
                    "
                    >{{ year_icon }}</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Select All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>
        <v-col></v-col>
      </v-row>

      <v-row dense>
        <v-col cols="9">
          <v-select
            v-model="app_data.ui_control.new_case.selection.month"
            :items="by_season ? month_1 : month_2"
            label="Select months"
            chips
            multiple
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @click="toggle_month">
                <v-list-item-action>
                  <v-icon
                    :color="
                      app_data.ui_control.new_case.selection.month.length > 0
                        ? 'primary'
                        : ''
                    "
                    >{{ month_icon }}</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Select All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>

        <v-col cols="3">
          <v-switch
            class="mt-6 mx-5"
            v-model="by_season"
            @change="app_data.ui_control.new_case.selection.month = []"
            :label="by_season ? 'By season' : 'By month'"
          ></v-switch>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="9">
          <v-select
            v-model="app_data.ui_control.new_case.selection.hour"
            :items="by_period ? hour_1 : hour_2"
            label="Select hours"
            chips
            multiple
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @click="toggle_hour">
                <v-list-item-action>
                  <v-icon
                    :color="
                      app_data.ui_control.new_case.selection.hour.length > 0
                        ? 'primary'
                        : ''
                    "
                    >{{ hour_icon }}</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Select All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>

        <v-col cols="3">
          <v-switch
            @change="app_data.ui_control.new_case.selection.hour = []"
            class="mt-6 mx-5"
            v-model="by_period"
            :label="by_period ? 'By period' : 'By hour'"
          ></v-switch>
        </v-col>
      </v-row>

      <v-btn class="mt-3" @click="add_new_case">Finish</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data: () => ({
    by_season: true,
    by_period: true,
    month_1: ["Spring", "Summer", "Autumn", "Winter"],
    month_2: [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ],
    hour_2: Array.from(Array(24).keys()),
    hour_1: [
      "Morning rush hours (6:00-9:00)",
      "Daytime hours (10:00-16:00)",
      "Afternoon rush hours (15:00-20:00)",
      "Night hours (21:00-5:00)",
    ],
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
    year_calculated() {
      var selected_site = this.app_data.ui_control.new_case.selection.site;
      var years = this.app_data.measurement.data.reduce(function (prev, curr) {
        var curr_year = new Date(curr.TimeString).getFullYear();
        if (!prev.includes(curr_year) && curr.site_name == selected_site) {
          prev.push(curr_year);
        }
        return prev;
      }, []);
      return years;
    },
    chemical_calculated() {
      var not_chemical = ["id", "TimeString", "timestamp", "site_name"];
      var chemcical = Object.keys(this.app_data.measurement.data[0]);
      return chemcical.filter(function (x) {
        return !not_chemical.includes(x);
      });
    },
    hour_icon() {
      if (
        (this.app_data.ui_control.new_case.selection.hour.length == 24 &&
          !this.by_period) ||
        (this.app_data.ui_control.new_case.selection.hour.length == 4 &&
          this.by_period)
      )
        return "mdi-close-box";
      if (
        this.app_data.ui_control.new_case.selection.hour.length > 0 &&
        this.app_data.ui_control.new_case.selection.hour.length < 24
      )
        return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    month_icon() {
      if (
        (this.app_data.ui_control.new_case.selection.month.length == 12 &&
          !this.by_season) ||
        (this.app_data.ui_control.new_case.selection.month.length == 4 &&
          this.by_season)
      )
        return "mdi-close-box";
      if (
        this.app_data.ui_control.new_case.selection.month.length > 0 &&
        this.app_data.ui_control.new_case.selection.month.length < 24
      )
        return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    year_icon() {
      if (
        this.app_data.ui_control.new_case.selection.year.length ==
        this.year_calculated.length
      )
        return "mdi-close-box";
      if (
        this.app_data.ui_control.new_case.selection.year.length > 0 &&
        this.app_data.ui_control.new_case.selection.year.length <
          this.year_calculated.length
      )
        return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    chemical_icon() {
      if (
        this.app_data.ui_control.new_case.selection.chemical.length ==
        this.chemical_calculated.length
      )
        return "mdi-close-box";
      if (
        this.app_data.ui_control.new_case.selection.chemical.length > 0 &&
        this.app_data.ui_control.new_case.selection.chemical.length <
          this.chemical_calculated.length
      )
        return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  mounted() {},
  methods: {
    reset_dialog() {
      this.app_data.ui_control.new_case.selection = {
        case_name: "New Case",
        site: [],
        chemical: [],
        year: [],
        month: ["Spring", "Summer", "Autumn", "Winter"],
        hour: [
          "Morning rush hours (6:00-9:00)",
          "Daytime hours (10:00-16:00)",
          "Afternoon rush hours (15:00-20:00)",
          "Night hours (21:00-5:00)",
        ],
      };
      this.by_season = true;
      this.by_period = true;
    },
    toggle_hour() {
      if (
        (this.app_data.ui_control.new_case.selection.hour.length == 4 &&
          this.by_period) ||
        (this.app_data.ui_control.new_case.selection.hour.length == 24 &&
          !this.by_period)
      ) {
        this.app_data.ui_control.new_case.selection.hour = [];
      } else {
        this.app_data.ui_control.new_case.selection.hour = this.by_period
          ? this.hour_1
          : this.hour_2;
      }
    },
    toggle_month() {
      if (
        (this.app_data.ui_control.new_case.selection.month.length == 4 &&
          this.by_season) ||
        (this.app_data.ui_control.new_case.selection.month.length == 12 &&
          !this.by_season)
      ) {
        this.app_data.ui_control.new_case.selection.month = [];
      } else {
        this.app_data.ui_control.new_case.selection.month = this.by_season
          ? this.month_1
          : this.month_2;
      }
    },
    toggle_year() {
      if (
        this.app_data.ui_control.new_case.selection.year.length ==
        this.year_calculated.length
      ) {
        this.app_data.ui_control.new_case.selection.year = [];
      } else {
        this.app_data.ui_control.new_case.selection.year = this.year_calculated;
      }
    },
    toggle_chemical() {
      if (
        this.app_data.ui_control.new_case.selection.chemical.length ==
        this.chemical_calculated.length
      ) {
        this.app_data.ui_control.new_case.selection.chemical = [];
      } else {
        this.app_data.ui_control.new_case.selection.chemical = this.chemical_calculated;
      }
    },
    cal_case_selected_month() {
      var selected_month;
      if (this.by_season) {
        selected_month = this.app_data.ui_control.new_case.selection.month.reduce(
          (prev, curr) => {
            if (curr == "Spring") {
              prev.push(2, 3, 4);
            } else if (curr == "Summer") {
              prev.push(5, 6, 7);
            } else if (curr == "Autumn") {
              prev.push(8, 9, 10);
            } else if (curr == "Winter") {
              prev.push(11, 0, 1);
            }
            return prev;
          },
          []
        );
      } else {
        var month_index = this.month_2;
        selected_month = this.app_data.ui_control.new_case.selection.month.map(
          (x) => month_index.indexOf(x)
        );
      }
      return selected_month;
    },
    cal_case_selected_hour() {
      var selected_hour;
      if (this.by_period) {
        selected_hour = this.app_data.ui_control.new_case.selection.hour.reduce(
          (prev, curr) => {
            if (curr == "Morning rush hours (6:00-9:00)") {
              prev.push(6, 7, 8, 9);
            } else if (curr == "Daytime hours (10:00-16:00)") {
              prev.push(10, 11, 12, 13, 14, 15, 16);
            } else if (curr == "Afternoon rush hours (15:00-20:00)") {
              prev.push(17, 18, 19, 20);
            } else if (curr == "Night hours (21:00-5:00)") {
              prev.push(21, 22, 23, 0, 1, 2, 3, 4, 5);
            }
            return prev;
          },
          []
        );
      } else {
        selected_hour = this.app_data.ui_control.new_case.selection.hour;
      }
      return selected_hour;
    },
    add_new_case() {
      // TODO: deal with edit case
      var selected_site = this.app_data.ui_control.new_case.selection.site;
      var selected_chemical = this.app_data.ui_control.new_case.selection
        .chemical;
      var selected_year = this.app_data.ui_control.new_case.selection.year;

      var selected_month = this.cal_case_selected_month();
      var selected_hour = this.cal_case_selected_hour();

      // console.log(selected_site);
      // console.log(selected_chemical);
      // console.log(selected_year);
      // console.log(selected_month);
      // console.log(selected_hour);

      var wind = this.app_data.wind_data.data.reduce(function (prev, curr) {
        var curr_date = new Date(curr.TimeString);
        if (
          curr.site_name == selected_site &&
          selected_year.includes(curr_date.getFullYear()) &&
          selected_month.includes(curr_date.getMonth()) &&
          selected_hour.includes(curr_date.getHours())
        ) {
          prev.push({
            TimeString: curr.TimeString,
            wind_speed: curr.wind_speed,
            wind_direction: curr.wind_direction,
          });
        }
        return prev;
      }, []);
      for (const chemical of selected_chemical) {
        var measurement = this.app_data.measurement.data.reduce(function (
          prev,
          curr
        ) {
          var curr_date = new Date(curr.TimeString);
          if (
            curr.site_name == selected_site &&
            selected_year.includes(curr_date.getFullYear()) &&
            selected_month.includes(curr_date.getMonth()) &&
            selected_hour.includes(curr_date.getHours()) &&
            !isNaN(curr[chemical])
          ) {
            prev.push({
              TimeString: curr.TimeString,
              selected_chemical: curr[chemical],
            });
          }
          return prev;
        },
        []);

        var new_case = {
          name:
            this.app_data.ui_control.new_case.selection.case_name +
            "_" +
            chemical,
          chemical: chemical,
          site: this.app_data.ui_control.new_case.selection.site,
          selected: false,
          data: {
            measurement: measurement,
            wind: wind,
          },
          selections: {
            year: this.app_data.ui_control.new_case.selection.year,
            month: this.app_data.ui_control.new_case.selection.month,
            hour: this.app_data.ui_control.new_case.selection.hour,
            year_value: selected_year,
            month_value: selected_month,
            hour_value: selected_hour,
          },
          model: {
            type: "PSCF",
            c: 0.8,
            grid:0.25,
            weight: [
              { n: 0.25, w: 0.1 },
              { n: 0.5, w: 0.25 },
              { n: 0.75, w: 0.5 },
              { n: 1, w: 0.75 },
              { n: 1.5, w: 0.9 },
            ],
            traj: this.app_data.traj_jobs.length>0 ? this.app_data.traj_jobs[0]:"",
            selected:false
          },
        };
        // console.log(new_case);
        // console.log(this.app_data.ui_control.new_case.edit);
        if (this.app_data.ui_control.new_case.edit == -1) {
          this.app_data.case.push(new_case);
          this.app_data.ui_control.snackbar = {
            show: true,
            text: "New research case added!",
            color: "info",
          };
        } else {
          //TODO: if you do not change the array, vue will not update the value
          this.app_data.case.splice(
            this.app_data.ui_control.new_case.edit,
            1,
            new_case
          );
          this.app_data.ui_control.snackbar = {
            show: true,
            text: "Research case edited!",
            color: "info",
          };
        }
      }
      this.app_data.ui_control.new_case.show = false;
    },
  },
};
</script>
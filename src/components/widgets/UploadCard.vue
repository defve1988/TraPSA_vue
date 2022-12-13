<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 4 : 1">
      <v-system-bar :class="ui_control.system_bar_class">
        {{ upload_card.title }}
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon x-small v-on="{ ...tooltip }">
              <v-icon small class="ma-0">mdi-information</v-icon>
            </v-btn>
          </template>
          <span v-html="upload_card.tooltips"></span>
        </v-tooltip>
      </v-system-bar>

      <v-card-text>
        <v-file-input
          @change="onFileChanged"
          accept=".csv"
          multiple
          :label="upload_card.label"
          prepend-icon="mdi-paperclip"
        ></v-file-input>
        <v-btn
          color="primary"
          class="text-none"
          :loading="isloading"
          @click="upload_data"
        >
          <v-icon left>mdi-cloud-upload</v-icon>Upload
        </v-btn>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
// upload card: upload a csv file and update one of the data value stored in app_data
//  eg:
//     upload_card:{
//     title:"Upload Site Data",
//     label:"Site Locations",
//     isLoading:false,
//     update_data:"sites",
//     isExpand: true,}
import { mapState, mapMutations } from "vuex";
// import csv_data from "@/assets/js/data_format";
export default {
  name: "upload",
  props: ["upload_card"],
  data: () => ({
    isloading: false,
    file: {},
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  methods: {
    ...mapMutations(["UPDATE_DATA", "UPDATE_SITE"]),
    onFileChanged(file) {
      this.file = file;
      this.app_data.upload_files = file;
    },

    async upload_data() {
      this.isloading = true;
      for (var i = 0; i < this.file.length; i++) {
        await this.app_data[this.upload_card.update_data]
          .load_csv(this.file[i])
          .then(() => {
            var missing = this.app_data.missing_data
              .split(",")
              .map((x) => x.trim());
            this.app_data[this.upload_card.update_data].replace_missing(
              missing
            );
            // console.log(this.app_data[this.upload_card.update_data]);
          })
          .catch((err) => {
            console.log(err);
            this.ui_control.snackbar = {
              show: true,
              text: "Failed to load file!",
              color: "error",
            };
          });
        this.app_data[this.upload_card.update_data].get_attr();
        if (this.upload_card.update_data == "conc_df") {
          this.ui_control.column_import[0].var = this.app_data[
            this.upload_card.update_data
          ].attrs;
          // console.log(this.app_data[this.upload_card.update_data].attrs);
        }
      }
      this.app_data[this.upload_card.update_data].get_attr();
      this.app_data[this.upload_card.update_data].get_table_header();
      this.isloading = false;
    },
  },
};
</script>
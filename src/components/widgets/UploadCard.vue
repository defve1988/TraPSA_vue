<template>
  <v-card>
    <v-card-title>
      <span class="subtitle-1">{{ upload_card.title }}</span>
    </v-card-title>
    <v-card-text>
      <v-file-input
        @change="onFileChanged"
        accept=".csv"
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
import csv_data from "@/assets/js/data_format";
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
    }),
  },
  methods: {
    ...mapMutations(["UPDATE_DATA", "UPDATE_SITE"]),
    onFileChanged(file) {
      this.file = file;
    },

    upload_data() {
      this.isloading = true;
      csv_data
        .read_csv(
          this.file,
          this.app_data.missing_data,
          this.upload_card.isExpand
        )
        .then((result) => {
          // console.log(this.upload_card.update_data);
          this.UPDATE_DATA({
            data: result,
            name: this.upload_card.update_data,
          });
        })
        .catch((err) => {
          console.log(err);
          this.app_data.ui_control.snackbar = {
            show: true,
            text: "Failed to load file!",
            color: "error",
          };
        });
      this.isloading = false;
    },
  },
};
</script>
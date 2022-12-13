<template>
  <v-dialog v-model="ui_control.mete_dialog" width="600">
    <v-card>
      <v-card-title class="py-1 title font-weight-medium secondary primary--text text--darken-2">
        Meteorological Data Format
        <v-spacer></v-spacer>
        <v-btn icon @click="ui_control.mete_dialog = false" >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="mt-3">
        <ul class="subtitle-1">
          <li>
            <a href="ftp://arlftp.arlhq.noaa.gov/archives/reanalysis/" target="_blank">NCEP/NCAR</a>
            : Reanalysis Archive for global region
            <br />1 file per month, eg.
            <b>RP201404</b>
          </li>
          <li>
            <a href="ftp://arlftp.arlhq.noaa.gov/archives/gdas1/" target="_blank">GDAS1</a>
            : Global Data Assimilation System 1°×1°
            <br />4~5 files per month, eg.
            <b>gdas1.apr14.w1, gdas1.apr14.w2, ...</b>
          </li>
          <li>
            <a href="ftp://arlftp.arlhq.noaa.gov/archives/gdas0p5/" target="_blank">GDAS0p5</a>
            : Global Data Assimilation System 0.5°×0.5°
            <br />1 file per day, eg.
            <b>20140401_gdas0p5</b>
          </li>
          <li>
            <a href="ftp://arlftp.arlhq.noaa.gov/archives/edas40/" target="_blank">EDAS40</a>
            : Eta Data Assimilation System 40 km for U.S. region
            <br />2 files per month, eg.
            <b>edas.apr14.001, edas.apr14.002</b>
          </li>

          <li>
            <a href="ftp://arlftp.arlhq.noaa.gov/narr/" target="_blank">NARR</a>
            : North American Regional Reanalysis
            <br />1 file per month, eg.
            <b>NARR201404</b>
          </li>
        </ul>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
// message snackbar: show different types of messages by changing the "snackbar" stored in ui_control
// eg:
// snackbar = {
//             show: true,
//             text: "Failed to load file!",
//             color: "error",
//           };

import { mapState } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      ui_control: "ui_control",
    }),
  },
};
</script>
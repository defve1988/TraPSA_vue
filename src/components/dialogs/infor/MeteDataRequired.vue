<template>
  <v-dialog v-model="ui_control.mete_required.show" width="600" scrollable>
    <v-card >
      <v-card-title class="py-1 title font-weight-medium secondary primary--text text--darken-2">
        Meteorological Data Required
        <v-spacer></v-spacer>
        <v-btn icon @click="ui_control.mete_required.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="subtitle-1 px-5 py-3">
        <b>{{ui_control.mete_required.items.length}}</b> meteorological date files are required for this HYSPLIT job.
        Please make sure you have downloaded all the listed files below:
      </v-card-text>

      <v-row class="ml-5 mr-0">
        <v-col cols="4" v-for="(item,index) in ui_control.mete_required.items" :key="index">
          <v-card flat><span class="subtitle-1 font-weight-light">{{item}}</span></v-card>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="ui_control.mete_required.show = false" text color="primary">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
<template>
  <v-snackbar
    v-model="app_data.ui_control.snackbar.show"
    bottom
    multi-line
    class="ma-1"
  >
    {{ app_data.ui_control.snackbar.text }}
    <v-btn
      :color="app_data.ui_control.snackbar.color"
      text
      @click="app_data.ui_control.snackbar.show = false"
      >Close</v-btn
    >
  </v-snackbar>
</template>

<script>
// message snackbar: show different types of messages by changing the "snackbar" stored in app_data.ui_control
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
      app_data: "app_data",
    }),
  },
};
</script>
<style scoped>
</style>
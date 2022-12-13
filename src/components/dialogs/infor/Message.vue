<template>
  <v-snackbar
    v-model="ui_control.snackbar.show"
    bottom
    multi-line
    class="ma-1"
  >
    {{ ui_control.snackbar.text }}
    <v-btn
      :color="ui_control.snackbar.color"
      text
      @click="ui_control.snackbar.show = false"
      >Close</v-btn
    >
  </v-snackbar>
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
<style scoped>
</style>
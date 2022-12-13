<template>
  <v-card>
    <v-card-title
      class="py-1 title font-weight-medium secondary primary--text text--darken-2"
    >
      New Resaerch Case
      <v-spacer></v-spacer>
      <v-btn icon @click="app_data.ui_control.new_source_layer.show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  data: () => ({}),
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
  },
  mounted() {},
  methods: {},
};
</script>
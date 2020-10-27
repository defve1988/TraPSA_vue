<template>
  <v-card color="secondary" flat>
    <v-container class="px-10 pt-1 pb-0">
      <v-row>
        <v-col cols="3" class="mt-2 px-0">
          <map_layer />
        </v-col>
        
        <v-col cols="9" class="mt-2 px-5">
          <v-row dense>
            <mapping_widget />
          </v-row>
        </v-col>

      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "potential_source",
  components: {
    mapping_widget: () => import("@/components/Mapping.vue"),
    map_layer: () => import("@/components/MapLayer.vue"),
  },
  data: () => ({}),
  watch: {},
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
  },
  mounted() {},
  methods: {},
};
</script>
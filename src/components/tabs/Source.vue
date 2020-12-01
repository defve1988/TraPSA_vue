<template>
  <v-card color="secondary" flat>
    <v-container class="px-10 pt-1 pb-0">
      <v-row>
        <v-col cols="3" class="mt-2 px-0">
          <source_case />
        </v-col>

        <v-col cols="9" class="mt-2 px-5">
          <v-row dense>
            <map_card :button_not_uesd="button_not_uesd" :card_height="700"/>
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
    map_card: () => import("@/components/widgets/MapCard.vue"),
    source_case: () => import("@/components/widgets/SourceCase.vue"),
  },
  data: () => ({
    button_not_uesd: [],
  }),
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
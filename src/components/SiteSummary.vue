<template>
  <v-container class="px-10 mt-n5">
    <v-data-iterator
      :items="app_data.site_summary"
      :items-per-page.sync="itemsPerPage"
      no-data-text="No data available, try refresh."
    >
      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.site_name" cols="4">
            <v-card class="mx-0">
              <v-card-title
                class="primary lighten-3 subtitle-1 font-weight-bold"
              >{{ item.site_name }}</v-card-title>
              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Latitude:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.location[0]}}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Longitude:</v-list-item-content>
                  <v-list-item-content class="align-end">{{item.location[1] }}</v-list-item-content>
                </v-list-item>

                <!-- expandable group with sub group -->
                <v-list-group value="true">
                  <template v-slot:activator>
                    <v-list-item-content class="pr-5">Pollutants</v-list-item-content>
                  </template>
                  <v-list-group
                    sub-group
                    v-for="(chemical,i) in Object.keys(item.chemicals)"
                    :key="i"
                  >
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>{{chemical}}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <v-list-item>
                      <v-list-item-content>Records:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.chemicals[chemical].record }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>Mean:</v-list-item-content>
                      <v-list-item-content
                        class="align-end"
                      >{{ Math.round(item.chemicals[chemical].mean*100)/100 }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>Max:</v-list-item-content>
                      <v-list-item-content
                        class="align-end"
                      >{{ Math.round(item.chemicals[chemical].max*100)/100 }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>Min:</v-list-item-content>
                      <v-list-item-content
                        class="align-end"
                      >{{ Math.round(item.chemicals[chemical].min*100)/100 }}</v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                </v-list-group>

                <!-- expandable group -->
                <v-list-group>
                  <template v-slot:activator>
                    <v-list-item-content class="pr-5">Trajectory Jobs</v-list-item-content>
                  </template>

                  <v-list-item v-for="(traj,jj) in item.traj.num" :key="jj">
                    <v-list-item-content>{{item.traj.jobs[jj]}}</v-list-item-content>
                  </v-list-item>
                </v-list-group>

                <v-list-item>
                  <v-list-item-content>Wind Data:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.wind.record }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    itemsPerPage: 3,
    admins: [
      ["Management", "people_outline"],
      ["Settings", "settings"],
    ],
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
    }),
  },
  mounted() {},
  methods: {},
};
</script>
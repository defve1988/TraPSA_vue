<template>
  <draggable v-model="ui_control.column_import" class="row_drag" v-bind="dragOptions">
    <!-- <v-btn @click="test">
        df
      </v-btn> -->
    <v-col :cols="3" class="pa-1 py-0">
      <v-card height="485" class="select_list">
        <v-system-bar :class="ui_control.system_bar_class" height="25">
          {{ ui_control.column_import[0].name }}
        </v-system-bar>

        <draggable
          v-model="ui_control.column_import[0].var"
          class="drag-list-group var_list py-1"
          v-bind="dragOptions"
          group="attrs"
          @start="$emit('startDragging')"
          @end="$emit('endDragging')"
        >
          <div
            v-for="(item, index) in ui_control.column_import[0].var"
            :key="index"
            class="drag-list-group-item pl-1 pt-1"
          >
            <v-chip small color="primary darken-2" outlined> {{ item }}</v-chip>
          </div>
        </draggable>
      </v-card>
    </v-col>

    <v-col :cols="3" class="pa-1 py-0">
      <v-row class="mx-1 pb-3">
        <v-col cols="12" class="pa-0 ma-0">
          <v-card height="235" class="select_list">
            <v-system-bar :class="ui_control.system_bar_class" height="25">
              {{ ui_control.column_import[1].name }}
            </v-system-bar>

            <draggable
              v-model="ui_control.column_import[1].var"
              class="drag-list-group var_list py-1"
              v-bind="dragOptions"
              group="attrs"
              @start="$emit('startDragging')"
              @end="$emit('endDragging')"
            >
              <div
                v-for="(item, index) in ui_control.column_import[1].var"
                :key="index"
                class="drag-list-group-item pl-1 pt-1"
              >
                <v-chip small color="primary">
                  {{ item }}</v-chip
                >
              </div>
            </draggable>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mx-1 pb-0">
        <v-col cols="12" class="pa-0 ma-0">
          <v-card height="238" class="select_list">
            <v-system-bar :class="ui_control.system_bar_class" height="25">
              {{ ui_control.column_import[2].name }}
            </v-system-bar>

            <draggable
              v-model="ui_control.column_import[2].var"
              class="drag-list-group var_list py-1"
              v-bind="dragOptions"
              group="attrs"
              @start="$emit('startDragging')"
              @end="$emit('endDragging')"
            >
              <div
                v-for="(item, index) in ui_control.column_import[2].var"
                :key="index"
                class="drag-list-group-item pl-1 pt-1"
              >
                <v-chip small color="primary" >
                  {{ item }}</v-chip
                >
              </div>
            </draggable>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col :cols="3" class="pa-1 py-0">
      <v-card height="485" class="select_list">
        <v-system-bar :class="ui_control.system_bar_class" height="25">
          {{ ui_control.column_import[3].name }}
        </v-system-bar>

        <draggable
          v-model="ui_control.column_import[3].var"
          class="drag-list-group var_list py-1"
          v-bind="dragOptions"
          group="attrs"
          @start="$emit('startDragging')"
          @end="$emit('endDragging')"
        >
          <div
            v-for="(item, index) in ui_control.column_import[3].var"
            :key="index"
            class="drag-list-group-item pl-1 pt-1"
          >
            <v-chip small color="primary" > {{ item }}</v-chip>
          </div>
        </draggable>
      </v-card>
    </v-col>

    <v-col :cols="3" class="pa-1 py-0">
      <v-row class="mx-1 pb-3" >
        <v-col cols="12" class="pa-0 ma-0">
          <v-card height="235" class="select_list">
            <v-system-bar :class="ui_control.system_bar_class" height="25">
              {{ ui_control.column_import[4].name }}
            </v-system-bar>

            <draggable
              v-model="ui_control.column_import[4].var"
              class="drag-list-group var_list py-1"
              v-bind="dragOptions"
              group="attrs"
              @start="$emit('startDragging')"
              @end="$emit('endDragging')"
            >
              <div
                v-for="(item, index) in ui_control.column_import[4].var"
                :key="index"
                class="drag-list-group-item pl-1 pt-1"
              >
                <v-chip small color="primary" >
                  {{ item }}</v-chip
                >
              </div>
            </draggable>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mx-1 pb-0">
        <v-col cols="12" class="pa-0 ma-0">
          <v-card height="238" class="select_list">
            <v-system-bar :class="ui_control.system_bar_class" height="25">
              {{ ui_control.column_import[5].name }}
            </v-system-bar>

            <draggable
              v-model="ui_control.column_import[5].var"
              class="drag-list-group var_list py-1"
              v-bind="dragOptions"
              group="attrs"
              @start="$emit('startDragging')"
              @end="$emit('endDragging')"
            >
              <div
                v-for="(item, index) in ui_control.column_import[5].var"
                :key="index"
                class="drag-list-group-item pl-1 pt-1"
              >
                <v-chip small color="primary" >
                  {{ item }}</v-chip
                >
              </div>
            </draggable>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </draggable>
</template>

<script>
import { mapState } from "vuex";
import draggable from "vuedraggable";
export default {
  name: "var_selection",
  props: ["content"],
  components: { draggable },
  mounted() {},
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  watch: {},
  data: () => ({
    isDragging: false,
  }),
  methods: {
    test() {
      this.ui_control.column_import.map((x) => console.log(x.var));
    },
  },
};
</script>

<style scoped>
.row_drag {
  display: flex;
  flex-wrap: wrap;
}
.ghost {
  opacity: 0.5;
  /* background: #c8ebfb; */
}

.select_list{
  overflow: auto;
}
</style>
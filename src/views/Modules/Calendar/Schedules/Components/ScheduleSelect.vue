<template>
  <MultiSelect
      :label="$t('calendar.navbar.view.search.label')"
      :options="options"
      @change="onOptionChanged"
      @select="onOptionChanged"
      @deselect="onOptionChanged"
      @clear="onOptionChanged"
      @paste="onOptionChanged"
      v-model="selected"
      mode="single"
      :allow-show-options-list="true"
      :allow-create-options="false"
      :can-clear="true"
      ref="multiselect"
  />
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {ISchedule}     from "tui-calendar";

import moment from "moment";

export default {
  data(): ComponentData {
    return {
      selected: null,
    }
  },
  props: {
    schedules: {
      type: Array,
      required: true
    }
  },
  components: {
    MultiSelect
  },
  emits: [
    "change"
  ],
  computed: {
    /**
     * @description select options
     */
    options(): Array<Record<string, string>> {
      let options = [];
      for (let schedule of this.schedules as Array<ISchedule>) {
        options.push({
          label: schedule.title + " (" + moment(schedule.start).format("YYYY-MM-DD") + ")",
          value: schedule.id
        })
      }

      return options;
    }
  },
  methods: {
    /**
     * @description will save + emit the selected country when country selection option changes
     */
    onOptionChanged(value: number): void {
      this.selectedLimit = value;
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
    },
    /**
     * @description unsets the selected value
     */
    clear(): void {
      this.$refs.multiselect.clear();
    }
  },
}
</script>
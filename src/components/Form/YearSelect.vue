<template>
  <MultiSelect
      :label="$t('components.yearSelect.label')"
      :options="options"
      @change="onOptionChanged"
      @select="onOptionChanged"
      @deselect="onOptionChanged"
      @clear="onOptionChanged"
      @paste="onOptionChanged"
      v-model="selectedValue"
      mode="single"
      :allow-show-options-list="true"
      :allow-create-options="false"
      :can-clear="true"
      :required="true"
  />
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      selectedValue: null,
    }
  },
  props: {
    years: {
      type: Array,
      required: true,
    },
  },
  components: {
    MultiSelect
  },
  computed: {
    /**
     * @description returns select options
     */
    options(): Array {
      let options = [];
      for (let year of this.years) {
        options.push({
          label: year,
          value: year,
        })
      }

      // sort years descending
      options.sort((prev: Record, next: Record) => next.value - prev.value);

      return options;
    }
  },
  methods: {
    /**
     * @description will save + emit the selected value
     */
    onOptionChanged(value: number): void {
      this.selectedValue = value;
      this.$emit('update:modelValue', value);
    }
  }
}
</script>
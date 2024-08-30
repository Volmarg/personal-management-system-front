<template>
  <MultiSelect
      :label="$t('reports.historical.moneyOwed.tabs.shared.filter.target.label')"
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
      :required="true"
  />
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      selectOptions: [],
      selectedValue: 0,
    }
  },
  props: {
    options: {
      type: Array,
      required: true,
    }
  },
  components: {
    MultiSelect
  },
  methods: {
    /**
     * @description will save + emit the selected value
     */
    onOptionChanged(value: number): void {
      this.selectedValue = value;
      this.$emit('update:modelValue', value);
    }
  },
}
</script>
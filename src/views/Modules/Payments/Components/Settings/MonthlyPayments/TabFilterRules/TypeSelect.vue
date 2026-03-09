<template>
  <MultiSelect
      :label="$t('payments.settings.tab.monthlyImport.tab.filterRule.form.element.ruleType.label')"
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
      :required="true"
      ref="multiselect"
  />
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      selected: null,
      options: [
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.filterRule.form.element.ruleType.option.exact.label'),
          value: "exact"
        },
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.filterRule.form.element.ruleType.option.regex.label'),
          value: "regex"
        },
      ],
    }
  },
  components: {
    MultiSelect
  },
  emits: [
    "change"
  ],
  methods: {
    /**
     * @description will save + emit the selection on option change
     */
    onOptionChanged(value: number): void {
      this.selected = value;
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
    }
  },
}
</script>
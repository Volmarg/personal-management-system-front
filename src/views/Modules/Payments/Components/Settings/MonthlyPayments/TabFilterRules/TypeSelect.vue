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
import {MonthlyImportFilterRuleTypeEnum} from "@/scripts/Core/Enum/Modules/Payments/MonthlyImportFilter";

export default {
  data(): ComponentData {
    return {
      selected: null,
    }
  },
  components: {
    MultiSelect
  },
  emits: [
    "change"
  ],
  computed: {
    options(): Array<Record<string, string>> {
      let options = [];
      for (let index of Object.keys(MonthlyImportFilterRuleTypeEnum)) {
        let value = MonthlyImportFilterRuleTypeEnum[index];

        let description = value === MonthlyImportFilterRuleTypeEnum.regex ? this.$t('payments.settings.tab.monthlyImport.tab.filterRule.form.element.ruleType.option.regex.description') : null;
        options.push({
          label: this.$t(`payments.settings.tab.monthlyImport.tab.filterRule.form.element.ruleType.option.${value}.label`),
          value: value,
          description: description,
        })
      }

      return options;
    }
  },
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
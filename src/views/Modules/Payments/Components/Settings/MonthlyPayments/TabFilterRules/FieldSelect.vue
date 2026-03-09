<template>
  <MultiSelect
      :label="$t('payments.settings.tab.monthlyImport.tab.filterRule.table.header.fieldName.label')"
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

import {ComponentData}         from "@/scripts/Vue/Types/Components/types";
import {ImportMappedFieldEnum} from "@/scripts/Core/Enum/PaymentMonthly";

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
      let skippedFields = [
        ImportMappedFieldEnum.type,
      ];

      for (let key of Object.keys(ImportMappedFieldEnum)) {
        let enumValue = ImportMappedFieldEnum[key];
        if (skippedFields.includes(enumValue)) {
          continue;
        }

        options.push(        {
          label: enumValue,
          value: enumValue
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
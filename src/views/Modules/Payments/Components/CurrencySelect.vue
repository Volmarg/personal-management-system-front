<template>
  <MultiSelect
      :label="$t('payments.incomes.newForm.currency.label')"
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

import {FinancesCurrenciesState} from "@/scripts/Vue/Store/Module/System/Settings/FinancesCurrenciesState";

export default {
  data(): ComponentData {
    return {
      selected: null,
      currenciesData: [],
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
      for (let currency of this.currenciesData) {
        options.push({
          label: `${currency.name} (${currency.symbol})`,
          value: currency.name
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
  async mounted(): Promise<void> {
    await FinancesCurrenciesState().getAll();
    this.currenciesData = FinancesCurrenciesState().allEntries;
  }
}
</script>
<template>
  <MultiSelect
      :label="$t('payments.bills.overview.newForm.bill.label')"
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
    }
  },
  props: {
    bills: {
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
      for (let bill of this.bills) {
        options.push({
          label: `${bill.name} (${bill.startDate} - ${bill.endDate})`,
          value: bill.id
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
      this.selected = value;
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
    },
  },
}
</script>
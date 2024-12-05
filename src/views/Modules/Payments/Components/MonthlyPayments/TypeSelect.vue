<template>
  <MultiSelect
      :label="$t('payments.monthly.newForm.type.label')"
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

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

import {PaymentMonthlyState} from "@/scripts/Vue/Store/PaymentMonthlyState";

export default {
  data(): ComponentData {
    return {
      allPayments: [],
      store: null as null | StoreDefinition,
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
    /**
     * @description select options
     */
    options(): Array<Record<string, string>> {
      let options = [];
      let pushedIds = [];
      for (let payment of this.allPayments) {
        if (pushedIds.includes(payment.typeId)) {
          continue;
        }

        options.push({
          label: StringTypeProcessor.ucFirst(payment.typeName),
          value: payment.typeId,
        })

        pushedIds.push(payment.typeId);
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
    }
  },
  async beforeMount(): Promise<void> {
    this.store = PaymentMonthlyState();
    await this.store.getAll();
    this.allPayments = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: async function() {
        this.allPayments = this.store.allEntries;
      }
    }
  }
}
</script>
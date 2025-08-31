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
      :required="true"
      ref="multiselect"
  />
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

import {PaymentTypesState} from "@/scripts/Vue/Store/Module/Payments/Settings/PaymentTypesState";

export default {
  data(): ComponentData {
    return {
      allTypes: [],
      store: null as null | StoreDefinition,
      selected: null,
    }
  },
  props: {
    modelValue: {
      required: false,
      default: null,
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
      for (let type of this.allTypes) {
        if (pushedIds.includes(type.id)) {
          continue;
        }

        options.push({
          label: StringTypeProcessor.ucFirst(type.name),
          value: type.id,
        })

        pushedIds.push(type.id);
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
    this.store = PaymentTypesState();
    await this.store.getAll();
    this.allTypes = this.store.allEntries;
    this.selected = this.modelValue;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: async function() {
        this.allTypes = this.store.allEntries;
      }
    },
    selected(): void {
      this.$emit("update:modelValue", this.selected);
      this.$emit('change', this.selected);
    },
    modelValue(): void {
      this.selected = this.modelValue;
    }
  }
}
</script>
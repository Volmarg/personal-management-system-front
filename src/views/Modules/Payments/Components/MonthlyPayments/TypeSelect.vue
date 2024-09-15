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

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      selected: null,
    }
  },
  props: {
    types: {
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
      for (let type of this.types) {
        options.push({
          label: StringTypeProcessor.ucFirst(type),
          value: type,
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
    }
  },
}
</script>
<template>
  <MultiSelect
      :label="$t('job.afterhours.new.form.type.label')"
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

import {ComponentData}     from "@/scripts/Vue/Types/Components/types";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      types: [
        "made",
        "spent",
      ],
      selectOptions: [],
      selectedValue: this.modelValue,
    }
  },
  props: {
    modelValue: {
      required: false,
    },
  },
  components: {
    MultiSelect
  },
  computed: {
    /**
     * @description returns the select options
     */
    options(): Array {
      let options = [];
      for (let type of this.types) {
        options.push({
          label: StringTypeProcessor.ucFirst(type),
          value: type,
        })
      }

      return options;
    },
  },
  methods: {
    /**
     * @description will save + emit the selected country when country selection option changes
     */
    onOptionChanged(value: number): void {
      this.selectedValue = value;
      this.$emit('update:modelValue', value);
    }
  },
  watch: {
    modelValue(): void {
      this.selectedValue = this.modelValue;
    }
  }
}
</script>
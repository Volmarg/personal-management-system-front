<template>
    <MultiSelect
        :label="$t('generic.form.upload.field.tags.label')"
        :options="options"
        :disabled="isDisabled"
        @change="onOptionChanged"
        @select="onOptionChanged"
        @deselect="onOptionChanged"
        @clear="onOptionChanged"
        @paste="onOptionChanged"
        v-model="selectedValue"
        mode="tags"
        max-options="20"
        :allow-show-options-list="false"
        :allow-create-options="true"
    />
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      options: [],
      selectedValue: [this.modelValue],
    }
  },
  props: {
    modelValue: {
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
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
      this.selectedValue = [value];
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
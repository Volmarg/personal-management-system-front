<template>
  <MultiSelect
      :label="$t('generic.tags.label')"
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
      selectedValue: [],
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
      this.selectedValue = value;
      this.$emit('update:modelValue', value);
    }
  },
  mounted(): void {
    this.$nextTick(() => {
      this.selectedValue = this.modelValue;
    })
  },
  watch: {
    modelValue(): void {
      this.$nextTick(() => {
        this.selectedValue = this.modelValue;
      })
    }
  }
}
</script>
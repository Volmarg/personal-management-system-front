<template>
  <MultiSelect
      :label="$t('passwords.list.form.new.group.label')"
      :options="options"
      @change="onOptionChanged"
      @select="onOptionChanged"
      @deselect="onOptionChanged"
      @clear="onOptionChanged"
      @paste="onOptionChanged"
      v-model="selectedLimit"
      mode="single"
      :allow-show-options-list="true"
      :allow-create-options="false"
      :can-clear="false"
      :required="true"
  />
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      selectOptions: [],
      selectedLimit: 0,
    }
  },
  props: {
    options: {
      type: Array,
      required: true,
    }
  },
  components: {
    MultiSelect
  },
  methods: {
    /**
     * @description will save + emit the selected country when country selection option changes
     */
    onOptionChanged(value: number): void {
      this.selectedLimit = value;
      this.$emit('update:modelValue', value);
    }
  },
}
</script>
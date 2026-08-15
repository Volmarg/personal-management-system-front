<template>
  <MultiSelect
      :label="$t('health.overview.form.singleComponents.doctorSelect.label')"
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
      :violations="violations"
      ref="multiselect"
  />
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import MultiSelect from "@/components/Form/MultiSelect.vue";

import {DoctorStore} from "@/scripts/Vue/Store/Module/Health/DoctorStore";

export default {
  data(): ComponentData {
    return {
      selected: this.modelValue,
      doctorStore: null,
      violations: [],
    }
  },
  props: {
    modelValue: {
      required: false,
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
      for (let doctor of this.doctorStore.allEntries) {
        options.push({
          label: `${doctor.name}`,
          value: doctor.id
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
  beforeMount(): void {
    this.doctorStore = DoctorStore();
  },
  watch: {
    modelValue(): void {
      this.selected = this.modelValue;
    }
  }
}
</script>
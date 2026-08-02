<template>
  <MultiSelect
      :label="$t('health.overview.tabs.subTabs.tabs.files.text.appointment')"
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

import {DoctorAppointmentStore} from "@/scripts/Vue/Store/Module/Health/AppointmentStore";

import MultiSelect from "@/components/Form/MultiSelect.vue";

export default {
  data(): ComponentData {
    return {
      selected: this.modelValue,
      doctorAppointmentStore: null,
    }
  },
  props: {
    modelValue: {
      required: false,
    },
    illnessId: {
      type: Number,
      required: true,
    },
    violations: {
      type: Array,
      required: true,
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
      for (let appointment of this.doctorAppointmentStore.allEntries) {
        if (appointment.illness !== this.illnessId) {
          continue;
        }

        options.push({
          label: `${appointment.doctor.name} (${appointment.date})`,
          value: appointment.id
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
    this.doctorAppointmentStore = DoctorAppointmentStore();
  },
  watch: {
    modelValue(): void {
      this.selected = this.modelValue;
    }
  }
}
</script>
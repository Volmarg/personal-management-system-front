<template>
  <MultiSelect
      :label="$t('payments.monthly.tabs.import.step.map.menu.profile.label')"
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

import {MonthlyImportProfilesStore} from "@/scripts/Vue/Store/Module/Payments/Settings/MonthlyImportProfilesStore";

import ArrayTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

export default {
  data(): ComponentData {
    return {
      importProfileStore: null,
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
    options(): Array<Record<string, string>> {
      let options = [];
      for (let profileData of this.importProfileStore.allEntries) {
        options.push({
          label: profileData.name,
          value: profileData.id,
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
  async beforeMount(): Promise<void> {
    this.importProfileStore = MonthlyImportProfilesStore();
    if (ArrayTypeProcessor.isEmpty(this.importProfileStore.allEntries)) {
      await this.importProfileStore.getAll();
    }
  },
}
</script>
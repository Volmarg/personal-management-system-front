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

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";
import {GroupsStore}     from "@/scripts/Vue/Store/Module/Passwords/GroupsStore";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      selectOptions: [],
      groups: [],
      store: null as null | StoreDefinition,
      selectedLimit: 0,
    }
  },
  components: {
    MultiSelect
  },
  computed: {
    /**
     * @description returns select data
     */
    options(): Array {
      let options = [];
      for (let group of this.groups) {
        options.push({
          label: StringTypeProcessor.ucFirst(group.name),
          value: group.id,
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
      this.selectedLimit = value;
      this.$emit('update:modelValue', value);
    }
  },
  async beforeMount(): Promise<void> {
    this.store = GroupsStore();
    await this.store.getAll();
    this.groups = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function () {
        this.groups = this.store.allEntries;
      }
    }
  }
}
</script>
<template>
  <MultiSelect
      :label="$t('travels.ideas.form.category.label')"
      :options="options"
      @change="onOptionChanged"
      @select="onOptionChanged"
      @deselect="onOptionChanged"
      @clear="onOptionChanged"
      @paste="onOptionChanged"
      v-model="selectedValue"
      :can-clear="false"
      :required="true"
      mode="tags"
      max-options="1"
      :allow-show-options-list="true"
      :allow-create-options="true"
  />
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData}    from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition}  from "pinia";
import {TravelIdeasStore} from "@/scripts/Vue/Store/Module/Travel/IdeasStore";

export default {
  data(): ComponentData {
    return {
      store: null as null | StoreDefinition,
      ideas: [],
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
      let categories = [];
      let options = [];

      for (let idea of this.ideas) {
        categories.push(idea.category);
      }

      categories = [...new Set(categories)];
      for (let category of categories) {
        options.push({
          label: category,
          value: category,
        })
      }

      return options;
    },
  },
  methods: {
    /**
     * @description will save + emit the selected data when selection option changes
     */
    onOptionChanged(value: number): void {
      this.selectedValue = value;
      this.$emit('update:modelValue', value);
    }
  },
  async beforeMount(): Promise<void> {
    this.store = TravelIdeasStore();
    await this.store.getAll();
    this.ideas = this.store.allEntries;
  },
  watch: {
    modelValue(): void {
      this.selectedValue = this.modelValue;
    }
  }
}
</script>
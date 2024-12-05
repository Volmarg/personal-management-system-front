<template>
  <MultiSelect
      :label="label"
      selected-label-source="selectedLabel"
      :options="options"
      @change="onOptionChanged"
      @select="onOptionChanged"
      @deselect="onOptionChanged"
      @clear="onOptionChanged"
      @paste="onOptionChanged"
      v-model="value"
      mode="single"
      :allow-show-options-list="true"
      :allow-create-options="false"
      :can-clear="false"
      :required="true"
      v-if="areOptionsReady"
  />
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";

import {CategoriesState} from "@/scripts/Vue/Store/Module/Notes/CategoriesState";

export default {
  data(): ComponentData {
    return {
      categoriesStore: null as null | StoreDefinition,
      areOptionsReady: false,
      options: [],
      categories: [],
      value: 0,
    }
  },
  props: {
    selected: {
      type: Number,
      required: false,
      default: 0,
    },
    label: {
      type: String,
      required: true,
    }
  },
  components: {
    MultiSelect
  },
  methods: {
    /**
     * @description Walks over all the parent nodes and builds the select options.
     *              It works the way that options have proper indentations so that the
     *              parent-child nesting hierarchy is properly represented.
     */
    traverseTree(): void {
      for (let mainNode of this.categories) {
        this.addOption(mainNode, 0)
        this.traverseNode(mainNode);
      }

      this.areOptionsReady = true;
    },
    /**
     * @description takes one category node, and walks over the children (if there are any)
     *              until all the nodes are traversed. Each time adds children to the select options.
     */
    traverseNode(node: Record): void {
      if (!node.children) {
        return;
      }

      for (let child of node.children) {
        // prevent dupes - something wrong with recursion, but whatever, this removes dupes
        if (!this.options.find(option => option.value == child.id)) {
          let level = this.categoriesStore.getCategoryNestingLevel(child.parentId);
          this.addOption(child, level)
        }

        this.traverseNode(child);
      }
    },
    /**
     * @description adds option show in the select
     */
    addOption(node: Record, level: number): void {
      this.options.push({
        /**
         * @description this isn't a spacebar, because it gets trimmed, nbsp is not as well
         * @link https://www.compart.com/en/unicode/U+3164
         */
        label: "ㅤ".repeat(level) + node.name,
        selectedLabel: node.name,
        value: node.id,
      })
    },
    /**
     * @description will save + emit the selected country when country selection option changes
     */
    onOptionChanged(value: number): void {
      this.value = value;
      this.$emit('update:modelValue', value);
    },
    /**
     * @description will build the categories based on the store data
     */
    buildCategories(): void {
      this.options = [];
      this.categories = this.categoriesStore.getNestedCategories();
      this.traverseTree();
    },
  },
  mounted(): void {
    this.value = this.selected;
  },
  async beforeMount(): Promise<void> {
    this.categoriesStore = CategoriesState();
    await this.categoriesStore.getAll();
    this.buildCategories();
  },
  watch: {
    'categoriesStore.allEntries': {
      deep: true,
      handler: function () {
        this.buildCategories();
      }
    }
  }

}
</script>
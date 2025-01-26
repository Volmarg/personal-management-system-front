<template>
  <MultiSelect
      :label="$t('contacts.list.other.group.label')"
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
      :can-clear="true"
      :required="true"
  />
</template>

<script lang="ts">
import MultiSelect    from "@/components/Form/MultiSelect.vue";
import ColorInfoBlock from "@/components/Ui/ColorInfoBlock.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      selectedValue: null,
    }
  },
  props: {
    groupsData: {
      type: Array,
      required: true,
    },
  },
  components: {
    MultiSelect
  },
  computed: {
    /**
     * @description returns select options
     */
    options(): Array {
      let options = [];
      for (let group of this.groupsData) {
        options.push({
          label: group.name,
          value: group.id,
          component: ColorInfoBlock,
          props: {
            colorHex: group.color,
            maxWidth: '10px'
          }
        })
      }

      return options;
    }
  },
  methods: {
    /**
     * @description will save + emit the selected value
     */
    onOptionChanged(value: number): void {
      this.selectedValue = value;
      this.$emit('update:modelValue', value);
    }
  }
}
</script>

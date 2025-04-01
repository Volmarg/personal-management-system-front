<template>
  <!-- again weird case where wrapper is needed, else the selection by name is not updating the multiselect, even tho the function works properly -->
  <div>
    <MultiSelect
        :label="$t('contacts.list.modal.addEdit.typeForm.type.label')"
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
        ref="multiselect"
    />
  </div>
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";
import Image       from "@/components/Ui/Image.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {TypeStore} from "@/scripts/Vue/Store/Module/Contacts/TypeStore";

import PublicFolderService from "@/scripts/Core/Services/PublicFolder/PublicFolderService";

export default {
  data(): ComponentData {
    return {
      types: [],
      selectedValue: null,
    }
  },
  props: {
    name: {
      type: [String, null],
      required: false,
      default: null
    }
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
      for (let type of this.types) {
        options.push({
          label: type.name,
          value: type.id,
          component: Image,
          props: {
            path: PublicFolderService.buildUrl(type.imagePath),
            width: '35px'
          }
        })
      }

      return options;
    }
  },
  methods: {
    /**
     * @description clears the multiselect
     */
    clear(): void {
      this.$refs.multiselect.clear();
    },
    /**
     * @description will save + emit the selected value
     */
    onOptionChanged(value: number): void {
      this.selectedValue = value;
      this.$emit('update:modelValue', value);
    },
    /**
     * @description if type name is provided then it's going to be used to find the type, and then selects it
     */
    selectByName(): void {
      if (!this.name) {
        return;
      }

      for (let type of this.types) {
        if (type.name === this.name) {
          this.selectedValue = type.id;
          break;
        }
      }
    },
  },
  async beforeMount(): Promise<void> {
    let store = TypeStore();
    await store.getAll();
    this.types = store.allEntries;

    this.selectByName();
  }
}
</script>

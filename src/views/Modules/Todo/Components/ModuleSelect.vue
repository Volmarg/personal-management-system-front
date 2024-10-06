<template>
  <MultiSelect
      :label="$t('todo.common.form.moduleSelect.text.module')"
      :options="moduleOptions"
      @change="onOptionChanged"
      @select="onOptionChanged"
      @deselect="onOptionChanged"
      @clear="onOptionChanged"
      @paste="onOptionChanged"
      v-model="selectedModule"
      mode="single"
      :allow-show-options-list="true"
      :allow-create-options="false"
      :can-clear="true"
  />

  <MultiSelect
      :label="$t('todo.common.form.moduleSelect.text.record')"
      :options="recordOptions"
      class="mt-6"
      @change="onOptionChanged"
      @select="onOptionChanged"
      @deselect="onOptionChanged"
      @clear="onOptionChanged"
      @paste="onOptionChanged"
      v-model="selectedRecord"
      mode="single"
      :allow-show-options-list="true"
      :allow-create-options="false"
      :can-clear="true"
      :required="true"
      v-if="selectedModule === boundModule.issues"
  />
</template>

<script lang="ts">
import TodoModuleMixin from "@/views/Modules/Todo/Mixin/TodoModuleMixin.vue";

import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      selectedModule: null,
      selectedRecord: null,
      options: [],
    }
  },
  props: {
    initialModule: {
      type: String,
      required: false,
      default: null,
    },
    initialRecord: {
      type: String,
      required: false,
      default: null,
    }
  },
  mixins: [
    TodoModuleMixin,
  ],
  components: {
    MultiSelect
  },
  computed: {
    moduleOptions(): Array<Record> {
      return [
        {
          value: this.boundModule.goals,
          label: this.$t('todo.common.form.moduleSelect.text.modules.goals')
        },
        {
          value: this.boundModule.issues,
          label: this.$t('todo.common.form.moduleSelect.text.modules.issues')
        }
      ]
    },
    recordOptions(): Array<Record> {
      return [
        {
          value: 1,
          label: "Dummy 1"
        },
        {
          value: 2,
          label: "Dummy 2"
        },
        {
          value: 3,
          label: "Dummy 3"
        },
        {
          value: 4,
          label: "Dummy 4"
        },
        {
          value: 5,
          label: "Dummy 5"
        },
      ]
    }
  },
  mounted(): void {
    this.selectedModule = this.initialModule;
    if (this.selectedModule) {
      // that's a must because record select is only visible if certain module is selected, else record entry won't be pre-selected
      this.$nextTick(() => {
        this.selectedRecord = this.initialRecord;
      })
    }
  },
  watch: {
    selectedModule(): void {
      if (this.selectedModule !== this.boundModule.issues) {
        this.selectedRecord = null;
      }
    }
  }
}
</script>
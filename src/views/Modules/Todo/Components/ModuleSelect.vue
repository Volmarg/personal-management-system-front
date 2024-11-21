<template>
  <div class="flex flex-col">
    <MultiSelect
        :label="$t('todo.common.form.moduleSelect.text.module')"
        :options="moduleOptions"
        @change="onOptionChanged"
        @select="onOptionChanged"
        @deselect="onOptionChanged"
        @clear="onOptionChanged"
        @paste="onOptionChanged"
        v-model="selectedModuleId"
        mode="single"
        :allow-show-options-list="true"
        :allow-create-options="false"
        :can-clear="true"
        v-if="canShowSelect"
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
        v-if="selectedModuleName === boundModule.issues && canShowSelect"
    />
  </div>
</template>

<script lang="ts">
import TodoModuleMixin from "@/views/Modules/Todo/Mixin/TodoModuleMixin.vue";

import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {TodoModuleState} from "@/scripts/Vue/Store/TodoModuleState";

import BaseError from "@/scripts/Core/Error/BaseError";

export default {
  data(): ComponentData {
    return {
      canShowSelect: true,
      modulesWithRecordsData: [],
      todoStateStore: null as null | TodoModuleState,
      selectedModuleId: null,
      selectedRecord: null,
      options: [],
    }
  },
  props: {
    forceFetchedRecordIds: {
      type: Array,
      required: false,
      default: () => [],
    },
    initialModuleId: {
      type: [Number, null],
      required: false,
      default: null,
    },
    initialRecord: {
      type: [Number, null],
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
  emits: [
    'moduleChange',
    'recordChange'
  ],
  computed: {
    /**
     * @description returns the module name for given id
     */
    selectedModuleName(): string {
      if (this.modulesWithRecordsData.length === 0 || !this.selectedModuleId) {
        return null;
      }

      for (let moduleData of this.modulesWithRecordsData) {
        if (moduleData.id == this.selectedModuleId) {
          return moduleData.name;
        }
      }

      throw new BaseError(`No module name found for module id: ${this.selectedModuleId}`);
    },
    /**
     * @description returns module options array
     */
    moduleOptions(): Array<Record> {
      if (!this.todoStateStore) {
        return [];
      }

      let moduleOptions = [];
      for (let moduleData of this.modulesWithRecordsData) {
        moduleOptions.push({
          value: moduleData.id,
          label: moduleData.name
        })
      }

      return moduleOptions;
    },
    /**
     * @description returns module selectable records options array
     */
    recordOptions(): Array<Record> {
      if (!this.todoStateStore) {
        return [];
      }

      let options = [];
      if (!this.selectedModuleId) {
        return options;
      }

      let entries = this.modulesWithRecordsData.find((moduleData) => moduleData.id == this.selectedModuleId)?.entries ?? [];
      for (let entry of entries) {
        options.push({
          value: entry.id,
          label: entry.name
        })
      }

      return options;
    }
  },
  methods: {
    /**
     * @description clear the selected module and record
     */
    clearSelections(): void {
      this.setUsedData(null, null);
    },
    /**
     * @description set used record id from initially provided data
     */
    setUsedData(moduleId: number | null, record: number | null): void {
      this.selectedModuleId = moduleId;
      if (this.selectedModuleId) {
        // that's a must because record select is only visible if certain module is selected, else record entry won't be pre-selected
        this.$nextTick(() => {
          this.selectedRecord = record;
        })
      }
    }
  },
  beforeMount(): void {
    this.todoStateStore = TodoModuleState();
    this.todoStateStore.fetchModulesWithRecordsData(this.forceFetchedRecordIds)
  },
  mounted(): void {
    this.setUsedData(this.initialModuleId, this.initialRecord);
  },
  watch: {
    initialModuleId(): void {
      this.setUsedData(this.initialModuleId, this.initialRecord);
    },
    initialRecord(): void {
      this.setUsedData(this.initialModuleId, this.initialRecord);
    },
    'todoStateStore.modulesWithRecordsData': {
      deep: true,
      handler: function() {
        this.canShowSelect = false;
        this.modulesWithRecordsData = this.todoStateStore?.modulesWithRecordsData ?? [];
        this.$nextTick(() => {
          this.canShowSelect = true;
        })
      }
    },
    selectedRecord(): void {
      this.$emit('recordChange', this.selectedRecord);
    },
    selectedModuleId(): void {
      this.$emit('moduleChange', this.selectedModuleId);
      if (!this.selectedModuleId) {
        this.selectedRecord = null;
        this.selectedModuleName = null;
        return;
      }

      this.selectedModuleName = this.moduleNameForId;
      if (this.selectedModuleId !== this.boundModule.issues) {
        this.selectedRecord = null;
        return;
      }
    }
  }
}
</script>
<template>
  <div class="mt-10">
    <h2 class="text-lg">{{ $t('systemSettings.tab.modules.lock.header') }}</h2>
    <SimpleTable :headers="headers"
                 :data="data"
                 ref="table"
                 v-if="data.length > 0"
                 :id="moduleLocksTableId"
                 @component-value-change="onComponentValueChange"
                 @before-page-change="isPageDataChanging=true"
                 @after-table-rows-handled="isPageDataChanging=false"
    />
  </div>
</template>

<script lang="ts">
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import ColoredSwitch from "@/components/Ui/ColoredSwitch.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonySystemRoutes     from "@/router/SymfonyRoutes/Modules/SymfonySystemRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseError               from "@/scripts/Core/Error/BaseError";
import TypeChecker             from "@/scripts/Core/Services/Types/TypeChecker";

export default {
  data(): ComponentData {
    return {
      moduleLocksTableId: 'moduleLocks',
      moduleLocks: [],
      isPageDataChanging: false,
      headers: [
        {
          label: 'id',
          isVisible: false,
          dataValuePath : `id.value`,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t(`systemSettings.tab.modules.lock.table.headers.name.label`),
          dataValuePath : `name.value`,
          dataIsComponentPath : `name.isComponent`,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t(`systemSettings.tab.modules.lock.table.headers.isLocked.label`),
          dataValuePath : `isLocked.value`,
          dataIsComponentPath : `isLocked.isComponent`,
          dataComponentPropertiesPath: `isLocked.componentProps`,
          dataComponentModelValuePath: `isLocked.componentModelValue`
        },
      ],
    }
  },
  components: {
    SimpleTable
  },
  computed: {
    data(): Array<Record<string, unknown>> {
      let rows = [] as Array<Record<string, unknown>>;
      for (let moduleLockData of this.moduleLocks) {
        rows.push({
          values : {
            id: {
              value: moduleLockData.name,
              isComponent: false,
              isVisible: false,
            },
            name: {
              value: this.$t('other.moduleName.backendToFrontendMapping.' + moduleLockData.name),
              isComponent: false,
            },
            isLocked : {
              value: ColoredSwitch,
              isComponent: true,
              componentModelValue: moduleLockData.isLocked,
              componentProps: {},
            },
          }
        })
      }

      return rows;
    }
  },
  methods: {
    /**
     * @description reacts on table component value change, dispatches the handling further
     */
    onComponentValueChange(data: Record) {
      /**
       * @description this is must because table page change triggers the component value change as well,
       *              and we don't need data-save in that case.
       */
      if (this.isPageDataChanging) {
        return;
      }

      if (data.tableId == this.moduleLocksTableId) {
        this.$nextTick(() => {
          this.onModuleLockChange();
        })
      }
    },
    /**
     * @description handles module lock change, updates the lock state
     *              Sending all the data at once, because this is how the legacy code on backend works like.
     */
    async onModuleLockChange(): Promise<void> {
      let moduleLocks = [] as Array<Record<string, string|boolean>>;
      for (let colsData of this.$refs.table.rowsData) {
        let isLockedFieldId = colsData.find((col: Record<string, unknown>) => col.fieldId === 'isLocked')?.uniqId;

        let name = colsData.find((col: Record<string, unknown>) => col.fieldId === 'id')?.value;
        let isLocked = this.$refs.table.componentValues[isLockedFieldId];

        if (TypeChecker.isUndefined(name) || TypeChecker.isUndefined(isLocked)) {
          throw new BaseError("Could not read the module name or lock state", {
            colsData: colsData,
            isLocked: isLocked,
            name: name,
          });
        }

        moduleLocks.push({
          name: name,
          isLocked: isLocked,
        });
      }

      let dataBag = {
        moduleLocks: moduleLocks
      };

      let config = new BackendModuleCallConfig(SymfonySystemRoutes.SETTINGS_MODULES_LOCK_BASE, null, BaseApiResponse, dataBag);
      config.reload = false;

      await this.$moduleCall.update(config);
      this.fetchModuleLocksData();
    },
    /**
     * @description fetches all the module locks data
     */
    async fetchModuleLocksData(): Promise<void> {
      this.moduleLocks = await this.$moduleCall.getAll(SymfonySystemRoutes.SETTINGS_MODULES_LOCK_BASE);
    }
  },
  beforeMount(): void {
    this.fetchModuleLocksData();
  }
}
</script>
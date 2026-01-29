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
import SimpleTable       from "@/components/Ui/Table/SimpleTable.vue";
import ColoredSwitch     from "@/components/Ui/ColoredSwitch.vue";
import QuestionMarkAbout from "@/components/Ui/QuestionMarkAbout.vue";

import {BackendModuleNameEnum} from "@/scripts/Core/Enum/Modules";
import {ComponentData}         from "@/scripts/Vue/Types/Components/types";

import {CategoriesState} from "@/scripts/Vue/Store/Module/Notes/CategoriesState";

import SymfonySystemRoutes     from "@/router/SymfonyRoutes/Modules/SymfonySystemRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseError               from "@/scripts/Core/Error/BaseError";
import TypeChecker             from "@/scripts/Core/Services/Types/TypeChecker";
import PromiseService          from "@/scripts/Core/Services/Promise/PromiseService";
import LocalStorageService     from "@/scripts/Core/Services/Storage/LocalStorageService";
import EnvReader               from "@/scripts/Core/System/EnvReader";

export default {
  data(): ComponentData {
    return {
      moduleLocksTableId: 'moduleLocks',
      moduleLocks: [],
      isPageDataChanging: false,
      lockStateChangeHooks: {
        /**
         * @description it's known that notes categories fetch gets executed twice - that's because Notes menu node
         *              has watcher on all categories. It stays like this, not really a harmfull behaviour, and solving this out
         *              might take too much time, it's just not worth the deal atm.
         */
        [BackendModuleNameEnum.notes]: (isCurrentlyLocked: boolean, willBeLocked: boolean) => {
          if (isCurrentlyLocked && !willBeLocked) {
            CategoriesState().getAll();
          }
        }
      },
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
        {
          label: this.$t(`systemSettings.tab.modules.lock.table.headers.info.label`),
          dataValuePath : `info.value`,
          dataIsComponentPath : `info.isComponent`,
          dataComponentPropertiesPath: `info.componentProps`,
          dataComponentModelValuePath: `info.componentModelValue`
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
        let data = {
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
              componentProps: {
                disabled: EnvReader.isDemo()
              },
            },
          }
        }

        if (moduleLockData.name === BackendModuleNameEnum.storage) {
          data.values.info = {
            value: QuestionMarkAbout,
            isComponent: true,
            componentModelValue: null,
            componentProps: {
              text: this.$t('systemSettings.tab.modules.lock.table.info.storage'),
            },
          };
        }

        rows.push(data);
      }

      return rows;
    }
  },
  methods: {
    /**
     * @description return module current lock state
     */
    isLocked(moduleName: string): boolean {
      let lockData = this.moduleLocks.find((lockData: Record<string, string | boolean>) => lockData.name === moduleName);
      if (!lockData) {
        throw new BaseError(`No lock data found for module named ${moduleName}`);
      }

      return lockData.isLocked;
    },
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

      this.executeLockChangeHooks(moduleLocks);
      await this.$moduleCall.update(config);
      await this.fetchModuleLocksData();
    },
    /**
     * @description executes the hooks for each module lock state change (if such is defined for given module at all).
     */
    executeLockChangeHooks(moduleLocks: Array<Record<string, string | boolean>>) {
      let oldAuthToken = LocalStorageService.getAuthToken();
      for (let moduleLock of moduleLocks) {
        let hook = this.lockStateChangeHooks[moduleLock.name as string];
        if (hook instanceof Function) {
          let isCurrentlyLocked = this.isLocked(moduleLock.name);
          PromiseService.authTokenUpdatePromise(oldAuthToken).then(() => {
            hook(isCurrentlyLocked, moduleLock.isLocked);
          });
        }
      }
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
<template>
  <div class="mt-10">
    <h2 class="text-lg">{{ $t('systemSettings.tab.finances.currencies.header') }}</h2>
    <SimpleTable :headers="table.headers"
                 :data="this.usedTableData"
    />

    <AddEditForm :header="$t('systemSettings.tab.finances.currencies.form.header')"
                 @submit="refreshPageState"
    />
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SimpleTable  from "@/components/Ui/Table/SimpleTable.vue";
import AddEditForm  from "@/views/System/Settings/Finances/AddEditForm.vue";
import TableActions from "@/components/Ui/Actions/TableActions.vue";

import {FinancesCurrenciesState} from "@/scripts/Vue/Store/Module/System/Settings/FinancesCurrenciesState";

import SymfonySystemRoutes from "@/router/SymfonyRoutes/Modules/SymfonySystemRoutes";

export default {
  data(): ComponentData {
    return {
      store: null as null | FinancesCurrenciesState,
      allCurrencies: [],
      table: {
        /**
         * @description dummy data for now
         */
        headers: [
          {
            label: this.$t('systemSettings.tab.finances.currencies.table.headers.name.label'),
            dataValuePath : 'name.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('systemSettings.tab.finances.currencies.table.headers.symbol.label'),
            dataValuePath : 'symbol.value',
            dataIsComponentPath : 'symbol.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('systemSettings.tab.finances.currencies.table.headers.multiplier.label'),
            dataValuePath : 'multiplier.value',
            dataIsComponentPath : 'multiplier.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('systemSettings.tab.finances.currencies.table.headers.isDefault.label'),
            dataValuePath : 'isDefault.value',
            dataIsComponentPath : 'isDefault.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('systemSettings.tab.finances.currencies.table.headers.actions.label'),
            dataValuePath : 'actions.value',
            dataIsComponentPath : 'actions.isComponent',
            dataComponentPropertiesPath: 'actions.componentProps'
          },
        ],
      }
    }
  },
  components: {
    SimpleTable,
    AddEditForm,
  },
  computed: {
    /**
     * @description returns the rows data for table
     */
    usedTableData(): Array {
      let data = [];
      for (let currency of this.allCurrencies) {
        data.push({
          values: {
            name: {
              value: currency.name,
              isComponent: false,
            },
            multiplier: {
              value: currency.multiplier,
              isComponent: false,
            },
            symbol: {
              value: currency.symbol,
              isComponent: false,
            },
            isDefault: {
              value       : this.$t(`generic.bool.yesNo.${Number(currency.isDefault)}`),
              rawValue    : currency.isDefault,
              isComponent : false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                identifierFieldName: 'name',
                baseUrl: SymfonySystemRoutes.SETTINGS_FINANCES_BASE_URL,
                store: FinancesCurrenciesState,
              }
            }
          }
        })
      }

      return data;
    }
  },
  methods: {
    /**
     * @description fetches data from db and updates the page state
     */
    async refreshPageState(): Promise<void> {
      await this.store.getAll();
      this.allCurrencies = this.store.allEntries;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = FinancesCurrenciesState();
    this.refreshPageState();
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function(): void {
        this.allCurrencies = this.store.allEntries;
      }
    }
  }
}
</script>
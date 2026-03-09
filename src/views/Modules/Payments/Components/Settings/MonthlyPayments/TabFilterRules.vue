<template>
  <div>
    <SimpleTable :headers="headers"
                 :data="usedTableData"
                 ref="table"
                 class="mt-4"
                 v-if="usedTableData.length > 0"
    />
    <NoResultsText v-else />
  </div>

  <hr class="mt-5 mb-5" />

  <AddEditForm :header="$t('payments.settings.tab.monthlyImport.tab.filterRule.form.header.add')"
               @submit="refreshPageState"
  />

</template>

<script lang="ts">


import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";
import TableActions  from "@/components/Ui/Actions/TableActions.vue";
import AddEditForm   from "@/views/Modules/Payments/Components/Settings/MonthlyPayments/TabFilterRules/AddEditForm.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

import {MonthlyImportFilterRulesStore} from "@/scripts/Vue/Store/Module/Payments/Settings/MonthlyImportFilterRulesStore";

export default {
  data(): ComponentData {
    return {
      store: null as null | MonthlyImportFilterRulesStore,
      allRules: [],
      headers: [
        {
          label: 'id',
          dataValuePath : 'id.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.filterRule.table.header.fieldName.label'),
          dataValuePath : 'fieldName.value',
          dataIsComponentPath : 'fieldName.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.filterRule.table.header.rule.label'),
          dataValuePath : 'rule.value',
          dataIsComponentPath : 'rule.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.filterRule.table.header.ruleType.label'),
          dataValuePath : 'typeLabel.value',
          dataIsComponentPath : 'typeLabel.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: '',
          isVisible: false,
          dataValuePath : 'typeValue.value',
          dataIsComponentPath : 'typeValue.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.filterRule.table.header.actions.label'),
          dataValuePath : 'actions.value',
          dataIsComponentPath : 'actions.isComponent',
          dataComponentPropertiesPath: 'actions.componentProps'
        },
      ]
    }
  },
  components: {
    AddEditForm,
    NoResultsText,
    SimpleTable
  },
  computed: {
    /**
     * @description returns the rows data for table
     */
    usedTableData(): Array {
      let data = [];
      for (let ruleData of this.allRules) {
        data.push({
          values: {
            id: {
              value: ruleData.id,
              isComponent : false,
            },
            fieldName: {
              value: ruleData.fieldName,
              isComponent: false,
            },
            rule: {
              value: ruleData.rule,
              isComponent: false,
            },
            typeLabel: {
              value: this.$t(`payments.settings.tab.monthlyImport.tab.filterRule.form.element.ruleType.option.${ruleData.type}.label`),
              isComponent: false,
            },
            typeValue: {
              value: ruleData.type,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyPaymentsRoutes.SETTINGS_PAYMENT_MONTHLY_IMPORT_FILTER_RULES,
                store: MonthlyImportFilterRulesStore,
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
      this.allRules = this.store.allEntries;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = MonthlyImportFilterRulesStore();
    this.refreshPageState();
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function(): void {
        this.allRules = this.store.allEntries;
      }
    }
  }
}
</script>

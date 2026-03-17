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

  <AddEditForm :header="$t('payments.settings.tab.monthlyImport.tab.profile.form.header.add')"
               @submit="refreshPageState"
  />

</template>

<script lang="ts">


import SimpleTable    from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText  from "@/components/Page/NoResultsText.vue";
import TableActions   from "@/components/Ui/Actions/TableActions.vue";
import AddEditForm    from "@/views/Modules/Payments/Components/Settings/MonthlyPayments/TabProfiles/AddEditForm.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

import {MonthlyImportProfilesStore} from "@/scripts/Vue/Store/Module/Payments/Settings/MonthlyImportProfilesStore";

export default {
  data(): ComponentData {
    return {
      store: null as null | MonthlyImportProfilesStore,
      allProfiles: [],
      headers: [
        {
          label: 'id',
          dataValuePath : 'id.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.profile.table.header.name.label'),
          dataValuePath : 'name.value',
          dataIsComponentPath : 'name.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.profile.table.header.currencyField.label'),
          dataValuePath : 'currencyField.value',
          dataIsComponentPath : 'currencyField.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.profile.table.header.descriptionField.label'),
          dataValuePath : 'descriptionField.value',
          dataIsComponentPath : 'descriptionField.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.profile.table.header.moneyField.label'),
          dataValuePath : 'moneyField.value',
          dataIsComponentPath : 'moneyField.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.profile.table.header.dateField.label'),
          dataValuePath : 'dateField.value',
          dataIsComponentPath : 'dateField.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.monthlyImport.tab.profile.table.header.actions.label'),
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
      for (let profileData of this.allProfiles) {
        data.push({
          values: {
            id: {
              value: profileData.id,
              isComponent : false,
            },
            name: {
              value: profileData.name,
              isComponent: false,
            },
            currencyField: {
              value: profileData.currencyField,
              isComponent: false,
            },
            descriptionField: {
              value: profileData.descriptionField,
              isComponent: false,
            },
            moneyField: {
              value: profileData.moneyField,
              isComponent: false,
            },
            dateField: {
              value: profileData.dateField,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyPaymentsRoutes.SETTINGS_PAYMENT_MONTHLY_IMPORT_PROFILES,
                store: MonthlyImportProfilesStore,
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
      this.allProfiles = this.store.allEntries;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = MonthlyImportProfilesStore();
    this.refreshPageState();
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function(): void {
        this.allProfiles = this.store.allEntries;
      }
    }
  }
}
</script>

<template>
  <div>
    <SimpleTable :headers="headers"
                 :data="usedTableData"
                 ref="table"
                 class="mt-4"
                 v-if="data.length > 0"
    />
    <NoResultsText v-else />
  </div>

  <hr class="mt-5 mb-5" />

  <AddEditForm :header="$t('payments.settings.tab.paymentTypes.table.newForm.header')"
               @submit="refreshPageState"
  />

</template>

<script lang="ts">


import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";
import TableActions  from "@/components/Ui/Actions/TableActions.vue";
import AddEditForm   from "@/views/Modules/Payments/Components/Settings/PaymentTypes/AddEditForm.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

import {PaymentTypesState} from "@/scripts/Vue/Store/Module/Payments/Settings/PaymentTypesState";

export default {
  data(): ComponentData {
    return {
      store: null as null | PaymentTypesState,
      allTypes: [],
      headers: [
        {
          label: 'id',
          dataValuePath : 'id.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.paymentTypes.table.header.name'),
          dataValuePath : 'name.value',
          dataIsComponentPath : 'name.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.paymentTypes.table.header.actions'),
          dataValuePath : 'actions.value',
          dataIsComponentPath : 'actions.isComponent',
          dataComponentPropertiesPath: 'actions.componentProps'
        },
      ]
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
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
      for (let type of this.allTypes) {
        data.push({
          values: {
            id: {
              value: type.id,
              isComponent : false,
            },
            name: {
              value: type.name,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyPaymentsRoutes.SETTINGS_PAYMENT_TYPE_BASE_URL,
                store: PaymentTypesState,
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
      this.allTypes = this.store.allEntries;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = PaymentTypesState();
    this.refreshPageState();
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function(): void {
        this.allTypes = this.store.allEntries;
      }
    }
  }
}
</script>

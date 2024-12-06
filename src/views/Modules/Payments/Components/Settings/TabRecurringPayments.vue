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

  <AddEditForm :header="$t('payments.settings.tab.recurringPayments.table.newForm.header')"
               @submit="refreshPageState"
  />

</template>

<script lang="ts">

import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";
import AddEditForm   from "@/views/Modules/Payments/Components/Settings/RecurringPayments/AddEditForm.vue";
import TableActions  from "@/components/Ui/Actions/TableActions.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

import {RecurringPaymentState} from "@/scripts/Vue/Store/Module/Payments/Settings/RecurringPaymentState";

export default {
  data(): ComponentData {
    return {
      store: null as null | RecurringPaymentState,
      allPayments: [],
      headers: [
        {
          label: 'id',
          dataValuePath : 'id.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: 'typeId',
          dataValuePath : 'typeId.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.recurringPayments.table.header.dayOfMonth'),
          dataValuePath : 'dayOfMonth.value',
          dataIsComponentPath : 'dayOfMonth.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.recurringPayments.table.header.money'),
          dataValuePath : 'amount.value',
          dataIsComponentPath : 'amount.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.recurringPayments.table.header.description'),
          dataValuePath : 'description.value',
          dataIsComponentPath : 'description.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.recurringPayments.table.header.type'),
          dataValuePath : 'type.value',
          dataIsComponentPath : 'type.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.recurringPayments.table.header.actions'),
          dataValuePath : 'actions.value',
          dataIsComponentPath : 'actions.isComponent',
          dataComponentPropertiesPath: 'actions.componentProps'
        }
      ]
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    paymentTypesData: {
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
      for (let payment of this.allPayments) {
        data.push({
          values: {
            id: {
              value: payment.id,
              isComponent : false,
            },
            typeId: {
              value: payment.typeId,
              isComponent: false,
            },
            dayOfMonth: {
              value: payment.dayOfMonth,
              isComponent: false,
            },
            amount: {
              value: payment.amount,
              isComponent: false,
            },
            description: {
              value: payment.description,
              isComponent: false,
            },
            type: {
              value: payment.typeName,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyPaymentsRoutes.SETTINGS_RECURRING_PAYMENT_BASE_URL,
                store: RecurringPaymentState,
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
      this.allPayments = this.store.allEntries;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = RecurringPaymentState();
    this.refreshPageState();
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function(): void {
        this.allPayments = this.store.allEntries;
      }
    }
  },
}
</script>

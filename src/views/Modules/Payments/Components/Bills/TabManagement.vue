<template>
  <div v-if="tableData.length > 0"
       class="mt-10"
  >
    <BillsTable :data="tableData" />
  </div>

  <NoResultsText v-else />

  <hr class="mt-10 mb-5"/>

  <!-- form -->
  <AddEditForm :header="$t('payments.bills.management.newForm.header')"
               @submit="refreshPageState"
  />

</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import NoResultsText from "@/components/Page/NoResultsText.vue";

import AddEditForm  from "@/views/Modules/Payments/Components/Bills/AddEditForm.vue";
import BillsTable   from "@/views/Modules/Payments/Components/Bills/BillsTable.vue";
import TableActions from "@/components/Ui/Actions/TableActions.vue";

import {BillsState} from "@/scripts/Vue/Store/Module/Payments/Bills/BillsState";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

export default {
  data(): ComponentData {
    return {
      store: null as null | BillsState,
    }
  },
  props: {
    data: {
      type: Array,
      require: true,
    }
  },
  components: {
    NoResultsText,
    BillsTable,
    AddEditForm
  },
  computed: {
    /**
     * @description returns array with structure used by bills table
     */
    tableData(): Array {
      let data = [];
      for (let bill of this.data) {
        data.push({
          values: {
            id: {
              value: bill.id,
              isComponent: false,
            },
            startDate: {
              value: bill.startDate,
              isComponent: false,
            },
            endDate: {
              value: bill.endDate,
              isComponent: false,
            },
            name: {
              value: bill.name,
              isComponent: false,
            },
            information: {
              value: bill.information,
              isComponent: false,
            },
            plannedAmount: {
              value: bill.plannedAmount,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps: {
                editActionForm: AddEditForm,
                baseUrl: SymfonyPaymentsRoutes.BILLS_BASE_URL,
                store: BillsState,
              }
            }
          }
        })
      }

      return data;
    },
  },
  methods: {
    /**
     * @description fetches data from db and updates the page state
     */
    async refreshPageState(): Promise<void> {
      await this.store.getAll();
    }
  },
  async beforeMount(): Promise<void> {
    this.store = BillsState();
    this.refreshPageState();
  }
}
</script>
<template>
  <Base :info-block-description="$t('payments.incomes.description')"
        :is-in-container="false"
  >
    <IncomesTable :data="usedTableData"
                  class="mb-6"
    />
    <AddEditForm @submit="refreshPageState" />
  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import AddEditForm  from "@/views/Modules/Payments/Components/Incomes/AddEditForm.vue";
import IncomesTable from "@/views/Modules/Payments/Components/Incomes/IncomesTable.vue";
import Base         from "@/views/Modules/Base.vue";
import TableActions from "@/components/Ui/Actions/TableActions.vue";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

import {IncomeState} from "@/scripts/Vue/Store/Module/Payments/Income/IncomeState";

export default {
  data(): ComponentData {
    return {
      store: null as null | IncomeState,
      allIncomes: [],
    }
  },
  components: {
    Base,
    AddEditForm,
    IncomesTable,
  },
  computed: {
    /**
     * @description returns the rows data for table
     */
    usedTableData(): Array {
      let data = [];
      for (let income of this.allIncomes) {
        data.push({
          values: {
            id: {
              value: income.id,
              isComponent : false,
            },
            information: {
              value: income.information,
              isComponent: false,
            },
            currency: {
              value: income.currency,
              isComponent: false,
            },
            date: {
              value: income.date,
              isComponent: false,
            },
            amount: {
              value: income.amount,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyPaymentsRoutes.INCOMES_BASE_URL,
                store: IncomeState,
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
      this.allIncomes = this.store.allEntries;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = IncomeState();
    this.refreshPageState();
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function(): void {
        this.allIncomes = this.store.allEntries;
      }
    }
  }
}
</script>
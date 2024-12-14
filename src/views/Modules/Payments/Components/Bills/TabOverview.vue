<template>
  <div v-if="data.length > 0"
       class="mt-10"
  >
    <Accordion v-for="bill in data"
               :key="JSON.stringify(bill)"
    >
      <AccordionPanel class="accordion-panel" :initially-open="false">
        <template #title>
          <div class="flex flex-wrap justify-start flex-row">
            <BillMarker :planned="bill.plannedAmount"
                        :spend="getSpentAmount(bill.elements)"
                        class="mt-1"
            />
            <span>{{ bill.name }} - {{ getSpentAmount(bill.elements) }} / {{ bill.plannedAmount }} ({{ bill.startDate }} - {{ bill.endDate }})</span>
          </div>
        </template>
        <template #content>
          <BillElementsTable :data="getBillTableData(bill.elements, bill.id)"
                             class="mb-5"
          />
        </template>
      </AccordionPanel>
    </Accordion>
  </div>

  <NoResultsText v-else />


  <hr class="mt-10 mb-5"/>

  <!-- form -->
  <AddEditForm :header="$t('payments.bills.overview.newForm.header')"
               @submit="refreshPageState"
  />

</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import AddEditForm       from "@/views/Modules/Payments/Components/Bills/Items/AddEditForm.vue";
import AccordionPanel    from "@/components/Ui/Accordion/Panel.vue";
import Accordion         from "@/components/Ui/Accordion/Accordion.vue";
import NoResultsText     from "@/components/Page/NoResultsText.vue";
import BillElementsTable from "@/views/Modules/Payments/Components/Bills/BillElementsTable.vue";
import BillMarker        from "@/views/Modules/Payments/Components/Bills/BillMarker.vue";
import TableActions      from "@/components/Ui/Actions/TableActions.vue";

import {BillsState} from "@/scripts/Vue/Store/Module/Payments/Bills/BillsState";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

export default {
  data(): ComponentData {
    return {
      allBills: [],
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
    AddEditForm,
    NoResultsText,
    Accordion,
    AccordionPanel,
    BillElementsTable,
    BillMarker,
  },
  methods: {
    /**
     * @description returns array with structure used by bills table
     */
    getBillTableData(elements: Array, billId: number): Array {
      let data = [];
      for (let element of elements) {
        data.push({
          values: {
            id: {
              value: element.id,
              isComponent : false,
            },
            billId: {
              value: billId,
              isComponent : false,
            },
            amount: {
              value: element.amount,
              isComponent: false,
            },
            date: {
              value: element.date,
              isComponent: false,
            },
            name: {
              value: element.name,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps: {
                editActionForm: AddEditForm,
                baseUrl: SymfonyPaymentsRoutes.BILLS_ITEMS_BASE_URL,
                store: BillsState,
              }
            }
          }
        })
      }

      return data;
    },
    /**
     * @description returns the summary amount for all elements in bill
     */
    getSpentAmount(elements: Array): number {
      let amount = 0;
      for (let element of elements) {
        amount += element.amount;
      }

      return amount;
    },
    /**
     * @description fetches data from db and updates the page state
     */
    async refreshPageState(): Promise<void> {
      await this.store.getAll();
      this.allBills = this.store.allEntries;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = BillsState();
    this.refreshPageState();
  }
}
</script>
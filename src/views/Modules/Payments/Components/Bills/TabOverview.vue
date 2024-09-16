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
          <BillElementsTable :data="getBillTableData(bill.elements)"
                             class="mb-5"
          />
        </template>
      </AccordionPanel>
    </Accordion>
  </div>

  <NoResultsText v-else />


  <hr class="mt-10 mb-5"/>

  <!-- form -->
  <div class="flex justify-center mt-10">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ $t('payments.bills.overview.newForm.header') }}</h2>

      <FormInput type="text"
                 v-model="form.name"
                 :label="$t('payments.bills.overview.newForm.name.label')"
      />

      <FormInput type="number"
                 v-model="form.amount"
                 :label="$t('payments.bills.overview.newForm.amount.label')"
      />

      <FormInput type="date"
                 v-model="form.date"
                 :label="$t('payments.bills.overview.newForm.date.label')"
      />

      <BillSelect :bills="data" />

      <MediumButtonWithIcon :text="$t('payments.bills.overview.newForm.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onNewSubmit"
      />

    </div>
  </div>

</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import AccordionPanel    from "@/components/Ui/Accordion/Panel.vue";
import Accordion         from "@/components/Ui/Accordion/Accordion.vue";
import NoResultsText     from "@/components/Page/NoResultsText.vue";
import BillElementsTable from "@/views/Modules/Payments/Components/Bills/BillElementsTable.vue";
import BillMarker        from "@/views/Modules/Payments/Components/Bills/BillMarker.vue";
import BillSelect        from "@/views/Modules/Payments/Components/Bills/BillSelect.vue";

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        date: null,
        name: null,
        bill: null,
        amount: null,
      }
    }
  },
  props: {
    data: {
      type: Array,
      require: true,
    }
  },
  components: {
    FormInput,
    MediumButtonWithIcon,
    NoResultsText,
    Accordion,
    AccordionPanel,
    BillElementsTable,
    BillMarker,
    BillSelect
  },
  methods: {
    /**
     * @description returns array with structure used by bills table
     */
    getBillTableData(elements: Array): Array {
      let data = [];
      for (let element of elements) {
        let rowValues = {};
        for (let key of Object.keys(element)) {
          rowValues[key] = {
            value: element[key],
            isComponent: false,
          };
        }

        data.push({
          values: rowValues
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
     * @description handle user submitting the "new entry form"
     */
    onNewSubmit(): void {
      // todo
    }
  }
}
</script>
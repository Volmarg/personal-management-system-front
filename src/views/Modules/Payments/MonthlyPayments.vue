<template>
  <Base :info-block-description="$t('payments.monthly.description')"
        :is-in-container="false"
  >
    <Navbar :data="dataPerYearsAndMonths"
            :preselected-year="selectedYear"
            @year-filter-change="selectedYear = $event"
            class="mb-6"
    />

    <Accordion v-for="(data, yearMonth) in accordionsData"
               :key="yearMonth"
    >
      <AccordionPanel class="accordion-panel">
        <template #title>{{ yearMonth }} ({{paymentTotal(yearMonth)}})</template>
        <template #content>
          <Container class="mb-6">
            <PaymentsTable :data="data" />
            <div class="mt-4 flex justify-center">
              <ul>
                <li v-for="(money, name) in paymentSummaryData(yearMonth)"
                    :key="name"
                    class="text-lg text-right"
                >
                  <hr v-if="name === $t('payments.monthly.text.summary')"
                      class="mt-2"
                  >
                  <span class="font-bold">{{ name }}: </span>
                  <span>{{ money }}</span>
                </li>
              </ul>
            </div>
          </Container>
        </template>
      </AccordionPanel>
    </Accordion>

    <AddEditForm @submit="refreshPageState" />

  </Base>
</template>

<script lang="ts">
import Container      from "@/components/Ui/Containers/Container.vue";
import Base           from "@/views/Modules/Base.vue";
import Navbar         from "@/views/Modules/Payments/Components/MonthlyPayments/Navbar.vue";
import PaymentsTable  from "@/views/Modules/Payments/Components/MonthlyPayments/PaymentsTable.vue";
import AccordionPanel from "@/components/Ui/Accordion/Panel.vue";
import Accordion      from "@/components/Ui/Accordion/Accordion.vue";
import AddEditForm    from "@/views/Modules/Payments/Components/MonthlyPayments/AddEditForm.vue";
import TableActions   from "@/components/Ui/Actions/TableActions.vue";

import {PaymentsState}       from "@/scripts/Vue/Store/Module/Payments/Monthly/PaymentsState";
import {ComponentData}       from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition}     from "pinia";

import StringTypeProcessor   from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

export default {
  data(): ComponentData {
    return {
      form: {
        date: null,
        money: null,
        description: null,
        type: null,
      },
      selectedYear: null,
      store: null as null | StoreDefinition,
      allPayments: [] as Array,
    }
  },
  components: {
    Accordion,
    AccordionPanel,
    Base,
    Navbar,
    PaymentsTable,
    Container,
    AddEditForm,
  },
  computed: {
    /**
     * @description transforms backend data into front friendly data
     */
    paymentsData(): Array {
      let data = [];
      for (let product of this.allPayments) {
        data.push({
          values : {
            id : {
              value       : product.id,
              isComponent : false,
            },
            date : {
              value       : product.date,
              isComponent : false,
            },
            money : {
              value       : product.money,
              isComponent : false,
            },
            description : {
              value       : product.description,
              isComponent : false,
            },
            typeName : {
              value       : product.typeName,
              isComponent : false,
            },
            typeId: {
              value       : product.typeId,
              isComponent : false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyPaymentsRoutes.MONTHLY_BASE_URL,
                store: PaymentsState,
              }
            }
          },
        })
      }

      return data;
    },
    /**
     * @description returns data for accordions, based on the selected year
     */
    accordionsData(): Record<string, Record<string, unknown>> {
      if (!this.selectedYear) {
        let allEntries = {};
        for (let year in this.dataPerYearsAndMonths) {
          allEntries = {
            ...allEntries,
            ...this.dataPerYearsAndMonths[year],
          }
        }

        return allEntries;
      }

      return this.dataPerYearsAndMonths[this.selectedYear];
    },
    /**
     * @description returns data grouped by year and year-month
     */
    dataPerYearsAndMonths(): Record<string, Record<string, Record<string, unknown>>> {
      let data = {};
      for (let dataSet of this.paymentsData) {
        let year      = dataSet.values.date.value.match(/[0-9]{4}/);
        let yearMonth = dataSet.values.date.value.match(/[0-9]{4}-[0-9]{2}/);

        if (!data[year]) {
          data[year] = {};
        }

        if (!data[year][yearMonth]) {
          data[year][yearMonth] = [];
        }

        data[year][yearMonth].push(dataSet)
      }

      return data;
    }
  },
  methods: {
    /**
     * @description returns payments grouped by types
     */
    paymentSummaryData(yearMonth: string): Record<string, number> {
      let data = {};
      let summaryCost = 0;

      let year = yearMonth.match(/[0-9]{4}/);
      for (let yearMonthData of this.dataPerYearsAndMonths[year][yearMonth]) {
        let type = StringTypeProcessor.ucFirst(yearMonthData.values.typeName.value);
        if (!data[type]) {
          data[type] = 0;
        }

        data[type] += yearMonthData.values.money.value
        summaryCost += yearMonthData.values.money.value
      }

      data[this.$t('payments.monthly.text.summary')] = summaryCost;

      // need to format the values, because JS result of adding 0.1 + 0.2 is 0.300000000003
      for (let type in data) {
        let value = data[type];
        data[type] = value.toFixed(2);
      }

      return data;
    },
    /**
     * @description returns summary of all payments for given yearm and month
     */
    paymentTotal(yearMonth: string): number {
      let summaryCost = 0;

      let year = yearMonth.match(/[0-9]{4}/);
      for (let yearMonthData of this.dataPerYearsAndMonths[year][yearMonth]) {
        summaryCost += yearMonthData.values.money.value
      }

      return summaryCost.toFixed(2);
    },
    /**
     * @description updates page state by pulling db state and rebuilding front
     */
    async refreshPageState(): Promise<void> {
      await this.store.getAll();
      this.allPayments = this.store.allEntries;
      this.selectedYear = Math.max(...Object.keys(this.dataPerYearsAndMonths).sort());
    }
  },
  async beforeMount(): Promise<void> {
    this.store = PaymentsState();
    await this.refreshPageState();
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function () {
        this.allPayments = this.store.allEntries;
        this.selectedYear = Math.max(...Object.keys(this.dataPerYearsAndMonths).sort());
      }
    }
  }
}
</script>
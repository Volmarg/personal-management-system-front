<template>
  <Base :info-block-description="$t('payments.monthly.description')"
        :is-in-container="false"
  >
    <Navbar :data="dataPerYearsAndMonths"
            @year-filter-click="selectedYear = $event"
            class="mb-6"
    />

    <Accordion v-for="(data, yearMonth) in dataForYear"
               :key="JSON.stringify(data)"
    >
      <AccordionPanel class="accordion-panel">
        <template #title>{{ yearMonth }}</template>
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

    <NewEntryForm @date-change="form.date = $event"
                  @money-change="form.money = $event"
                  @description-change="form.description = $event"
                  @type-change="form.type = $event"
                  :types="allTypes"
    />

  </Base>
</template>

<script lang="ts">
import Container      from "@/components/Ui/Containers/Container.vue";
import Base           from "@/views/Modules/Base.vue";
import Navbar         from "@/views/Modules/Payments/Components/MonthlyPayments/Navbar.vue";
import PaymentsTable  from "@/views/Modules/Payments/Components/MonthlyPayments/PaymentsTable.vue";
import AccordionPanel from "@/components/Ui/Accordion/Panel.vue";
import Accordion      from "@/components/Ui/Accordion/Accordion.vue";
import NewEntryForm   from "@/views/Modules/Payments/Components/MonthlyPayments/NewEntry.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

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
      paymentsData: [
        {
          values : {
            date : {
              value       : "2024-10-03",
              isComponent : false,
            },
            money : {
              value       : 134,
              isComponent : false,
            },
            description : {
              value       : "Lidl food",
              isComponent : false,
            },
            type : {
              value       : "food",
              isComponent : false,
            },
          }
        },
        {
          values : {
            date : {
              value       : "2024-10-08",
              isComponent : false,
            },
            money : {
              value       : 22.14,
              isComponent : false,
            },
            description : {
              value       : "Book",
              isComponent : false,
            },
            type : {
              value       : "private",
              isComponent : false,
            },
          }
        },
        {
          values : {
            date : {
              value       : "2024-10-10",
              isComponent : false,
            },
            money : {
              value       : 63,
              isComponent : false,
            },
            description : {
              value       : "More food",
              isComponent : false,
            },
            type : {
              value       : "food",
              isComponent : false,
            },
          }
        },
        {
          values : {
            date : {
              value       : "2024-11-10",
              isComponent : false,
            },
            money : {
              value       : 99,
              isComponent : false,
            },
            description : {
              value       : "Headache pills",
              isComponent : false,
            },
            type : {
              value       : "meds",
              isComponent : false,
            },
          }
        },
        {
          values : {
            date : {
              value       : "2025-01-01",
              isComponent : false,
            },
            money : {
              value       : 11,
              isComponent : false,
            },
            description : {
              value       : "Game",
              isComponent : false,
            },
            type : {
              value       : "private",
              isComponent : false,
            },
          }
        },
      ],
      tableData: [
        {
          values : {
            date : {
              value       : "2024-10-03",
              isComponent : false,
            },
            money : {
              value       : 134,
              isComponent : false,
            },
            description : {
              value       : "Lidl food",
              isComponent : false,
            },
            type : {
              value       : "food",
              isComponent : false,
            },
          }
        },
        {
          values : {
            date : {
              value       : "2024-10-10",
              isComponent : false,
            },
            money : {
              value       : 63,
              isComponent : false,
            },
            description : {
              value       : "More food",
              isComponent : false,
            },
            type : {
              value       : "food",
              isComponent : false,
            },
          }
        },
        {
          values : {
            date : {
              value       : "2024-11-10",
              isComponent : false,
            },
            money : {
              value       : 99,
              isComponent : false,
            },
            description : {
              value       : "Headache pills",
              isComponent : false,
            },
            type : {
              value       : "meds",
              isComponent : false,
            },
          }
        },
        {
          values : {
            date : {
              value       : "2025-01-01",
              isComponent : false,
            },
            money : {
              value       : 11,
              isComponent : false,
            },
            description : {
              value       : "Game",
              isComponent : false,
            },
            type : {
              value       : "private",
              isComponent : false,
            },
          }
        },
      ]
    }
  },
  components: {
    Accordion,
    AccordionPanel,
    Base,
    Navbar,
    PaymentsTable,
    Container,
    NewEntryForm,
  },
  computed: {
    /**
     * @description returns data for selected year
     */
    allTypes(): Array<string> {
      let data = [];
      for (let dataSet of this.paymentsData) {
        data.push(dataSet.values.type.value);
      }

      return data;
    },
    /**
     * @description returns data for selected year
     */
    dataForYear(): Record<string, Record<string, unknown>> {
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
        let type = StringTypeProcessor.ucFirst(yearMonthData.values.type.value);
        if (!data[type]) {
          data[type] = 0;
        }

        data[type] += yearMonthData.values.money.value
        summaryCost += yearMonthData.values.money.value
      }

      data[this.$t('payments.monthly.text.summary')] = summaryCost;

      return data;
    }
  },
  mounted(): void {
    this.selectedYear = Math.max(...Object.keys(this.dataPerYearsAndMonths).sort());
  }
}
</script>
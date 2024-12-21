<template>
  <Base :info-block-description="$t('reports.historical.moneyOwed.description')">
    <Tabs :tabs-with-content="buildTabsContent()" />
  </Base>
</template>

<script lang="ts">
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";
import Base from "@/views/Modules/Base.vue";

import TabByMe     from "@/views/Modules/Reports/Historical/MoneyOwed/TabByMe.vue";
import TabByOthers from "@/views/Modules/Reports/Historical/MoneyOwed/TabByOthers.vue";

import {ComponentData}      from "@/scripts/Vue/Types/Components/types";
import SymfonyReportsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyReportsRoutes";

export default {
  data(): ComponentData {
    return {
      owedEntries: [],
    }
  },
  components: {
    Base,
    Tabs
  },
  computed: {
    /**
     * @description returns entries owed by me
     */
    owedByMe(): Array {
      let filteredEntries = this.owedEntries.filter((entry: Record) => entry.owedByMe);
      return this.buildTableData(filteredEntries);
    },
    /**
     * @description returns entries owed by other
     */
    owedByOther(): Array {
      let filteredEntries = this.owedEntries.filter((entry: Record) => !entry.owedByMe);
      return this.buildTableData(filteredEntries);
    }
  },
  methods: {
    /**
     * @description turns the owed entries data into table friendly data
     */
    buildTableData(owedEntries: Array<Record>): Array<Record> {
      let data = [];
      for (let owedEntry of owedEntries) {
        data.push({
          values : {
            target : {
              value       : owedEntry.target,
              isComponent : false,
            },
            amount : {
              value       : owedEntry.amount,
              isComponent : false,
            },
            information : {
              value       : owedEntry.information,
              isComponent : false,
            },
            date : {
              value       : owedEntry.date,
              isComponent : false,
            },
            currency : {
              value       : owedEntry.currency,
              isComponent : false,
            }
          }
        });
      }

      return data;
    },
    buildTabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName: this.$t('reports.historical.moneyOwed.tabs.owedByMe.label'),
          tabComponent: TabByMe,
          tabComponentProps: {
            tableData: this.owedByMe
          }
        },
        {
          tabName: this.$t('reports.historical.moneyOwed.tabs.owedByOthers.label'),
          tabComponent: TabByOthers,
          tabComponentProps: {
            tableData: this.owedByOther
          }
        }
      ];
    },
  },
  async beforeMount(): Promise<void> {
    this.owedEntries = await this.$moduleCall.getAll(SymfonyReportsRoutes.HISTORICALLY_OWED_MONEY_BASE_URL)
  }
}
</script>

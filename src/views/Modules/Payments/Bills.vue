<template>
  <Base :info-block-description="$t('calendar.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent" />
  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Base from "@/views/Modules/Base.vue";
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";

import TabOverview   from "@/views/Modules/Payments/Components/Bills/TabOverview.vue";
import TabManagement from "@/views/Modules/Payments/Components/Bills/TabManagement.vue";
import TabLegend     from "@/views/Modules/Payments/Components/Bills/TabLegend.vue";

export default {
  data(): ComponentData {
    return {
      billsData: [
        {
          id: 1,
          name: "Concert",
          startDate: "2019-08-03",
          endDate: "2019-08-08",
          information: "Woodstock 2019",
          plannedAmount: 1500,
          elements: [
            {
              amount: 130,
              name: "Cookies",
              date: "2019-08-05"
            },
            {
              amount: 800,
              name: "Beer",
              date: "2019-08-04"
            }
          ]
        },
        {
          id: 2,
          name: "Friends meeting",
          startDate: "2022-02-10",
          endDate: "2022-02-10",
          information: "Meeting with friends",
          plannedAmount: 100,
          elements: [
            {
              amount: 221.25,
              name: "Food",
              date: "2022-02-10"
            },
          ]
        }
      ]
    }
  },
  components: {
    Tabs,
    Base
  },
  computed: {
    /**
     * @description builds the switchable tabs content
     */
    tabsContent(): Array {
      return [
        {
          tabName: this.$t('payments.bills.tab.overview.label'),
          tabComponent: TabOverview,
          tabComponentProps: {
            data: this.billsData
          }
        },
        {
          tabName: this.$t('payments.bills.tab.management.label'),
          tabComponent: TabManagement,
          tabComponentProps: {
            data: this.billsData
          }
        },
        {
          tabName: this.$t('payments.bills.tab.legend.label'),
          tabComponent: TabLegend,
        },
      ];
    }
  }
}
</script>
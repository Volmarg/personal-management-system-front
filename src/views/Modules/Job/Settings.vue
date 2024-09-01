<template>
  <Base :info-block-description="$t('reports.historical.paymentsSummaries.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent" />
  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Base from "@/views/Modules/Base.vue";
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";

import TabHolidaysPool from "@/views/Modules/Job/Settings/TabHolidaysPool.vue";

export default {
  data(): ComponentData {
    return {
      poolsTableData: [
        {
          values: {
            year: {
              value: "1985",
              isComponent: false,
            },
            days: {
              value: "22",
              isComponent: false,
            },
            companyName: {
              value: "Cookiez & Brownies",
              isComponent: false,
            },
          }
        },
        {
          values: {
            year: {
              value: "2025",
              isComponent: false,
            },
            days: {
              value: "30",
              isComponent: false,
            },
            companyName: {
              value: "Water Jet",
              isComponent: false,
            },
          }
        },
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
          tabName: this.$t('job.settings.tabs.managePool.label'),
          tabComponent: TabHolidaysPool,
          tabComponentProps: {
            tableData: this.poolsTableData,
          }
        },
      ];
    }
  }
}
</script>
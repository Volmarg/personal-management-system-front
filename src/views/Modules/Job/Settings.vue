<template>
  <Base :info-block-description="$t('reports.historical.paymentsSummaries.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent" />
  </Base>
</template>

<script lang="ts">
import Base from "@/views/Modules/Base.vue";
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";

import TabHolidaysPool from "@/views/Modules/Job/Settings/TabHolidaysPool.vue";

export default {
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
        },
      ];
    }
  }
}
</script>
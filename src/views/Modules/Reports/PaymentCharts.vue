<template>
  <Base :info-block-description="$t('contacts.settings.description')">
    <Tabs :tabs-with-content="buildTabsContent()" />
  </Base>
</template>

<script lang="ts">
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";
import Base from "@/views/Modules/Base.vue";

import TabTotal            from "@/views/Modules/Reports/PaymentSummaries/TabTotal.vue";
import TabByType           from "@/views/Modules/Reports/PaymentSummaries/TabByType.vue";
import TabPercentageByType from "@/views/Modules/Reports/PaymentSummaries/TabPercentageByType.vue";

export default {
  components: {
    Base,
    Tabs
  },
  methods: {
    buildTabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName: this.$t('reports.paymentCharts.tabs.totalEachMonth.label'),
          tabComponent: TabTotal,
          tabComponentProps: {}
        },
        {
          tabName: this.$t('reports.paymentCharts.tabs.byTypeEachMonth.label'),
          tabComponent: TabByType,
          tabComponentProps: {}
        },
        {
          tabName: this.$t('reports.paymentCharts.tabs.percentageByType.label'),
          tabComponent: TabPercentageByType,
          tabComponentProps: {}
        }
      ];
    },
  }
}
</script>

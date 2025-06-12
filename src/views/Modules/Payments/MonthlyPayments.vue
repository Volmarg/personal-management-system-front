<template>
  <Base :info-block-description="$t('payments.monthly.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent"
          :no-background="true"
    />
  </Base>
</template>

<script lang="ts">
import Base from "@/views/Modules/Base.vue";
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";

import TabOverview from "@/views/Modules/Payments/MonthlyPayments/TabOverview.vue";

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
          tabName: this.$t('payments.monthly.tabs.overview.label'),
          tabComponent: TabOverview,
        }
      ];
    }
  }
}
</script>
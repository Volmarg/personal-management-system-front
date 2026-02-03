<template>
  <Base :info-block-description="$t('payments.settings.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent" />
  </Base>
</template>

<script lang="ts">
import Base from "@/views/Modules/Base.vue";
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";

import TabRecurringPayments from "@/views/Modules/Payments/Components/Settings/TabRecurringPayments.vue";
import TabPaymentTypes      from "@/views/Modules/Payments/Components/Settings/TabPaymentTypes.vue";
import TabOther             from "@/views/Modules/Payments/Components/Settings/TabOther.vue";

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
          tabName: this.$t('payments.settings.tab.recurringPayments.header'),
          tabComponent: TabRecurringPayments,
        },
        {
          tabName: this.$t('payments.settings.tab.paymentTypes.header'),
          tabComponent: TabPaymentTypes,
        },
        {
          tabName: this.$t('payments.settings.tab.other.header'),
          tabComponent: TabOther,
        },
      ];
    }
  }
}
</script>
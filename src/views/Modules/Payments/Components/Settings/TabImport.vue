<template>
  <Tabs :tabs-with-content="tabsContent"
        id="paymentsSettingsMonthlyImport"
  />
</template>

<script lang="ts">

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import TabFilterRules from "@/views/Modules/Payments/Components/Settings/MonthlyPayments/TabFilterRules.vue";
import TabProfiles    from "@/views/Modules/Payments/Components/Settings/MonthlyPayments/TabProfiles.vue";
import Tabs           from "@/components/Navigation/Tabs/Tabs.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        currencyMultiplier: null,
      }
    }
  },
  components: {
    Tabs,
  },
  computed: {
    /**
     * @description builds the switchable tabs content
     */
    tabsContent(): Array {
      return [
        {
          tabName: this.$t('payments.settings.tab.monthlyImport.tab.filterRule.header'),
          tabComponent: TabFilterRules,
        },
      ];
    }
  },
}
</script>

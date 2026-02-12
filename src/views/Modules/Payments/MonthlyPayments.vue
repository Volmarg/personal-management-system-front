<template>
  <Base :info-block-description="description"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent"
          :no-background="true"
          @tab-name-click="onTabNameClick"
    />
  </Base>
</template>

<script lang="ts">
import Base from "@/views/Modules/Base.vue";
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";

import TabOverview from "@/views/Modules/Payments/MonthlyPayments/TabOverview.vue";
import TabImport from "@/views/Modules/Payments/MonthlyPayments/TabImport.vue";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      activeTabName: null,
      defaultDescription: this.$t('payments.monthly.description.monthly'),
    }
  },
  components: {
    Tabs,
    Base
  },
  computed: {
    /**
     * @description page description
     */
    description(): string {
      if (this.activeTabName === this.$t('payments.monthly.tabs.import.label')) {
        return this.$t('payments.monthly.description.import');
      }

      return this.defaultDescription;
    },
    /**
     * @description builds the switchable tabs content
     */
    tabsContent(): Array {
      return [
        {
          tabName: this.$t('payments.monthly.tabs.overview.label'),
          tabComponent: TabOverview,
        },
        {
          tabName: this.$t('payments.monthly.tabs.import.label'),
          tabComponent: TabImport,
        }
      ];
    }
  },
  methods: {
    /**
     * @description sets the clicked tab name
     */
    onTabNameClick(tabName: string): void {
      this.activeTabName = tabName;
    }
  },
}
</script>
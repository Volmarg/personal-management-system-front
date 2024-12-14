<template>
  <Base :info-block-description="$t('payments.bills.description')"
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

import {BillsState} from "@/scripts/Vue/Store/Module/Payments/Bills/BillsState";

export default {
  data(): ComponentData {
    return {
      store: null as BillsState | null,
      billsData: [],
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
  },
  async beforeMount(): Promise<void> {
    this.store = BillsState();
    await this.store.getAll();
    this.billsData = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function(): void {
        this.billsData = this.store.allEntries;
      }
    }
  }
}
</script>
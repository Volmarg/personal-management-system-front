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

export default {
  components: {
    Base,
    Tabs
  },
  methods: {
    buildTabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName: this.$t('reports.historical.moneyOwed.tabs.owedByMe.label'),
          tabComponent: TabByMe,
          tabComponentProps: {}
        },
        {
          tabName: this.$t('reports.historical.moneyOwed.tabs.owedByOthers.label'),
          tabComponent: TabByOthers,
          tabComponentProps: {}
        }
      ];
    },
  }
}
</script>

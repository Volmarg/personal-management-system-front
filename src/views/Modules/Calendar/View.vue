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

import TabSchedules from "@/views/Modules/Calendar/TabSchedules.vue";
import TabSettings from "@/views/Modules/Calendar/TabSettings.vue";
import TabLegend from "@/views/Modules/Calendar/TabLegend.vue";

export default {
  data(): ComponentData {
    return {
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
          tabName: this.$t('calendar.tabs.schedules.label'),
          tabComponent: TabSchedules,
        },
        {
          tabName: this.$t('calendar.tabs.settings.label'),
          tabComponent: TabSettings,
        },
        {
          tabName: this.$t('calendar.tabs.legend.label'),
          tabComponent: TabLegend,
        },
      ];
    }
  }
}
</script>
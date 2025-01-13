<template>
  <Base :info-block-description="$t('calendar.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent" />
  </Base>
</template>

<script lang="ts">
import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";
import {CalendarStore}   from "@/scripts/Vue/Store/Module/Calendar/CalendarStore";

import Base from "@/views/Modules/Base.vue";
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";

import TabSchedules from "@/views/Modules/Calendar/TabSchedules.vue";
import TabSettings  from "@/views/Modules/Calendar/TabSettings.vue";
import TabLegend    from "@/views/Modules/Calendar/TabLegend.vue";

export default {
  data(): ComponentData {
    return {
      store: null as null | StoreDefinition,
      calendars: [],
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
          tabComponentProps: {
            calendarsData: this.calendars,
          }
        },
        {
          tabName: this.$t('calendar.tabs.settings.label'),
          tabComponent: TabSettings,
          tabComponentProps: {
            calendarsData: this.calendars,
          }
        },
        {
          tabName: this.$t('calendar.tabs.legend.label'),
          tabComponent: TabLegend,
        },
      ];
    }
  },
  async beforeMount(): Promise<void> {
    this.store = CalendarStore();
    await this.store.getAll();
    this.calendars = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function(): void {
        this.calendars = this.store.allEntries;
      }
    }
  }
}
</script>
<template>
  <TopBar @widget-size-change="conf.widgetSize = $event"
          class="mr-0 md:mr-1"
  />
  <div class="flex flex-row flex-wrap">
    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
         v-if="isWidgetVisible('goalPayments')"
    >
      <GoalsPayments :data="goalPaymentsData"/>
    </div>

    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
         v-if="isWidgetVisible('goalProgress')"
    >
      <GoalsProgress :data="goalProgressData" />
    </div>

    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
         v-if="isWidgetVisible('issues')"
    >
      <PendingIssues :data="issues" />
    </div>

    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
         v-if="isWidgetVisible('schedules')"
    >
      <Schedules :data="schedules"/>
    </div>
  </div>
</template>

<script lang="ts">
import GoalsPayments from "@/views/Dashboard/Components/Widget/GoalsPayments.vue";
import GoalsProgress from "@/views/Dashboard/Components/Widget/GoalsProgress.vue";
import PendingIssues from "@/views/Dashboard/Components/Widget/PendingIssues.vue";
import Schedules     from "@/views/Dashboard/Components/Widget/Schedules.vue";

import TopBar from "@/views/Dashboard/Components/TopBar.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import LocalStorageService    from "@/scripts/Core/Services/Storage/LocalStorageService";
import SymfonyDashboardRoutes from "@/router/SymfonyRoutes/Modules/SymfonyDashboardRoutes";
import SymfonySystemRoutes    from "@/router/SymfonyRoutes/Modules/SymfonySystemRoutes";
export default {
  data(): ComponentData {
    return {
      widgetsData: [],
      widgetsVisibilityData: [],
      conf: {
        widgetSize: 1,
      },
    }
  },
  components: {
    PendingIssues,
    GoalsPayments,
    GoalsProgress,
    Schedules,
    TopBar
  },
  computed: {
    /**
     * @description provides "goal payments" widget data
     */
    goalPaymentsData(): Array {
      return this.widgetsData['goalPayments'] ?? [];
    },
    /**
     * @description provides "goal progress" widget data
     */
    goalProgressData(): Array {
      return this.widgetsData['goalProgress'] ?? [];
    },
    /**
     * @description provides "issues" widget data
     */
    issues(): Array {
      return this.widgetsData['issues'] ?? [];
    },
    /**
     * @description provides "schedules" widget data
     */
    schedules(): Array {
      return this.widgetsData['schedules'] ?? [];
    },
  },
  methods: {
    /**
     * @description check if widget is visible or not
     */
    isWidgetVisible($widgetName: string): boolean {
      for (let widgetData of this.widgetsVisibilityData) {
        if (widgetData.name === $widgetName) {
          return widgetData.enabled;
        }
      }
      return false;
    },
  },
  created(): void {
    let savedSize = LocalStorageService.get(LocalStorageService.DASHBOARD_WIDGET_SIZE);
    this.conf.widgetSize = !savedSize ? 1 : parseInt(savedSize);
  },
  async beforeMount(): Promise<void> {
    this.widgetsVisibilityData = await this.$moduleCall.getAll(SymfonySystemRoutes.SETTINGS_DASHBOARD_WIDGET_VISIBILITY_BASE);
    this.widgetsData = await this.$moduleCall.getAll(SymfonyDashboardRoutes.DASHBOARD_BASE_URL);
  }
}
</script>

<style lang="scss">
.dashboard-big-block {
  @apply p-2
}
</style>
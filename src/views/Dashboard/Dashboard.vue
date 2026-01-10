<template>
  <TopBar @widget-size-change="conf.widgetSize = $event"
          class="mr-0 md:mr-1"
  />
  <div class="flex flex-row flex-wrap">
    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
         v-if="isWidgetVisible(dashboardWidgetEnum.goalPayments)"
    >
      <GoalsPayments :data="getWidgetData(dashboardWidgetEnum.goalPayments)"
                     :is-locked="isWidgetLocked(dashboardWidgetEnum.goalPayments)"
      />
    </div>

    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
         v-if="isWidgetVisible(dashboardWidgetEnum.goalProgress)"
    >
      <GoalsProgress :data="getWidgetData(dashboardWidgetEnum.goalProgress)"
                     :is-locked="isWidgetLocked(dashboardWidgetEnum.goalProgress)"
      />
    </div>

    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
         v-if="isWidgetVisible(dashboardWidgetEnum.issues)"
    >
      <PendingIssues :data="getWidgetData(dashboardWidgetEnum.issues)"
                     :is-locked="isWidgetLocked(dashboardWidgetEnum.issues)"
      />
    </div>

    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
         v-if="isWidgetVisible(dashboardWidgetEnum.schedules)"
    >
      <Schedules :data="getWidgetData(dashboardWidgetEnum.schedules)"
                 :is-locked="isWidgetLocked(dashboardWidgetEnum.schedules)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import GoalsPayments from "@/views/Dashboard/Components/Widget/GoalsPayments.vue";
import GoalsProgress from "@/views/Dashboard/Components/Widget/GoalsProgress.vue";
import PendingIssues from "@/views/Dashboard/Components/Widget/PendingIssues.vue";
import Schedules     from "@/views/Dashboard/Components/Widget/Schedules.vue";

import TopBar from "@/views/Dashboard/Components/TopBar.vue";

import {ComponentData}       from "@/scripts/Vue/Types/Components/types";
import {DashboardWidgetEnum} from "@/scripts/Core/Enum/DashboardWidget";

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
    dashboardWidgetEnum(): typeof DashboardWidgetEnum {
      return DashboardWidgetEnum;
    },
  },
  methods: {
    /**
     * @description returns lock state of given widget, or false if no state was defined
     */
    isWidgetLocked(widgetName: string): boolean {
      let lockState = this.widgetsData['lockState'] ?? {};
      return lockState[widgetName] ?? false;
    },
    /**
     * @description returns the widget data for given widget name
     */
    getWidgetData(widgetName: string): Array<Array<unknown>> {
      return this.widgetsData[widgetName] ?? [];
    },
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
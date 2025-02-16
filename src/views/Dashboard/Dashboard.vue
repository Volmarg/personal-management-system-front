<template>
  <TopBar @widget-size-change="conf.widgetSize = $event"
          class="mr-0 md:mr-1"
  />
  <div class="flex flex-row flex-wrap">
    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
    >
      <GoalsPayments :data="goalPaymentsData"/>
    </div>

    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
    >
      <GoalsProgress :data="goalProgressData" />
    </div>

    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
    >
      <PendingIssues :data="issues" />
    </div>

    <div class="dashboard-big-block"
         :class="{[`w-full md:w-1/${conf.widgetSize}`]: true}"
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
export default {
  data(): ComponentData {
    return {
      widgetsData: [],
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
  created(): void {
    let savedSize = LocalStorageService.get(LocalStorageService.DASHBOARD_WIDGET_SIZE);
    this.conf.widgetSize = !savedSize ? 1 : parseInt(savedSize);
  },
  async beforeMount(): Promise<void> {
    this.widgetsData = await this.$moduleCall.getAll(SymfonyDashboardRoutes.DASHBOARD_BASE_URL);
  }
}
</script>

<style lang="scss">
.dashboard-big-block {
  @apply p-2
}
</style>
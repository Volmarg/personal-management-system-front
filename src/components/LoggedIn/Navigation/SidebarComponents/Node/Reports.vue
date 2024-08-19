<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.reports.label')">
    <template #icon>
      <fa icon="list-alt"/>
    </template>

    <template #children>
      <SingleMenuElement :route-path="router.ROUTE_PATH_REPORT_PAYMENT_SUMMARIES"
                         :label="$t('navbar.rightSidebar.menu.reports.children.paymentSummaries.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_REPORT_HISTORICALLY_MONEY_OWED"
                         :label="$t('navbar.rightSidebar.menu.reports.children.historicalMoneyOwed.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_REPORT_PAYMENT_CHARTS"
                         :label="$t('navbar.rightSidebar.menu.reports.children.paymentCharts.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_REPORT_SAVING_CHARTS"
                         :label="$t('navbar.rightSidebar.menu.reports.children.savingCharts.label')"
                          @click="onMenuElementClick"
      />
    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterReports from "@/router/Modules/VueRouterReports";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterReports {
      return VueRouterReports;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>
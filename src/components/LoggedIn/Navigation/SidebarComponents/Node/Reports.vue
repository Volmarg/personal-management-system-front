<template>
  <NodeBase :required-right="nodeRight">
    <template #default="props">
      <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.reports.label')"
                                 :is-locked="!props.isRightGranted"
      >
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
  </NodeBase>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";
import NodeBase                  from "@/components/LoggedIn/Navigation/SidebarComponents/Node/NodeBase.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import UserModuleRights from "@/scripts/Core/Security/Rights/UserModuleRights";

import VueRouterReports from "@/router/Modules/VueRouterReports";

export default {
  components: {
    NodeBase,
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    nodeRight(): string {
      return UserModuleRights.CAN_ACCESS_REPORTS_MODULE;
    },
    router(): VueRouterReports {
      return VueRouterReports;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>
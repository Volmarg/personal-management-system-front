<template>
  <SingleDropdownMenuElement :label="$t('navbar.rightSidebar.menu.payments.label')">
    <template #icon>
      <fa icon="money-bill"/>
    </template>

    <template #children>
      <SingleMenuElement :route-path="router.ROUTE_PATH_PAYMENTS_PRODUCT_PRICES"
                         :label="$t('navbar.rightSidebar.menu.payments.children.productPrices.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_PAYMENTS_MONTHLY"
                         :label="$t('navbar.rightSidebar.menu.payments.children.monthlyPayments.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_PAYMENTS_MONEY_OWED"
                         :label="$t('navbar.rightSidebar.menu.payments.children.moneyOwed.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_PAYMENTS_INCOMES"
                         :label="$t('navbar.rightSidebar.menu.payments.children.incomes.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_PAYMENTS_BILLS"
                         :label="$t('navbar.rightSidebar.menu.payments.children.bills.label')"
                          @click="onMenuElementClick"
      />
      <SingleMenuElement :route-path="router.ROUTE_PATH_PAYMENTS_SETTINGS"
                         :label="$t('navbar.rightSidebar.menu.payments.children.settings.label')"
                          @click="onMenuElementClick"
      />
    </template>
  </SingleDropdownMenuElement>
</template>

<script lang="ts">
import SingleDropdownMenuElement from "@/components/LoggedIn/Navigation/SidebarComponents/SingleDropdownMenuElement.vue";
import SingleMenuElement         from "@/components/LoggedIn/Navigation/SidebarComponents/SingleMenuElement.vue";

import SidebarMixin from "@/components/LoggedIn/Navigation/SidebarComponents/Mixin/SidebarMixin.vue";

import VueRouterPayments from "@/router/Modules/VueRouterPayments";

export default {
  components: {
    SingleDropdownMenuElement,
    SingleMenuElement
  },
  computed: {
    router(): VueRouterPayments {
      return VueRouterPayments;
    }
  },
  mixins: [
    SidebarMixin
  ]

}
</script>
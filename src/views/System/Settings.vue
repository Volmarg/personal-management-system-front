<template>
  <SettingsBase>
    <template #nav>
      <Nav />
    </template>

    <template #tabHeader>
      <span v-if="$route.name === router.ROUTE_NAME_SYSTEM_DASHBOARD">{{ $t('systemSettings.tab.dashboard.label') }}</span>
      <span v-else-if="$route.name === router.ROUTE_NAME_SYSTEM_FINANCES">{{ $t('systemSettings.tab.finances.label') }}</span>
      <span v-else-if="$route.name === router.ROUTE_NAME_SYSTEM_NOTIFICATIONS">{{ $t('systemSettings.tab.notifications.label') }}</span>
      <span v-else-if="$route.name === router.ROUTE_NAME_SYSTEM_SETTINGS_MODULES">{{ $t('systemSettings.tab.modules.label') }}</span>
    </template>

    <template #routerView>
      <router-view></router-view>
    </template>
  </SettingsBase>
</template>

<script lang="ts">
import SettingsBase from "@/components/Ui/Settings/SettingsBase.vue";
import Nav          from "@/views/System/Settings/Nav.vue";

import VueRouterSystem from "@/router/VueRouterSystem";


export default {
  computed: {
    router(): VueRouterSystem {
      return VueRouterSystem
    }
  },
  components: {
    Nav,
    SettingsBase,
  }
}
</script>

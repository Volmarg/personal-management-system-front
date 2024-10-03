<template>
  <div class="md:w-full">
    <div class="system-settings-sidebar">

      <ul>
        <!-- Dashboard -->
        <SettingsNavElement :route-name="route.names.dashboard"
                          :label="$t('systemSettings.tab.dashboard.label')"
        >
          <template #icon>
            <la svg-icon-name="home-solid" />
          </template>
        </SettingsNavElement>

        <!-- Finances -->
        <SettingsNavElement :route-name="route.names.finances"
                          :label="$t('systemSettings.tab.finances.label')"
        >
          <template #icon>
            <la svg-icon-name="wallet-solid" />
          </template>
        </SettingsNavElement>

      </ul>

    </div>
  </div>
</template>

<script lang="ts">
import SettingsNavElement from "@/components/Ui/Settings/SettingsNavElement.vue";

import VueRouterSystem from "@/router/VueRouterSystem";

export default {
  data() {
    return {
      route: {
        names: {
          dashboard : VueRouterSystem.ROUTE_NAME_SYSTEM_DASHBOARD,
          finances : VueRouterSystem.ROUTE_NAME_SYSTEM_FINANCES,
        }
      }
    }
  },
  components: {
    SettingsNavElement,
  }
}
</script>

<style lang="scss" scoped>
.system-settings-sidebar {
  max-width: 100% !important;
}
</style>

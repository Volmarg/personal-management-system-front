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

        <!-- Notifications -->
        <SettingsNavElement :route-name="route.names.notifications"
                          :label="$t('systemSettings.tab.notifications.label')"
        >
          <template #icon>
            <la svg-icon-name="envelope-open-text-solid" />
          </template>
        </SettingsNavElement>

        <!-- Modules -->
        <SettingsNavElement :route-name="route.names.modules"
                            :label="$t('systemSettings.tab.modules.label')"
                            v-if="!isSystemLocked"
        >
          <template #icon>
            <la svg-icon-name="project-diagram-solid" />
          </template>
        </SettingsNavElement>

      </ul>

    </div>
  </div>
</template>

<script lang="ts">
import SettingsNavElement from "@/components/Ui/Settings/SettingsNavElement.vue";

import VueRouterSystem from "@/router/VueRouterSystem";

import {userStateStore} from "@/scripts/Vue/Store/UserState";

export default {
  data() {
    return {
      route: {
        names: {
          dashboard : VueRouterSystem.ROUTE_NAME_SYSTEM_DASHBOARD,
          finances : VueRouterSystem.ROUTE_NAME_SYSTEM_FINANCES,
          notifications : VueRouterSystem.ROUTE_NAME_SYSTEM_NOTIFICATIONS,
          modules : VueRouterSystem.ROUTE_NAME_SYSTEM_SETTINGS_MODULES,
        }
      }
    }
  },
  computed: {
    isSystemLocked(): boolean {
      return userStateStore().user?.isSystemLocked ?? true;
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

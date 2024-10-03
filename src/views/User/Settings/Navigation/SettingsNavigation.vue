<template>
  <div class="md:w-full">
    <div class="settings-sidebar">

      <ul>
        <!-- Base data-->
        <SettingsNavElement :route-name="route.names.baseData"
                          :label="$t('userSettings.tab.baseData.label')"
        >
          <template #icon>
            <la svg-icon-name="book-solid" />
          </template>
        </SettingsNavElement>

        <!-- Security -->
        <SettingsNavElement :route-name="route.names.security"
                          :label="$t('userSettings.tab.security.label')"
        >
          <template #icon>
            <la svg-icon-name="lock-open-solid" />
          </template>
        </SettingsNavElement>

      </ul>

    </div>
  </div>
</template>

<script lang="ts">
import SettingsNavElement from "@/components/Ui/Settings/SettingsNavElement.vue";
import LineAwesome        from "@/components/Ui/Icons/LineAwesome.vue";

import VueRouterUser from "@/router/VueRouterUser";

export default {
  data() {
    return {
      route: {
        names: {
          security : VueRouterUser.ROUTE_NAME_USER_SECURITY,
          baseData : VueRouterUser.ROUTE_NAME_USER_BASE_DATA,
        }
      }
    }
  },
  components: {
    SettingsNavElement,
    "la" : LineAwesome,
  }
}
</script>

<style lang="scss" scoped>
.settings-sidebar {
  max-width: 100% !important;
}
</style>

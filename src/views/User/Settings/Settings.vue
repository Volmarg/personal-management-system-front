<template>
  <SettingsBase>
    <template #nav>
      <SettingsNavigation />
    </template>

    <template #tabHeader>
      <span v-if="$route.name === router.ROUTE_NAME_USER_SECURITY">{{ $t('userSettings.tab.security.header') }}</span>
      <span v-else-if="$route.name === router.ROUTE_NAME_USER_BASE_DATA">{{ $t('userSettings.tab.baseData.header') }}</span>
    </template>

    <template #routerView>
      <router-view v-bind="$attrs"></router-view>
    </template>
  </SettingsBase>
</template>

<script lang="ts">
import SettingsBase       from "@/components/Ui/Settings/SettingsBase.vue";
import SettingsNavigation from "@/views/User/Settings/Navigation/SettingsNavigation.vue";

import VueRouterUser from "@/router/VueRouterUser";


export default {
  computed: {
    router(): VueRouterUser {
      return VueRouterUser
    }
  },
  components: {
    SettingsNavigation,
    SettingsBase,
  }
}
</script>

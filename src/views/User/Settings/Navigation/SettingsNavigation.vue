<template>
  <div class="md:w-full">
    <div class="user-settings-sidebar">

      <ul>
        <!-- Base data-->
        <SingleNavElement :route-name="route.names.baseData"
                          :label="$t('userSettings.tab.baseData.label')"
        >
          <template #icon>
            <la svg-icon-name="book-solid" />
          </template>
        </SingleNavElement>

        <!-- Security -->
        <SingleNavElement :route-name="route.names.security"
                          :label="$t('userSettings.tab.security.label')"
        >
          <template #icon>
            <la svg-icon-name="lock-open-solid" />
          </template>
        </SingleNavElement>

      </ul>

    </div>
  </div>
</template>

<script lang="ts">
import SingleNavElement from "@/views/User/Settings/components/SingleNavElement.vue";
import LineAwesome      from "@/components/Ui/Icons/LineAwesome.vue";

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
    SingleNavElement,
    "la" : LineAwesome,
  }
}
</script>

<style lang="scss" scoped>
.user-settings-sidebar {
  max-width: 100% !important;
}
</style>

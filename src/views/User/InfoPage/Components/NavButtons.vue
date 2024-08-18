<template>
  <div class="nav-wrapper">

    <router-link :to="{path: route.infoPage}">
      <ButtonRounded
          :text="$t('landing-page.common.button.homePage')"
          button-extra-classes="nav-button"
      />
    </router-link>

    <router-link :to="{path: route.loginPage}">
      <ButtonRounded
          :text="$t('landing-page.common.button.loginPage')"
          button-extra-classes="nav-button"
      />
    </router-link>

  </div>

</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import VueRouter from "@/router/VueRouter";

import ButtonRounded from "@/components/Navigation/Button/ButtonRounded.vue";

export default {
  data(): ComponentData {
    return {
      route: {
        infoPage: VueRouter.ROUTE_PATH_INFO,
        loginPage: VueRouter.ROUTE_PATH_LOGIN,
      }
    }
  },
  components: {
    ButtonRounded
  }
}
</script>

<style lang="scss" scoped>
.nav-button {
  @apply text-2xl p-3 w-full md:w-auto mb-0 rounded-none md:rounded-lg
}

.nav-wrapper {
  @apply grid gap-4 md:grid-rows-1 md:grid-cols-2 grid-rows-2 grid-cols-1 w-full md:w-auto mt-10
}
</style>
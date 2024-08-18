<template>
  <li class="nav-item">
    <a
        @click.prevent="goToLoginHandler"
        class="nav-link"
    >
      {{ $t('infoPage.menu.login.label') }}
    </a></li>
</template>

<script lang="ts">
import LoginPageHandlerMixin from "@/views/InfoLandingPage/Components/Mixin/LoginPageHandlerMixin.vue";

export default {
  mixins: [
    LoginPageHandlerMixin,
  ],
}
</script>
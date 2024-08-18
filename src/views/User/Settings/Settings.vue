<template>
  <Container class="lg:grid lg:grid-rows-1 lg:grid-cols-2 user-settings-grid">

    <!-- nav -->
    <div class="nav-section">
      <SettingsNavigation />
    </div>

    <!-- page content -->
    <div>
      <h1 class="h1-blue text-xl flex-row justify-center">{{ $t('views.user.settings.label') }}</h1>
      <hr class="mt-2 mb-2"/>
      <router-view @profile-image-changed="$emit('profileImageChanged')"></router-view>
    </div>

  </Container>
</template>

<script lang="ts">
import Container          from "@/components/Ui/Containers/Container.vue";
import SettingsNavigation from "@/views/User/Settings/Navigation/SettingsNavigation.vue";

export default {
  emits: [
    'profileImageChanged'
  ],
  components: {
    SettingsNavigation,
    Container,
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/responsive.scss';

.user-settings-grid {
  grid-template-columns: 300px 1fr;
}

@media screen and (max-width: $tabletBreakingPointPx + 'px') {
  .user-settings-grid {
    grid-template-columns: 1fr 1fr;
  }

  .user-settings-view-button {
    @apply mb-2 w-full
  }
}

.user-settings-buttons-row {
  @apply flex flex-col items-center justify-between
}
</style>
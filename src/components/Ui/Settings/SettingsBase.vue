<template>
  <Container class="lg:grid lg:grid-rows-1 lg:grid-cols-2 settings-grid">

    <!-- nav -->
    <div class="nav-section">
      <slot name="nav"></slot>
    </div>

    <!-- page content -->
    <div>
      <h1 class="h1-blue text-xl flex-row justify-center">
        <slot name="tabHeader"></slot>
      </h1>
      <hr class="mt-2 mb-2"/>
      <slot name="routerView"></slot>
    </div>

  </Container>
</template>

<script lang="ts">
import Container from "@/components/Ui/Containers/Container.vue";

export default {
  components: {
    Container,
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/responsive.scss';

.settings-grid {
  grid-template-columns: 300px 1fr;
}

@media screen and (max-width: $tabletBreakingPointPx + 'px') {
  .settings-grid {
    grid-template-columns: 1fr 1fr;
  }

  .settings-view-button {
    @apply mb-2 w-full
  }
}

.settings-buttons-row {
  @apply flex flex-col items-center justify-between
}
</style>
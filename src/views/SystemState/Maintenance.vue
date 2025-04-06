<template>
  <section>
    <img src="/public/image/error-pages/maintenance/Maintenance.svg">
    <h2 class="headline">{{ headline }}</h2>
    <p class="text">{{ text }}</p>
  </section>
</template>

<script lang="ts">
import EnvReader       from "@/scripts/Core/System/EnvReader";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return{
      headline : EnvReader.getMaintenanceHeadlineMessage(),
      text     : EnvReader.getMaintenanceText(),
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vue/view/info-page.scss';
</style>
<template>
  <div class="box-bottom">
    <IsOnDashboardState :is-for-dashboard="isForDashboard"/>
  </div>
</template>

<script lang="ts">
import IsOnDashboardState from "@/components/Ui/State/IsOnDashboardState.vue";
export default {
  props: {
    isForDashboard: {
      type: Boolean,
      required: true,
    }
  },
  components: {
    IsOnDashboardState
  },
}
</script>

<style lang="scss" scoped>
.box-bottom {
  @apply flex flex-col
}
</style>
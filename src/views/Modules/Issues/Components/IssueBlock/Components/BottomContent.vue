<template>
  <div class="box-bottom">
    <div class="dashboard-state">
      <la svg-icon-name="home-solid"
          :color="dashboardStateColor"
          v-tippy="{
            content: dashboardStateText
          }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Colors          from "@/scripts/Vue/Mixins/Colors.vue";

export default {
  props: {
    isForDashboard: {
      type: Boolean,
      required: true,
    }
  },
  mixins: [
    Colors
  ],
  computed: {
    /**
     * @description decide color of dashboard state icon
     */
    dashboardStateColor(): string {
      return this.isForDashboard ? this.color.green : this.color.red;
    },
    /**
     * @description decide text on dashboard state hover
     */
    dashboardStateText(): string {
      return this.isForDashboard
          ? this.$t('issues.pending.box.dashboard.hover.displayed')
          : this.$t('issues.pending.box.dashboard.hover.notDisplayed');
    }
  },
}
</script>

<style lang="scss" scoped>
.box-bottom {
  @apply flex flex-col
}

.dashboard-state {
  @apply self-center
}
</style>
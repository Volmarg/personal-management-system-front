<template>
  <div  class="single-payment-block"
        :class="{
          'block-size-full': isLargeScreenBreakingPoint,
          'block-size-limited': !isLargeScreenBreakingPoint
       }"
  >

    <p class="font-bold">{{ paymentData.name }}</p>
    <p class="text-xs mb-5">{{ paymentData.goal }}/{{ paymentData.collected }}</p>


    <ul class="text-left mb-2">
      <li>{{ $t('goals.payments.block.text.start') }}: {{ paymentData.start }}</li>
      <li>{{ $t('goals.payments.block.text.end') }}: {{ paymentData.end }}</li>
    </ul>

    <div class="mb-2">
      <p class="bar-data">{{ $t('goals.payments.block.text.elapsed', {'left': timeLeftDays}) }}</p>
      <ProgressBar :percent="timeLeftPercent"/>
    </div>

    <div class="mb-4">
      <p class="bar-data">{{ $t('goals.payments.block.text.collected', {'left': moneyLeft}) }}</p>
      <ProgressBar :percent="moneyPercent"/>
    </div>

    <IsOnDashboardState :is-for-dashboard="paymentData.showOnDashboard"
                        v-if="isDashboardStateVisible"
    />
  </div>
</template>

<script lang="ts">
import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import IsOnDashboardState from "@/components/Ui/State/IsOnDashboardState.vue";
import ProgressBar        from "@/components/Ui/Bar/ProgressBar.vue";

import moment from "moment";

export default {
  props: {
    paymentData: {
      type: Object,
      required: true,
    },
    isDashboardStateVisible: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  mixins: [
    ResponsiveVarsMixin,
  ],
  components: {
    ProgressBar,
    IsOnDashboardState,
  },
  computed: {
    /**
     * @description days diff between start and end date
     */
    timeTotalDays(): number {
      return moment(this.paymentData.end).diff(moment(this.paymentData.start), 'days');
    },
    /**
     * @description days left till deadline is reached
     */
    timeLeftDays(): number {
      let daysLeft = moment(this.paymentData.end).diff(moment(), 'days');
      if (daysLeft <= 0) {
        return 0;
      }

      return daysLeft;
    },
    /**
     * @description days left till deadline is reached in percent
     */
    timeLeftPercent(): number {
      if (this.timeLeftDays <= 0) {
        return 100;
      }

      return (this.timeLeftDays / this.timeTotalDays * 100).toPrecision(4);
    },
    /**
     * @description money missing from reaching the goal
     */
    moneyLeft(): number {
      if (this.paymentData.collected >= this.paymentData.goal) {
        return 0;
      }

      return this.paymentData.goal - this.paymentData.collected;
    },
    /**
     * @description returns the percentage of collected money
     */
    moneyPercent(): number {
      if (!this.paymentData.collected) {
        return 0;
      }

      return (this.paymentData.collected / this.paymentData.goal * 100).toPrecision(4);
    }
  }
}
</script>

<style lang="scss" scoped>
.block-size-limited {
  $blockWidth: 300px;
  max-width: $blockWidth !important;
  min-width: $blockWidth !important;
}

.block-size-full {
  @apply w-full
}

.bar-data {
  @apply text-left
}

</style>
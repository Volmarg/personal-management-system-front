<template>
  <BigDataDisplayBlock :header="$t('dashboard.widget.goalPayments.header')"
                       :is-locked="isLocked"
  >
    <div class="flex flex-wrap flex-row justify-between">
      <SinglePaymentBlock v-for="payment in data"
                          :key="JSON.stringify(payment)"
                          :payment-data="payment"
                          :is-dashboard-state-visible="false"
      />
    </div>

    <NoResultsText v-if="data.length === 0" />
  </BigDataDisplayBlock>
</template>

<script lang="ts">
import BigDataDisplayBlock from "@/views/Dashboard/Components/BigDataDisplayBlock.vue";
import SinglePaymentBlock  from "@/views/Modules/Goals/Payments/SinglePaymentBlock.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    isLocked: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  components: {
    NoResultsText, SinglePaymentBlock,
    BigDataDisplayBlock
  }
}
</script>
<template>
  <div class="flex flex-wrap flex-row justify-between">
    <SinglePaymentBlock v-for="payment in paymentsStore.allEntries"
                        :key="JSON.stringify(payment)"
                        :payment-data="payment"
    />
  </div>

  <NoResultsText v-if="paymentsStore.allEntries.length === 0" />
</template>

<script lang="ts">
import NoResultsText      from "@/components/Page/NoResultsText.vue";
import SinglePaymentBlock from "@/views/Modules/Goals/Payments/SinglePaymentBlock.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {PaymentsState} from "@/scripts/Vue/Store/Module/Goals/Payments/PaymentsState";

export default {
  data(): ComponentData {
    return {
      paymentsStore: null as PaymentsState,
    }
  },
  components: {
    SinglePaymentBlock,
    NoResultsText
  },
  beforeMount(): void {
    this.paymentsStore = PaymentsState();
    this.paymentsStore.getAll();
  },
}
</script>

<style lang="scss">
.single-payment-block {
  @apply py-4 px-2
}
</style>
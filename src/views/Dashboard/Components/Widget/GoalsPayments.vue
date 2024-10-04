<template>
  <BigDataDisplayBlock :header="$t('dashboard.widget.goalPayments.header')">
    <div class="flex flex-wrap flex-row justify-between">
      <SinglePaymentBlock v-for="payment in payments"
                          :key="JSON.stringify(payment)"
                          :payment-data="payment"
      />
    </div>

    <NoResultsText v-if="payments.length === 0" />
  </BigDataDisplayBlock>
</template>

<script lang="ts">
import BigDataDisplayBlock from "@/views/Dashboard/Components/BigDataDisplayBlock.vue";
import SinglePaymentBlock  from "@/views/Modules/Goals/Payments/SinglePaymentBlock.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      payments: [
        {
          name: "New laptop",
          start: "2024-02-01",
          end: "2024-06-03",
          goal: 2300,
          collected: 4500,
          showOnDashboard: true,
        },
        {
          name: "Guitar",
          start: "2024-09-01",
          end: "2024-11-01",
          goal: 1500,
          collected: 900,
          showOnDashboard: false,
        },
        {
          name: "Cake",
          start: "2021-02-06",
          end: "2021-02-10",
          goal: 20,
          collected: 9.65,
          showOnDashboard: false,
        },
        {
          name: "Car",
          start: "2021-02-06",
          end: "2028-10-01",
          goal: 80000,
          collected: 54369,
          showOnDashboard: true,
        }
      ]
    }
  },
  components: {
    NoResultsText, SinglePaymentBlock,
    BigDataDisplayBlock
  }
}
</script>
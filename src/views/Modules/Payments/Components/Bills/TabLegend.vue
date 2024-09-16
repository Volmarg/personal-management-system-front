<template>
  <div class="flex justify-start flex-col text-left">
    <p class="text-lg font-bold">{{ $t('payments.bills.legend.billColor.header') }}</p>
    <ul class="mt-2">
      <li><BillMarker :planned="100" :spend="30"/><span class="mark-color-info">{{ $t('payments.bills.legend.billColor.ok') }}</span></li>
      <li><BillMarker :planned="100" :spend="80"/><span class="mark-color-info">{{ $t('payments.bills.legend.billColor.warn') }}</span></li>
      <li><BillMarker :planned="100" :spend="120"/><span class="mark-color-info">{{ $t('payments.bills.legend.billColor.exceed') }}</span></li>
    </ul>
  </div>
</template>

<script lang="ts">
import BillMarker from "@/views/Modules/Payments/Components/Bills/BillMarker.vue";


export default {
  components: {
    BillMarker
  }
}
</script>

<style lang="scss" scoped>
ul li {
  @apply mt-1 flex flex-row
}

.mark-color-info {
  line-height: 13x;
  @apply self-baseline
}
</style>
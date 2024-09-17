<template>
  <Table :data="data" />
</template>

<script lang="ts">
import Table from "@/views/Modules/Payments/Components/MoneyOwed/Table.vue";


export default {
  components: {
    Table
  },
  props: {
    data: {
      type: Array,
      required: true,
    }
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
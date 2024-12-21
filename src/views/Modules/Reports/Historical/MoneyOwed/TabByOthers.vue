<template>
  <div>
    <OwnageTable :data="tableData" />
  </div>
</template>

<script lang="ts">
import OwnageTable from "@/views/Modules/Reports/Historical/MoneyOwed/OwnageTable.vue";

export default {
  props: {
    tableData: {
      type: Array,
      required: true,
    }
  },
  components: {
    OwnageTable
  }
}
</script>
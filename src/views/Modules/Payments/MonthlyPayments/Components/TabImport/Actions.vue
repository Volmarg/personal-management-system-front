<template>
  <div class="flex justify-start">
    <DeleteButton @delete-click="onDelete" />
    <ViewDataButton :spreadsheet-row-data="spreadsheetRowData" />
    <MultiplyMoneyButton @multiply-click="onMultiply" />
    <Reset @reset-click="onReset" />
  </div>
</template>

<script lang="ts">
import DeleteButton        from "@/views/Modules/Payments/MonthlyPayments/Components/TabImport/DeleteButton.vue";
import MultiplyMoneyButton from "@/views/Modules/Payments/MonthlyPayments/Components/TabImport/MultiplyMoneyButton.vue";
import ViewDataButton      from "@/views/Modules/Payments/MonthlyPayments/Components/TabImport/ViewDataButton.vue";
import Reset               from "@/views/Modules/Payments/MonthlyPayments/Components/TabImport/Reset.vue";

import {ImportActionEnum} from "@/scripts/Core/Enum/PaymentMonthly";

export default {
  props: {
    spreadsheetRowData: {
      type: Object,
      required: true,
    }
  },
  methods: {
    onDelete(): void {
      this.$emit('action', {actionName: ImportActionEnum.delete });
    },
    onMultiply(): void {
      this.$emit('action', {actionName: ImportActionEnum.multiply});
    },
    onReset(): void {
      this.$emit('action', {actionName: ImportActionEnum.reset});
    }
  },
  components: {
    Reset,
    ViewDataButton,
    MultiplyMoneyButton,
    DeleteButton
  }
}
</script>
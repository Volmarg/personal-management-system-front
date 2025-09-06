<template>
  <BaseStep>
    <div class="p-10">
      <ul class="list-disc text-left">
        <li v-for="row in wizardStore.rowsCurrentValues"
            :key="JSON.stringify(row)"
            class="mt-2"
        >
          {{ formatDate(row.date) }} - <b>{{ row.description }}</b> - {{ paymentTypeStore.getForId(row.typeId)?.name }} ({{ row.money }})
        </li>
      </ul>
    </div>
  </BaseStep>
</template>

<script lang="ts">
import {UploadWizardStore, UploadWizardStoreType} from "@/scripts/Vue/Store/Module/Payments/Monthly/UploadWizardStore";
import {ComponentData}                            from "@/scripts/Vue/Types/Components/types";
import {PaymentTypesState}                        from "@/scripts/Vue/Store/Module/Payments/Settings/PaymentTypesState";

import BaseStep from "@/components/Ui/Wizard/BaseStep.vue";

import moment from "moment";

export default {
  data(): ComponentData {
    return {
      wizardStore: null as null | UploadWizardStoreType,
      paymentTypeStore: null, // todo: add type
    }
  },
  components: {
    BaseStep,
  },
  methods: {
    isValid(): boolean {
      return true;
    },
    formatDate(date: string): string {
      return moment(date).format("YYYY-MM-DD");
    }
  },
  async beforeMount():void {
    this.wizardStore = UploadWizardStore();
    this.paymentTypeStore = PaymentTypesState();
    if (this.paymentTypeStore.allEntries.length === 0) {
      await this.paymentTypeStore.getAll();
    }
  }
}
</script>
<template>
  <BaseStep>
    <div>
      <ul class="list-disc p-5 text-left">
        <li v-for="row in wizardStore.rowsCurrentValues"
            :key="JSON.stringify(row)"
        >
          {{ row.date }} - {{ row.description }} ({{ row.money }}) -- {{ paymentTypeStore.getForId(row.typeId)?.name }}
        </li>
      </ul>
    </div>
  </BaseStep>
</template>

<script lang="ts">
import {UploadWizardStore, UploadWizardStoreType} from "@/scripts/Vue/Store/Module/Payments/Monthly/UploadWizardStore";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {PaymentTypesState} from "@/scripts/Vue/Store/Module/Payments/Settings/PaymentTypesState";

import BaseStep from "@/components/Ui/Wizard/mixin/BaseStep.vue";

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
  },
  async beforeMount():void {
    this.wizardStore = UploadWizardStore();
    this.paymentTypeStore = PaymentTypesState();
    if(this.paymentTypeStore.allEntries.length === 0){
      await this.paymentTypeStore.getAll();
    }
  }
}
</script>
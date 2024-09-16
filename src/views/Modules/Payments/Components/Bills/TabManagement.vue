<template>
  <div v-if="tableData.length > 0"
       class="mt-10"
  >
    <BillsTable :data="tableData" />
  </div>

  <NoResultsText v-else />

  <hr class="mt-10 mb-5"/>

  <!-- form -->
  <div class="flex justify-center mt-10">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ $t('payments.bills.management.newForm.header') }}</h2>

      <FormInput type="text"
                 v-model="form.name"
                 :label="$t('payments.bills.management.newForm.name.label')"
      />

      <FormInput type="text"
                 v-model="form.information"
                 :label="$t('payments.bills.management.newForm.information.label')"
      />

      <FormInput type="number"
                 v-model="form.plannedAmount"
                 :label="$t('payments.bills.management.newForm.plannedAmount.label')"
      />

      <FormInput type="date"
                 v-model="form.startDate"
                 :label="$t('payments.bills.management.newForm.startDate.label')"
      />

      <FormInput type="date"
                 v-model="form.endDate"
                 :label="$t('payments.bills.management.newForm.endDate.label')"
      />

      <MediumButtonWithIcon :text="$t('payments.bills.management.newForm.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onNewSubmit"
      />

    </div>
  </div>

</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import NoResultsText from "@/components/Page/NoResultsText.vue";

import BillsTable           from "@/views/Modules/Payments/Components/Bills/BillsTable.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        startDate: null,
        endDate: null,
        name: null,
        information: null,
        plannedAmount: null,
      }
    }
  },
  props: {
    data: {
      type: Array,
      require: true,
    }
  },
  components: {
    FormInput,
    MediumButtonWithIcon,
    NoResultsText,
    BillsTable
  },
  computed: {
    /**
     * @description returns array with structure used by bills table
     */
    tableData(): Array {
      let data = [];
      for (let bill of this.data) {
        let rowValues = {};
        for (let key of Object.keys(bill)) {
          rowValues[key] = {
            value: bill[key],
            isComponent: false,
          };
        }

        data.push({
          values: rowValues
        })
      }

      return data;
    },
  },
  methods: {
    /**
     * @description handle user submitting the "new entry form"
     */
    onNewSubmit(): void {
      // todo
    }
  }
}
</script>
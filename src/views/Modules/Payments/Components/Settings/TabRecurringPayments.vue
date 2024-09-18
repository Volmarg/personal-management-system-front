<template>
  <div>
    <SimpleTable :headers="headers"
                 :data="data"
                 ref="table"
                 class="mt-4"
                 v-if="data.length > 0"
    />
    <NoResultsText v-else />
  </div>

  <hr class="mt-5 mb-5" />

  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ $t('payments.settings.tab.recurringPayments.table.newForm.header') }}</h2>

      <FormInput type="text"
                 :model-value="form.dayOfMonth"
                 :label="$t('payments.settings.tab.recurringPayments.table.newForm.dayOfMonth.label')"
      />

      <FormInput type="number"
                 :model-value="form.amount"
                 :label="$t('payments.settings.tab.recurringPayments.table.newForm.money.label')"
      />

      <FormInput type="text"
                 :model-value="form.description"
                 :label="$t('payments.settings.tab.recurringPayments.table.newForm.description.label')"
      />

      <PaymentTypeSelect :data="paymentTypesData"
                         v-model="form.type"
      />


      <MediumButtonWithIcon :text="$t('payments.settings.tab.recurringPayments.table.newForm.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2 mt-5"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onNewSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">

import PaymentTypeSelect    from "@/views/Modules/Payments/Components/Settings/PaymentTypeSelect.vue";
import SimpleTable          from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText        from "@/components/Page/NoResultsText.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      form: {
        dayOfMonth: null,
        amount: null,
        description: null,
        type: null,
      },
      headers: [
        {
          label: this.$t('payments.settings.tab.recurringPayments.table.header.dayOfMonth'),
          dataValuePath : 'dayOfMonth.value',
          dataIsComponentPath : 'dayOfMonth.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.recurringPayments.table.header.money'),
          dataValuePath : 'money.value',
          dataIsComponentPath : 'money.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.recurringPayments.table.header.description'),
          dataValuePath : 'description.value',
          dataIsComponentPath : 'description.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.recurringPayments.table.header.type'),
          dataValuePath : 'type.value',
          dataIsComponentPath : 'type.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.settings.tab.recurringPayments.table.header.actions'),
          dataValuePath : null,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        }
      ]
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    paymentTypesData: {
      type: Array,
      required: true,
    }
  },
  components: {
    FormInput,
    MediumButtonWithIcon,
    PaymentTypeSelect,
    NoResultsText,
    SimpleTable
  },
  methods: {
    /**
     * @description handle user submitting the new-form
     */
    onNewSubmit(): void {
      // todo
    }
  }
}
</script>

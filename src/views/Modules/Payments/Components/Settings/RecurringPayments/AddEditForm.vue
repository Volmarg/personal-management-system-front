<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ header }}</h2>

      <FormInput type="number"
                 v-model="form.dayOfMonth"
                 :is-required="true"
                 :label="$t('payments.settings.tab.recurringPayments.table.newForm.dayOfMonth.label')"
      />

      <FormInput type="number"
                 v-model="form.amount"
                 :is-required="true"
                 :label="$t('payments.settings.tab.recurringPayments.table.newForm.money.label')"
      />

      <FormInput type="text"
                 v-model="form.description"
                 :is-required="true"
                 :label="$t('payments.settings.tab.recurringPayments.table.newForm.description.label')"
      />

      <TypeSelect v-model="form.typeId" />

      <MediumButtonWithIcon :text="$t('payments.settings.tab.recurringPayments.table.newForm.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2 mt-5"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import TypeSelect           from "@/views/Modules/Payments/Components/Common/PaymentTypeSelect.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyPaymentsRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";

export default {
    data(): ComponentData {
      return {
        form: {
          dayOfMonth: null,
          amount: null,
          description: null,
          typeId: null,
        },
      }
  },
  props: {
    dayOfMonth: {
      type: [Number, null],
      required: false,
      default: null
    },
    header: {
      type: [String, null],
      required: false,
      default: null,
    },
    typeId: {
      type: [Number, null],
      required: false,
      default: null
    },
    id: {
      type: [Number, null],
      required: false,
      default: null
    },
    description: {
      type: [String, null],
      required: false,
      default: null
    },
    name: {
      type: [String, null],
      required: false,
      default: null
    },
    amount: {
      type: [Number, null],
      required: false,
      default: null
    }
  },
  components: {
    TypeSelect,
    FormInput,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description resets the form state
     */
    clearForm(): void {
      this.form.dayOfMonth = null;
      this.form.amount = null;
      this.form.description = null;
      this.form.typeId = null;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyPaymentsRoutes.SETTINGS_RECURRING_PAYMENT_BASE_URL, this.id, BaseApiResponse, this.form);
      config.reload = false;

      let response: BaseApiResponse;
      if (this.id) {
        response = await this.$moduleCall.update(config);
      } else {
        response = await this.$moduleCall.new(config);
      }

      if (response.success) {
        this.$emit('submit');
        this.clearForm();
      }
    }
  },
  beforeMount(): void {
    this.form.dayOfMonth = this.dayOfMonth;
    this.form.typeId = this.typeId;
    this.form.description = this.description;
    this.form.amount = this.amount;
  }
}
</script>
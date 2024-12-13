<template>
  <Container>
    <div class="flex justify-center">
      <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
        <h2 class="text-lg">{{ $t('payments.incomes.newForm.header') }}</h2>

        <FormInput type="date"
                   v-model="form.date"
                   :label="$t('payments.incomes.newForm.date.label')"
        />

        <FormInput type="number"
                   v-model="form.amount"
                   :label="$t('payments.incomes.newForm.amount.label')"
        />

        <FormInput type="text"
                   v-model="form.information"
                   :label="$t('payments.incomes.newForm.information.label')"
        />

        <CurrencySelect v-model="form.currency" />

        <MediumButtonWithIcon :text="$t('payments.incomes.newForm.submit.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              @button-click="onSubmit"
        />

      </div>
    </div>
  </Container>
</template>
<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Container            from "@/components/Ui/Containers/Container.vue";
import FormInput            from "@/components/Form/Input.vue";
import CurrencySelect       from "@/views/Modules/Payments/Components/CurrencySelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyPaymentsRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";

export default {
  data(): ComponentData {
    return {
      form: {
        date: null,
        amount: null,
        information: null,
        currency: null,
      },
    }
  },
  props: {
    id: {
      type: [Number, null],
      required: false,
      default: null
    },
    date: {
      type: [String, null],
      required: false,
      default: null
    },
    amount: {
      type: [Number, null],
      required: false,
      default: null
    },
    information: {
      type: [String, null],
      required: false,
      default: null
    },
    currency: {
      type: [String, null],
      required: false,
      default: null
    },
  },
  components: {
    MediumButtonWithIcon,
    Container,
    FormInput,
    CurrencySelect,
  },
  methods: {
    /**
     * @description resets the form state
     */
    clearForm(): void {
      this.form.date = null;
      this.form.amount = null;
      this.form.information = null;
      this.form.currency = null;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyPaymentsRoutes.INCOMES_BASE_URL, this.id, BaseApiResponse, this.form);
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
    this.form.date = this.date;
    this.form.amount = this.amount;
    this.form.information = this.information;
    this.form.currency = this.currency;
  }
}
</script>
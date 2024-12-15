<template>
  <div class="flex justify-center mt-10">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ header }}</h2>
      <FormInput type="text"
                 v-model="form.target"
                 :label="$t('payments.moneyOwed.newForm.target.label')"
      />

      <FormInput type="text"
                 v-model="form.information"
                 :label="$t('payments.moneyOwed.newForm.information.label')"
      />

      <FormInput type="date"
                 v-model="form.date"
                 :label="$t('payments.moneyOwed.newForm.date.label')"
      />

      <FormInput type="number"
                 v-model="form.amount"
                 :label="$t('payments.moneyOwed.newForm.amount.label')"
      />

      <CurrencySelect v-model="form.currency" />

      <div class="mt-4 mb-4 flex flex-row hover:opacity-70 cursor-pointer">
        <Checkbox class="transform scale-75"
                  v-model="form.owedByMe"
                  ref="checkbox"
        />
        <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
               @click="this.$refs.checkbox.toggle()"
        >
          {{ $t('payments.moneyOwed.newForm.owedByMe.label') }}
        </label>
      </div>

      <MediumButtonWithIcon :text="$t('payments.productPrices.newForm.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onSubmit"
      />

    </div>
  </div>
</template>
<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";
import Checkbox             from "@/components/Form/Checkbox.vue";
import CurrencySelect       from "@/views/Modules/Payments/Components/CurrencySelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyPaymentsRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";

export default {
  data(): ComponentData {
    return {
      form: {
        target: null,
        information: null,
        date: null,
        amount: null,
        currency: null,
        owedByMe: false,
      },
    }
  },
  props: {
    header: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: [Number, null],
      required: false,
      default: null,
    },
    target: {
      type: [String, null],
      required: false,
      default: null,
    },
    amount: {
      type: [Number, null],
      required: false,
      default: null,
    },
    information: {
      type: [String, null],
      required: false,
      default: null,
    },
    date: {
      type: [String, null],
      required: false,
      default: null,
    },
    currency: {
      type: [String, null],
      required: false,
      default: null,
    },
    owedByMe: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  components: {
    CurrencySelect,
    Checkbox,
    MediumButtonWithIcon,
    FormInput,
  },
  methods: {
    /**
     * @description wipes the form data
     */
    clearForm(): void {
      this.form.target = null;
      this.form.information = null;
      this.form.date = null;
      this.form.amount = null;
      this.form.currency = null;
      this.form.owedByMe = null;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyPaymentsRoutes.MONEY_OWED_BASE_URL, this.id, BaseApiResponse, this.form);
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
    this.form.target = this.target;
    this.form.information = this.information;
    this.form.date = this.date;
    this.form.amount = this.amount;
    this.form.currency = this.currency;
    this.form.owedByMe = this.owedByMe;
  }
}
</script>
<template>
  <div class="flex justify-center mt-10">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ header }}</h2>

      <FormInput type="text"
                 v-model="form.name"
                 :is-required="true"
                 :label="$t('payments.productPrices.newForm.name.label')"
      />

      <FormInput type="number"
                 v-model="form.price"
                 :is-required="true"
                 :label="$t('payments.productPrices.newForm.price.label')"
      />

      <FormInput type="text"
                 v-model="form.market"
                 :label="$t('payments.productPrices.newForm.market.label')"
      />

      <FormInput type="text"
                 v-model="form.products"
                 :label="$t('payments.productPrices.newForm.products.label')"
      />

      <FormInput type="text"
                 v-model="form.information"
                 :is-required="true"
                 :label="$t('payments.productPrices.newForm.information.label')"
      />

      <div class="mb-4 flex flex-row hover:opacity-70 cursor-pointer">
        <Checkbox class="transform scale-75"
                  v-model="form.rejected"
                  ref="checkbox"
        />
        <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
               @click="this.$refs.checkbox.toggle()"
        >
          {{ $t('payments.productPrices.newForm.rejected.label') }}
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

import FormInput            from "@/components/Form/Input.vue";
import Checkbox             from "@/components/Form/Checkbox.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import SymfonyPaymentsRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

export default {
  data(): ComponentData {
    return {
      form: {
        name: null,
        price: null,
        market: null,
        products: null,
        information: null,
        rejected: false,
      },
    }
  },
  props: {
    id: {
      type: [Number, null],
      required: false,
      default: null,
    },
    header: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: [String, null],
      required: false,
      default: null
    },
    market: {
      type: [String, null],
      required: false,
      default: null
    },
    products: {
      type: [String, null],
      required: false,
      default: null
    },
    information: {
      type: [String, null],
      required: false,
      default: null
    },
    rejected: {
      type: Boolean,
      required: false,
      default: false
    },
    price: {
      type: [Number, null],
      required: false,
      default: null
    },
    homeCurrencyPrice: {
      type: [Number, null],
      required: false,
      default: null
    },
  },
  components: {
    FormInput,
    Checkbox,
    MediumButtonWithIcon,
  },
  methods: {
    /**
     * @description clears the form data
     */
    clearForm(): void {
      this.form.name = null;
      this.form.price = null;
      this.form.market = null;
      this.form.products = null;
      this.form.information = null;
      this.form.rejected = false;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyPaymentsRoutes.PRODUCT_PRICES_BASE_URL, this.id, BaseApiResponse, this.form);
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
    this.form.name = this.name;
    this.form.price = this.price;
    this.form.market = this.market;
    this.form.products = this.products;
    this.form.information = this.information;
    this.form.rejected = this.rejected;
  }
}
</script>
<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ header }}</h2>

      <div>
        <FormInput type="text"
                   v-model="form.name"
                   :is-required="true"
                   :label="$t('payments.settings.tab.monthlyImport.tab.profile.form.element.name.label')"
        />

        <FormInput type="text"
                   v-model="form.currencyField"
                   :is-required="true"
                   :label="$t('payments.settings.tab.monthlyImport.tab.profile.form.element.currencyField.label')"
        />

        <FormInput type="text"
                   v-model="form.descriptionField"
                   :is-required="true"
                   :label="$t('payments.settings.tab.monthlyImport.tab.profile.form.element.descriptionField.label')"
        />

        <FormInput type="text"
                   v-model="form.moneyField"
                   :is-required="true"
                   :label="$t('payments.settings.tab.monthlyImport.tab.profile.form.element.moneyField.label')"
        />

        <FormInput type="text"
                   v-model="form.dateField"
                   :is-required="true"
                   :label="$t('payments.settings.tab.monthlyImport.tab.profile.form.element.dateField.label')"
        />
      </div>

      <MediumButtonWithIcon :text="$t('payments.settings.tab.monthlyImport.tab.profile.form.element.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyPaymentsRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";

export default {
  data(): ComponentData {
    return {
      form: {
        name: null,
        currencyField: null,
        descriptionField: null,
        moneyField: null,
        dateField: null,
      }
    }
  },
  props: {
    header: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: [Number, null],
      required: false,
      default: null
    },
    name: {
      type: [String, null],
      required: false,
      default: null
    },
    currencyField: {
      type: [String, null],
      required: false,
      default: null
    },
    descriptionField: {
      type: [String, null],
      required: false,
      default: null
    },
    moneyField: {
      type: [String, null],
      required: false,
      default: null
    },
    dateField: {
      type: [String, null],
      required: false,
      default: null
    },
  },
  components: {
    FormInput,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description resets the form state
     */
    clearForm(): void {
      this.form.name = '';
      this.form.currencyField = '';
      this.form.descriptionField = '';
      this.form.moneyField = '';
      this.form.dateField = '';
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyPaymentsRoutes.SETTINGS_PAYMENT_MONTHLY_IMPORT_PROFILES, this.id, BaseApiResponse, this.form);
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
    this.form.currencyField = this.currencyField;
    this.form.descriptionField = this.descriptionField;
    this.form.moneyField = this.moneyField;
    this.form.dateField = this.dateField;
  }
}
</script>
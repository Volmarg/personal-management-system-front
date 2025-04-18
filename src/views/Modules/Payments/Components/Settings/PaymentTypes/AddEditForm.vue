<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ header }}</h2>

      <FormInput type="text"
                 v-model="form.name"
                 :is-required="true"
                 :label="$t('payments.settings.tab.paymentTypes.table.newForm.typeName.label')"
      />

      <MediumButtonWithIcon :text="$t('payments.settings.tab.paymentTypes.table.newForm.submit.label')"
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

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyPaymentsRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";

export default {
  components: {FormInput, MediumButtonWithIcon},
  data(): ComponentData {
    return {
      form: {
        name: null,
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
    }
  },
  methods: {
    /**
     * @description resets the form state
     */
    clearForm(): void {
      this.form.name = '';
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyPaymentsRoutes.SETTINGS_PAYMENT_TYPE_BASE_URL, this.id, BaseApiResponse, this.form);
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
  }
}
</script>
<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ $t('payments.settings.tab.other.currencyMultiplier.form.header') }}</h2>

      <FormInput type="text"
                 v-model="form.currencyMultiplier"
                 :label="$t('payments.settings.tab.other.currencyMultiplier.form.currencyMultiplier.label')"
      />

      <MediumButtonWithIcon :text="$t('payments.settings.tab.other.currencyMultiplier.form.submit.label')"
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


import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyPaymentsRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";

export default {
  data(): ComponentData {
    return {
      form: {
        currencyMultiplier: null,
      }
    }
  },
  components: {
    FormInput,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description sends the multiplier value to the backend
     */
    async onSubmit(): void {
      let response: BaseApiResponse;
      let config = new BackendModuleCallConfig(SymfonyPaymentsRoutes.SETTINGS_CURRENCY_MULTIPLIER_BASE_URL, this.id, BaseApiResponse, this.form);
      config.reload = false;

      response = await this.$moduleCall.update(config);
      if (response.success) {
        this.$emit('submit');
      }
    }
  },
  async beforeMount(): Promise<void> {
    let entry = await this.$moduleCall.get(SymfonyPaymentsRoutes.SETTINGS_CURRENCY_MULTIPLIER_BASE_URL)
    this.form.currencyMultiplier = entry.value;
  }
}
</script>

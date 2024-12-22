<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg mb-2">{{ header }}</h2>

      <FormInput type="number"
                 v-model="form.year"
                 :label="$t('job.settings.tabs.managePool.form.year.label')"
      />

      <FormInput type="text"
                 v-model="form.days"
                 :label="$t('job.settings.tabs.managePool.form.daysInPool.label')"
      />

      <FormInput type="text"
                 v-model="form.companyName"
                 :label="$t('job.settings.tabs.managePool.form.companyName.label')"
      />

      <MediumButtonWithIcon :text="$t('job.settings.tabs.managePool.form.submit.label')"
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

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import SymfonyJobRoutes        from "@/router/SymfonyRoutes/Modules/SymfonyJobRoutes";

export default {
  data(): ComponentData {
    return {
      form: {
        year: null,
        days: null,
        companyName: null,
      }
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
    year: {
      type: [Number, null],
      required: false,
      default: null,
    },
    days: {
      type: [String, null],
      required: false,
      default: null,
    },
    companyName: {
      type: [String, null],
      required: false,
      default: null,
    },
  },
  components: {
    MediumButtonWithIcon,
    FormInput,
  },
  methods: {
    /**
     * @description wipes the form data
     */
    clearForm(): void {
      this.form.year = null;
      this.form.days = null;
      this.form.companyName = null;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyJobRoutes.HOLIDAYS_POOL_BASE_URL, this.id, BaseApiResponse, this.form);
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
    this.form.year = this.year;
    this.form.days = this.days;
    this.form.companyName = this.companyName;
  }
}
</script>
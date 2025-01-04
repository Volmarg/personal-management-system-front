<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ header }}</h2>
      <FormInput type="text"
                 v-model="form.name"
                 :label="$t('shopping.plans.form.name.label')"
      />

      <FormInput type="text"
                 v-model="form.information"
                 :label="$t('shopping.plans.form.information.label')"
      />

      <FormInput type="text"
                 v-model="form.example"
                 :label="$t('shopping.plans.form.example.label')"
      />

      <MediumButtonWithIcon :text="$t('shopping.plans.form.submit.label')"
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
import SymfonyShoppingRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyShoppingRoutes";

export default {
  data(): ComponentData {
    return {
      form: {
        name: null,
        information: null,
        example: null,
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
    name: {
      type: [String, null],
      required: false,
      default: null,
    },
    information: {
      type: [String, null],
      required: false,
      default: null,
    },
    example: {
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
      this.form.name = null;
      this.form.information = null;
      this.form.example = null;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyShoppingRoutes.PLANS_BASE_URL, this.id, BaseApiResponse, this.form);
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
    this.form.information = this.information;
    this.form.example = this.example;
  }
}
</script>
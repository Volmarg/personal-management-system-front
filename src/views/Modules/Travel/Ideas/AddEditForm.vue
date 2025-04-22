<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <FormInput type="text"
                 v-model="formData.location"
                 :is-required="true"
                 :label="$t('travels.ideas.form.location.label')"
      />

      <FormInput type="text"
                 v-model="formData.country"
                 :is-required="true"
                 :label="$t('travels.ideas.form.country.label')"
      />

      <FormInput type="text"
                 v-model="formData.imageUrl"
                 :is-required="true"
                 :label="$t('travels.ideas.form.image.label')"
      />

      <FormInput type="text"
                 v-model="formData.mapUrl"
                 :label="$t('travels.ideas.form.map.label')"
      />

      <CategorySelect v-model="formData.category" />

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
import CategorySelect       from "@/views/Modules/Travel/Ideas/CategorySelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import SymfonyTravelsRoutes    from "@/router/SymfonyRoutes/Modules/SymfonyTravelsRoutes";

export default {
  data(): ComponentData {
    return {
      formData: {...this.locationData},
    }
  },
  props: {
    locationData: {
      type: Object,
      required: true,
    },
  },
  components: {
    CategorySelect,
    MediumButtonWithIcon,
    FormInput,
  },
  emits: [
    'submit'
  ],
  methods: {
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let data = {
        ...this.formData,
        "category": this.formData.category[0] ?? null,
      }

      let config = new BackendModuleCallConfig(SymfonyTravelsRoutes.IDEAS_BASE_URL, data.id ?? null, BaseApiResponse, data);
      config.reload = false;

      let response: BaseApiResponse;
      if (data.id) {
        response = await this.$moduleCall.update(config);
      } else {
        response = await this.$moduleCall.new(config);
      }

      if (response.success) {
        this.$emit('submit');
      }
    }
  },
  beforeMount(): void {
    this.formData = this.locationData;
  },
}
</script>
<template>
  <div class="flex justify-center">
    <div class="mt-6 w-full flex flex-col">
      <h2 class="text-lg mb-2 text-center">{{ header }}</h2>
      <FormInput type="text"
                 v-model="form.name"
                 :is-required="true"
                 :label="$t('health.overview.form.illness.element.name.label')"
      />

      <FormTextArea
          v-model="form.information"
          rows="4"
          :is-required="true"
          :label="$t('health.overview.form.illness.element.information.label')"
      />

      <MediumButtonWithIcon :text="$t('health.overview.form.illness.element.submit.label')"
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
import FormTextArea         from "@/components/Form/TextArea.vue";

import {IllnessStore} from "@/scripts/Vue/Store/Module/Health/IllnessStore";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BaseApiResponse from "@/scripts/Response/BaseApiResponse";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyHealthRoutes     from "@/router/SymfonyRoutes/Modules/SymfonyHealthRoutes";

export default {
  data(): ComponentData {
    return {
      form: {
        name: '',
        information: '',
      }
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
      required: true,
    },
    initialName: {
      type: String,
      required: false,
      default: ""
    },
    initialInformation: {
      type: String,
      required: false,
      default: ""
    },
    appointmentIds: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    }
  },
  emits: [
    'submit'
  ],
  components: {
    FormTextArea,
    FormInput,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let dataBag = {
        name: this.form.name,
        information: this.form.information,
        appointmentIds: this.appointmentIds,
      };

      let config = new BackendModuleCallConfig(SymfonyHealthRoutes.HEALTH_ILLNESS_BASE_URL, this.id, BaseApiResponse, dataBag);
      config.reload = false;

      if (this.id) {
        await this.$moduleCall.update(config);
      } else {
        await this.$moduleCall.new(config);
      }

      IllnessStore().getAll();
    }
  },
  mounted(): void {
    this.form.name = this.initialName;
    this.form.information = this.initialInformation;
  }
}
</script>
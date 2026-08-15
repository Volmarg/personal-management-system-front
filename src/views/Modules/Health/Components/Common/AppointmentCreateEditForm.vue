<template>
  <div class="flex justify-center">
    <div class="mt-6 w-full flex flex-col">
      <h2 class="text-lg mb-2 text-center">{{ header }}</h2>
      <FormInput type="datetime-local"
                 v-model="form.date"
                 :is-required="true"
                 :label="$t('health.overview.tabs.subTabs.tabs.appointments.createEditForm.element.date.label')"
      />

      <DoctorSelect v-model="form.doctorId" />

      <FormTextArea
          class="mt-6"
          v-model="form.information"
          rows="4"
          :is-required="true"
          :label="$t('health.overview.tabs.subTabs.tabs.appointments.createEditForm.element.information.label')"
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
import DoctorSelect         from "@/views/Modules/Health/Components/Common/DoctorSelect.vue";

import {DoctorAppointmentStore} from "@/scripts/Vue/Store/Module/Health/AppointmentStore";
import {IllnessStore}           from "@/scripts/Vue/Store/Module/Health/IllnessStore";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BaseApiResponse from "@/scripts/Response/BaseApiResponse";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyHealthRoutes     from "@/router/SymfonyRoutes/Modules/SymfonyHealthRoutes";

export default {
  data(): ComponentData {
    return {
      form: {
        date: '',
        information: '',
        doctorId: null,
      }
    }
  },
  props: {
    header: {
      type: String,
      required: true,
    },
    initialDate: {
      type: String,
      required: false,
      default: ""
    },
    initialInformation: {
      type: String,
      required: false,
      default: ""
    },
    initialDoctorId: {
      type: [Number, null],
      required: false,
      default: null
    },
    illness: {
      type: Object,
      required: true,
    }
  },
  emits: [
    'submit'
  ],
  components: {
    DoctorSelect,
    FormTextArea,
    FormInput,
    MediumButtonWithIcon
  },
  methods: {
    clearForm(): void {
      this.form.information = '';
      this.form.doctorId = '';
      this.form.date = '';
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {

      let dataBag = {
        information: this.form.information,
        doctor: this.form.doctorId,
        date: this.form.date,
        illness: this.illness.id
      };

      let config = new BackendModuleCallConfig(SymfonyHealthRoutes.HEALTH_DOCTOR_APPOINTMENT_BASE_URL, this.id, BaseApiResponse, dataBag);
      config.reload = false;

      if (this.id) {
        await this.$moduleCall.update(config);
      } else {
        await this.$moduleCall.new(config);
      }

      IllnessStore().getAll();
      DoctorAppointmentStore().getAll();
      this.clearForm();
    }
  },
  mounted(): void {
    this.form.date = this.initialDate;
    this.form.information = this.initialInformation;
    this.form.doctorId = this.initialDoctorId;
  }
}
</script>
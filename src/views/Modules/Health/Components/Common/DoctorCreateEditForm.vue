<template>
  <div class="flex justify-center">
    <div class="mt-6 w-full flex flex-col">
      <h2 class="text-lg mb-2 text-center"
          v-if="header"
      >
        {{ header }}
      </h2>
      <FormInput type="text"
                 v-model="form.name"
                 max-chars="30"
                 :is-required="true"
                 :label="$t('health.overview.tabs.doctors.modal.createEdit.form.name.label')"
      />
      <FormInput type="text"
                 v-model="form.address"
                 max-chars="40"
                 :is-required="true"
                 :label="$t('health.overview.tabs.doctors.modal.createEdit.form.address.label')"
      />
      <FormInput type="text"
                 v-model="form.specialisation"
                 max-chars="40"
                 :is-required="true"
                 :label="$t('health.overview.tabs.doctors.modal.createEdit.form.specialisation.label')"
      />

      <FormTextArea
          v-model="form.information"
          rows="6"
          max-chars="400"
          :is-required="true"
          :label="$t('health.overview.tabs.doctors.modal.createEdit.form.information.label')"
      />

      <ContactsManagement ref="contactsManagement"
                          :contacts-initial-value="initialContacts"
      />

      <MediumButtonWithIcon :text="$t('health.overview.tabs.doctors.modal.createEdit.form.submit.label')"
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
import ContactsManagement   from "@/views/Modules/Health/Components/Common/DoctorContact/ContactsManagement.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";


import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyHealthRoutes     from "@/router/SymfonyRoutes/Modules/SymfonyHealthRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";

import {DoctorStore} from "@/scripts/Vue/Store/Module/Health/DoctorStore";

export default {
  data(): ComponentData {
    return {
      doctorStore: null,
      form: {
        name: '',
        information: '',
        address: '',
        specialisation: '',
      }
    }
  },
  props: {
    header: {
      type: [String, null],
      required: false,
      default: null,
    },
    id: {
      type: [Number, null],
      required: false,
      default: null
    },
    initialName: {
      type: String,
      required: false,
      default: ""
    },
    initialAddress: {
      type: String,
      required: false,
      default: ""
    },
    initialSpecialisation: {
      type: String,
      required: false,
      default: ""
    },
    initialInformation: {
      type: String,
      required: false,
      default: ""
    },
    initialContacts: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: [
    'submit'
  ],
  components: {
    FormTextArea,
    FormInput,
    MediumButtonWithIcon,
    ContactsManagement,
  },
  methods: {
    /**
     * @description resets all form data
     */
    clearForm(): void {
      this.form.information = '';
      this.form.name = '';
      this.form.address = '';
      this.form.specialisation = '';
      this.$refs.contactsManagement.clear();
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let dataBag = {
        name:           this.form.name,
        information:    this.form.information,
        address:        this.form.address,
        specialisation: this.form.specialisation,
        contacts:       this.$refs?.contactsManagement?.contacts ?? []
      };

      let config = new BackendModuleCallConfig(SymfonyHealthRoutes.HEALTH_DOCTOR_BASE_URL, this.id, BaseApiResponse, dataBag);
      config.reload = false;

      let updateResponse = null as BaseApiResponse | null;
      if (this.id) {
        updateResponse = await this.$moduleCall.update(config);
      } else {
        await this.$moduleCall.new(config);
      }

      this.doctorStore.getAll();

      if (!updateResponse || updateResponse.success) {
        this.clearForm();
        this.$emit('submit');
      }
    }
  },
  beforeMount(): void {
    this.doctorStore = DoctorStore();
  },
  mounted(): void {
    this.form.date = this.initialDate;
    this.form.name = this.initialName;
    this.form.address = this.initialAddress;
    this.form.information = this.initialInformation;
    this.form.specialisation = this.initialSpecialisation;
  }
}
</script>
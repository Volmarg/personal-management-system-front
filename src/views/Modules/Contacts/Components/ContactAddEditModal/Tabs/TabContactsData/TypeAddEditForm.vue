<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ header }}</h2>
      <FormInput type="text"
                 v-model="form.value"
                 :label="$t('contacts.list.modal.addEdit.typeForm.value.label')"
      />

      <TypeSelect v-model="form.typeId"
                  :name="typeName"
                  class="mb-6"
                  ref="typeSelect"
      />

      <MediumButtonWithIcon :text="$t('contacts.list.modal.addEdit.typeForm.submit.label')"
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
import MediumButtonWithIcon     from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput                from "@/components/Form/Input.vue";
import TypeSelect               from "@/views/Modules/Contacts/Components/TypeSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import SymfonyContactsRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyContactsRoutes";

export default {
  data(): ComponentData {
    return {
      form: {
        typeId: null,
        value: null,
      },
    }
  },
  props: {
    uuid: {
      type: [Number, null],
      required: false,
      default: null,
    },
    header: {
      type: [String, null],
      required: false,
      default: null,
    },
    typeId: {
      type: [Number, null],
      required: false,
      default: null,
    },
    typeName: {
      type: [String, null],
      required: false,
      default: null,
    },
    contactId: {
      type: [Number, null],
      required: false,
      default: null,
    },
    value: {
      type: [String, null],
      required: false,
      default: null,
    },
  },
  components: {
    MediumButtonWithIcon,
    TypeSelect,
    FormInput,
  },
  methods: {
    /**
     * @description clears the form
     */
    clearForm(): void {
      this.$refs.typeSelect.clear();
      this.form.value = null;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let data = {
        "typeId": this.form.typeId,
        "value": this.form.value,
        "contactId": this.contactId,
        "uuid": this.uuid,
      }

      let config = new BackendModuleCallConfig(SymfonyContactsRoutes.CONTACT_TYPES_BASE_URL, null, BaseApiResponse, data);
      config.reload = false;

      let response: BaseApiResponse;
      if (this.uuid) {
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
  async beforeMount(): Promise<void> {
    this.form.typeId = this.typeId;
    this.form.value = this.value;
  },
}
</script>
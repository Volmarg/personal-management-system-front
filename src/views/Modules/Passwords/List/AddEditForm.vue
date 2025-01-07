<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ header }}</h2>
      <FormInput type="text"
                 v-model="form.login"
                 :label="$t('passwords.list.form.new.login.label')"
      />

      <FormInput type="text"
                 v-model="form.url"
                 :label="$t('passwords.list.form.new.url.label')"
      />

      <FormInput type="text"
                 v-model="form.description"
                 :label="$t('passwords.list.form.new.description.label')"
      />

      <GroupSelect v-model="form.groupId"
                   class="mb-6"
      />

      <PasswordWithConfirmation @both-passwords-changed="form.password = $event"
                                @password-changed="form.password = $event"
                                v-model="form.password"
                                ref="passwordWithConfirmation"
      />

      <MediumButtonWithIcon :text="$t('passwords.list.form.new.submitButton.label')"
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
import MediumButtonWithIcon     from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput                from "@/components/Form/Input.vue";
import PasswordWithConfirmation from "@/components/Form/PasswordWithConfirmation.vue";
import GroupSelect              from "@/views/Modules/Passwords/Components/GroupSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyPasswordsRoutes  from "@/router/SymfonyRoutes/Modules/SymfonyPasswordsRoutes";
import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";

export default {
  data(): ComponentData {
    return {
      form: {
        login: null,
        password: null,
        url: null,
        description: null,
        groupId: null,
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
    login: {
      type: [String, null],
      required: false,
      default: null,
    },
    password: {
      type: [String, null],
      required: false,
      default: null,
    },
    url: {
      type: [String, null],
      required: false,
      default: null,
    },
    description: {
      type: [String, null],
      required: false,
      default: null,
    },
    groupId: {
      type: [Number, null],
      required: false,
      default: null,
    },
  },
  components: {
    GroupSelect,
    PasswordWithConfirmation,
    MediumButtonWithIcon,
    FormInput,
  },
  methods: {
    /**
     * @description wipes the form data
     */
    clearForm(): void {
      this.form.login = null;
      this.form.url = null;
      this.form.description = null;
      this.form.groupId = null;
      this.$refs.passwordWithConfirmation.clear();
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyPasswordsRoutes.PASSWORDS_BASE_URL, this.id, BaseApiResponse, this.form);
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
  async beforeMount(): Promise<void> {
    this.form.login = this.login;
    this.form.password = this.password;
    this.form.url = this.url;
    this.form.description = this.description;
    this.form.groupId = this.groupId;
  },
}
</script>
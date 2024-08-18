<template>
  <password-with-preview :shown-label="$t('views.register.form.password.label')"
                         :violations="violations.password"
                         :disabled="disabled"
                         @password-changed="onPasswordChanged"
                         @password-generated="onPasswordGenerated"
  >

    <vue-input
        type="password"
        :label="$t('views.register.form.confirmPassword.label')"
        class="mt-6 mb-0-force"
        :is-required="true"
        :errors="violations.confirmedPassword"
        :is-disabled="disabled"
        v-model="confirmedPassword"
        @input="onConfirmPasswordInput()"
    />

  </password-with-preview>

</template>

<script lang="ts">
import VueInput            from "@/components/Form/Input.vue";
import PasswordWithPreview from "@/components/Form/PasswordWithPreview.vue";
import useVuelidate        from "@vuelidate/core";

import VuelidateHandler   from "@/scripts/Vue/Mixins/VuelidateHandler.vue";
import {helpers, required, sameAs} from "@vuelidate/validators";
import {
  ComponentData,
  ComponentSetup,
  ComponentValidation
} from "@/scripts/Vue/Types/Components/types";

export default {
  name: "PasswordWithConfirmation.vue",
  setup: (): ComponentSetup => ({ v$: useVuelidate() }),
  data(): ComponentData {
    return {
      password          : "",
      confirmedPassword : "",
      violations        : {
        password: [],
        confirmedPassword: []
      }
    }
  },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  validations(): ComponentValidation {
    return {
      password: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      confirmedPassword: {
        required: helpers.withMessage(this.$t('validations.required'), required),
        sameAsPassword: sameAs(this.password, 'password')
      }
    }
  },
  emits: [
    'confirmPasswordChanged',
    'passwordChanged',
    'bothPasswordsChanged',
  ],
  mixins: [
    VuelidateHandler,
  ],
  methods: {
    /**
     * @description handle case when password changes
     */
    onPasswordChanged(password: string): void {
      this.password = password;
      this.$emit('passwordChanged', this.password)
    },
    /**
     * @description handle case when password is generated
     */
    onPasswordGenerated(password: string): void {
      this.confirmedPassword = password;
      this.password          = password;
      this.$emit('bothPasswordsChanged', password);
    },
    /**
     * @description handle case when confirm password changes
     */
    onConfirmPasswordInput(): void {
      this.$emit('confirmPasswordChanged', this.confirmedPassword)
    },
    /**
     * @description will validate the input
     */
    validateInput(): boolean {
      this.v$.$validate();
      this.violations = this.vuelidateErrorsToArrayOfViolationsForProperties(this.v$.$errors);

      return this.isVuelidateResultValid;
    }
  },
  components: {
    "password-with-preview" : PasswordWithPreview,
    "vue-input"             : VueInput
  },
}
</script>
<template>
  <password-with-preview :shown-label="usedPasswordLabel"
                         :violations="violations.password"
                         :disabled="disabled"
                         @password-changed="onPasswordChanged"
                         @password-generated="onPasswordGenerated"
                         v-model="password"
  >

    <vue-input
        type="password"
        :label="usedConfirmPasswordLabel"
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

import ValueValidationAwareMixin from "@/mixins/Awarness/ValueValidationAwareMixin.vue";

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
      password          : this.modelValue,
      confirmedPassword : null,
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
    },
    modelValue: {
      required: false,
      default: ""
    },
    passwordLabel: {
      type: [String, null],
      required: false,
      default: null,
    },
    confirmPasswordLabel: {
      type: [String, String],
      required: false,
      default: null,
    }
  },
  validations(): ComponentValidation {
    return {
      password: {
        required: helpers.withMessage(this.msgRequiredField, required),
      },
      confirmedPassword: {
        required: helpers.withMessage(this.msgRequiredField, required),
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
    ValueValidationAwareMixin,
  ],
  computed: {
    /**
     * @description returns password input label
     */
    usedPasswordLabel(): string {
      return this.passwordLabel ? this.passwordLabel : this.$t('security.register.form.password.label');
    },
    /**
     * @description returns password confirmation input label
     */
    usedConfirmPasswordLabel(): string {
      return this.confirmPasswordLabel ? this.confirmPasswordLabel : this.$t('security.register.form.confirmPassword.label');
    },
  },
  methods: {
    /**
     * @description clears the inputs
     */
    clear(): void {
      this.password = null;
      this.confirmedPassword = null;
    },
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
      this.violations = this.vuelidateErrorsToPropsViolation(this.v$.$errors);

      return this.isVuelidateResultValid;
    }
  },
  watch: {
    modelValue(): void {
      this.password = this.modelValue;
    }
  },
  components: {
    "password-with-preview" : PasswordWithPreview,
    "vue-input"             : VueInput
  },
}
</script>
<template>
  <div>

    <div data-layout="centered" class="w-full flex items-center justify-center bg-gray-50 pt-10 pb-10">
      <div class="flex flex-col bg-white border border-gray-200 p-8 w-full max-w-2xl">
        <div class="flex flex-col w-full mb-4">
          <div class="text-xs uppercase">
            {{ $t('security.register.header.label')}}
          </div>
        </div>
        <div class="flex flex-col">
          <div class="form flex flex-wrap w-full">
            <div class="w-full">

              <div class="two-inputs-per-row">
                <vue-input
                    type="email"
                    :label="$t('security.register.form.email.label')"
                    :is-required="true"
                    :errors="violations.email"
                    :is-disabled="systemDisabledState.isDisabled"
                    v-model="form.email"
                />

                <vue-input
                    type="text"
                    :label="$t('security.register.form.username.label')"
                    :is-required="true"
                    :errors="violations.username"
                    :is-disabled="systemDisabledState.isDisabled"
                    v-model="form.username"
                />
              </div>

              <password-with-confirmation @confirm-password-changed="onConfirmPasswordChanged"
                                          @password-changed="onPasswordChanged"
                                          @both-passwords-changed="bothPasswordsChanged"
                                          ref="passwordWithConfirmation"
                                          class="mb-6"
                                          :disabled="systemDisabledState.isDisabled"
              />

              <password-with-confirmation @confirm-password-changed="onConfirmLockPasswordChanged"
                                          @password-changed="onLockPasswordChanged"
                                          @both-passwords-changed="onBothLockPasswordsChanged"
                                          ref="lockPasswordWithConfirmation"
                                          class="mb-6"
                                          :disabled="systemDisabledState.isDisabled"
                                          :password-label="$t('security.register.form.lockPassword.text')"
                                          :confirm-password-label="$t('security.register.form.confirmLockPassword.label')"
              />

            </div>

            <p>
              {{ $t('generic.asteriskFieldsAreRequired') }} <asterisk-required/>
            </p>

            <div class="flex flex-col sm:flex-row w-full mt-2 mb-2">
              <MediumButtonWithIcon @click="onRegisterSubmit()"
                                    top-wrapper-classes="w-full sm:w-auto"
                                    button-classes="w-full sm:w-auto"
                                    text-classes="text-center w-full"
                                    :text="$t('security.register.form.submit.label')"
                                    :disabled="systemDisabledState.isDisabled"
              />
            </div>

          </div>
        </div>

        <!-- Login -->
        <div class="flex flex-row w-full mt-1">
          <span class="text-secondary mr-1">{{ $t('security.register.texts.links.alreadyGotAnAccount.label') }}</span>
          <span>
          <router-link :to="routePaths.login"
                       class="link"
          >{{ $t('security.register.texts.links.alreadyGotAnAccount.linkText') }}</router-link>
        </span>
        </div>

      </div>

    </div>

  </div>
</template>

<script lang="ts">
import BaseApiResponseViolationsToDataFieldsViolations from "@/scripts/Vue/Mixins/BaseApiResponseViolationsToDataFieldsViolations.vue";
import ResponseHandlerMixin                            from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";
import ValueValidationAwareMixin                       from "@/mixins/Awarness/ValueValidationAwareMixin.vue";

import VueInput                 from "@/components/Form/Input.vue";
import AsteriskRequired         from "@/components/Form/AsteriskRequired.vue";
import PasswordWithConfirmation from "@/components/Form/PasswordWithConfirmation.vue";
import MediumButtonWithIcon     from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import VuelidateHandler         from "@/scripts/Vue/Mixins/VuelidateHandler.vue";

import {ToastTypeEnum}   from "@/scripts/Libs/ToastNotification";
import SymfonyRoutes     from "@/router/SymfonyRoutes";
import VueRouter         from "@/router/VueRouter";
import useVuelidate      from "@vuelidate/core";
import {email, helpers, required} from "@vuelidate/validators";
import {
  ComponentData,
  ComponentSetup,
  ComponentValidation
} from "@/scripts/Vue/Types/Components/types";
import {systemDisabledStore} from "@/scripts/Vue/Store/SystemDisabledState";
import SymfonySecurityRoutes from "@/router/SymfonyRoutes/SymfonySecurityRoutes";

export default {
  setup: (): ComponentSetup => ({ v$: useVuelidate() }),
  data(): ComponentData {
    return {
      form: {
        email: ""
      },
      systemDisabledState: systemDisabledStore(),
      email: "",
      username: "",
      password: "",
      passwordConfirmed: "",
      lockPassword: "",
      lockPasswordConfirmed: "",
      routePaths: {
        login: VueRouter.ROUTE_PATH_LOGIN,
      },
      violations: {
        email             : [],
        username          : [],
        password          : [],
        passwordConfirmed : [],
        lockPassword          : [],
        lockPasswordConfirmed : [],
      },
    }
  },
  validations(): ComponentValidation{
    return {
      form: {
        email: {
          required: helpers.withMessage(this.msgRequiredField, required),
          email,
        },
        username: {
          required: helpers.withMessage(this.msgRequiredField, required),
        },
        password: {
          required: helpers.withMessage(this.msgRequiredField, required),
        },
        passwordConfirmed: {
          required: helpers.withMessage(this.msgRequiredField, required),
        },
        lockPassword: {
          required: helpers.withMessage(this.msgRequiredField, required),
        },
        lockPasswordConfirmed: {
          required: helpers.withMessage(this.msgRequiredField, required),
        }
      },
    }
  },
  mixins: [
    BaseApiResponseViolationsToDataFieldsViolations,
    ResponseHandlerMixin,
    VuelidateHandler,
    ValueValidationAwareMixin,
  ],
  methods: {
    /**
     * @description handles confirmation password change event
     */
    onConfirmPasswordChanged(confirmationPassword: string): void {
      this.form.passwordConfirmed = confirmationPassword;
    },
    /**
     * @description handles password change event
     */
    onPasswordChanged(password: string): void {
      this.form.password = password;
    },
    /**
     * @description handles password change event
     */
    bothPasswordsChanged(password: string): void {
      this.form.password          = password;
      this.form.passwordConfirmed = password;
    },
    /**
     * @description handles confirmation lock password change event
     */
    onConfirmLockPasswordChanged(confirmationPassword: string): void {
      this.form.lockPasswordConfirmed = confirmationPassword;
    },
    /**
     * @description handles lock password change event
     */
    onLockPasswordChanged(password: string): void {
      this.form.lockPassword = password;
    },
    /**
     * @description handles lock password change event
     */
    onBothLockPasswordsChanged(password: string): void {
      this.form.lockPassword = password;
      this.form.lockPasswordConfirmed = password;
    },
    /**
     * @description will send registration request to backend
     */
    onRegisterSubmit(): void {
      if (this.systemDisabledState.isDisabled) {
        return;
      }

      let isValid = this.validateForm();
      if( !isValid ){
        this.$rootEvent.showNotification(ToastTypeEnum.warning, this.$t('validation.other.genericInvalidFields'));
        return;
      }

      this.$rootEvent.showFullPageLoader();
      this.$axios.post(SymfonyRoutes.buildUrl(SymfonySecurityRoutes.URL_REGISTER_USER), this.form).then( (response) => {

        /**
         * @see {BaseApiResponseViolationsToDataFieldsViolations}
         */
        this.responseViolationsToFieldViolations(response);
        if( !response.success ){
          this.handleResponse(response, SymfonySecurityRoutes.URL_REGISTER_USER);
          this.$rootEvent.hideFullPageLoader();
          return;
        }

        this.$rootEvent.showNotification(ToastTypeEnum.info, this.$t('security.register.texts.msg.success'));
        setTimeout(() => {
          this.$rootEvent.hideFullPageLoader();
          this.$router.push(VueRouter.ROUTE_PATH_LOGIN);
        }, 3000)

      })
    },
    /**
     * @description Check if form can be submitted
     */
    validateForm(): boolean {
      this.v$.$validate();

      let isPasswordValid     = this.$refs.passwordWithConfirmation.validateInput();
      let isLockPasswordValid = this.$refs.lockPasswordWithConfirmation.validateInput();

      this.violations = this.vuelidateErrorsToPropsViolation(this.v$.$errors);
      return (isPasswordValid && isLockPasswordValid && this.isVuelidateResultValid);
    }
  },
  components: {
    'password-with-confirmation' : PasswordWithConfirmation,
    'asterisk-required'          : AsteriskRequired,
    'vue-input'                  : VueInput,
    MediumButtonWithIcon,
  }
}
</script>

<style lang="scss" scoped>
.two-inputs-per-row {
  @apply grid lg:grid-rows-1 lg:grid-cols-2 grid-cols-1 lg:gap-4
}
</style>
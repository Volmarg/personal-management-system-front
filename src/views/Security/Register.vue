<template>
  <div>

    <div data-layout="centered" class="w-full flex items-center justify-center bg-gray-50 pt-10 pb-10">
      <div class="flex flex-col bg-white border border-gray-200 p-8 w-full max-w-2xl">
        <div class="flex flex-col w-full mb-4">
          <div class="text-xs uppercase">
            {{ $t('views.register.texts.register')}}
          </div>
        </div>
        <div class="flex flex-col">
          <div class="form flex flex-wrap w-full">
            <div class="w-full">

              <div class="two-inputs-per-row">
                <vue-input
                    type="email"
                    :label="$t('views.register.form.email.label')"
                    :is-required="true"
                    :errors="violations.email"
                    :is-disabled="systemDisabledState.isDisabled"
                    v-model="email"
                />

                <vue-input
                    type="text"
                    :label="$t('views.register.form.username.label')"
                    :is-required="true"
                    :errors="violations.username"
                    :is-disabled="systemDisabledState.isDisabled"
                    v-model="username"
                />
              </div>

              <div class="two-inputs-per-row">
                <vue-input
                    type="text"
                    :label="$t('views.register.form.firstname.label')"
                    :is-required="true"
                    :errors="violations.firstname"
                    :is-disabled="systemDisabledState.isDisabled"
                    v-model="firstname"
                />

                <vue-input
                    type="text"
                    :label="$t('views.register.form.lastname.label')"
                    :is-required="true"
                    :errors="violations.lastname"
                    :is-disabled="systemDisabledState.isDisabled"
                    v-model="lastname"
                />
              </div>

              <div class="two-inputs-per-row">
                <vue-input
                    type="text"
                    :label="$t('views.register.form.city.label')"
                    :is-required="true"
                    :errors="violations.city"
                    :is-disabled="systemDisabledState.isDisabled"
                    v-model="city"
                />

                <vue-input
                    type="text"
                    :label="$t('views.register.form.zip.label')"
                    :is-required="true"
                    :errors="violations.zip"
                    :is-disabled="systemDisabledState.isDisabled"
                    v-model="zip"
                />

              </div>

              <div class="two-inputs-per-row">
                <vue-input
                    type="text"
                    :label="$t('views.register.form.street.label')"
                    :is-required="true"
                    :errors="violations.street"
                    :is-disabled="systemDisabledState.isDisabled"
                    v-model="street"
                />

                <vue-input
                    type="text"
                    :label="$t('views.register.form.homeNumber.label')"
                    :is-required="true"
                    :errors="violations.homeNumber"
                    :is-disabled="systemDisabledState.isDisabled"
                    v-model="homeNumber"
                />
              </div>

              <password-with-confirmation @confirm-password-changed="onConfirmPasswordChanged"
                                          @password-changed="onPasswordChanged"
                                          @both-passwords-changed="bothPasswordsChanged"
                                          ref="passwordWithConfirmation"
                                          class="mb-6"
                                          :disabled="systemDisabledState.isDisabled"
              />

            </div>

            <PasswordConstraintsBlock v-if="!this.systemDisabledState.isDisabled"/>
            <DataUsageInfo v-if="!this.systemDisabledState.isDisabled"/>

            <p>
              {{ $t('views.register.texts.asteriskFieldsAreRequired') }} <asterisk-required/>
            </p>

            <div class="flex flex-col sm:flex-row w-full mt-2 mb-2">
              <MediumButtonWithIcon @click="sendRegistrationRequestToBackend()"
                                    top-wrapper-classes="w-full sm:w-auto"
                                    button-classes="w-full sm:w-auto"
                                    text-classes="text-center w-full"
                                    :text="$t('views.register.form.submit.text')"
                                    :disabled="systemDisabledState.isDisabled"
              />
            </div>

          </div>
        </div>

        <!-- Login -->
        <div class="flex flex-row w-full mt-1">
          <span class="text-secondary mr-1">{{ $t('views.register.texts.alreadyGotAnAccount') }}</span>
          <span>
          <router-link :to="routePaths.login"
                       class="link"
          >{{ $t('views.register.texts.loginHere') }}</router-link>
        </span>
        </div>

        <!-- Remind password -->
        <div class="flex flex-row w-full mt-1">
          <span class="text-secondary mr-1">{{ $t('views.register.texts.forgotPassword') }}</span>
          <span>
          <a class="link"
             @click.prevent="isRemindPasswordModalVisible = true"
             :class="{
               'disabled-text-link': systemDisabledState.isDisabled
             }"
          >{{ $t('views.register.texts.clickHere') }}</a>
        </span>
        </div>

        <!-- Home Page -->
        <div class="flex flex-row w-full mt-1">
          <span class="text-secondary mr-1">{{ $t('views.register.texts.homePage') }}: </span>
          <span>
            <router-link  :to="routePaths.info"
                          class="link">
              {{ $t('views.register.texts.clickHere') }}
            </router-link>
          </span>
        </div>

      </div>

    </div>

    <remind-password-modal :is-modal-visible="isRemindPasswordModalVisible"
                           @modal-closed="this.isRemindPasswordModalVisible = false"
    />

  </div>
</template>

<script lang="ts">
import BaseApiResponseViolationsToDataFieldsViolations from "@/scripts/Vue/Mixins/BaseApiResponseViolationsToDataFieldsViolations.vue";
import FailedBackendResponseHandler                    from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";

import PasswordConstraintsBlock from "@/components/Security/PasswordConstraintsBlock.vue";
import DataUsageInfo            from "@/views/User/PersonalData/DataUsageInfo.vue";
import RemindPasswordModal      from "@/components/Security/Modal/RemindPasswordModal.vue";
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

export default {
  setup: (): ComponentSetup => ({ v$: useVuelidate() }),
  data(): ComponentData {
    return {
      systemDisabledState: systemDisabledStore(),
      isRemindPasswordModalVisible: false,
      email              : "",
      password           : "",
      username           : "",
      firstname          : "",
      lastname           : "",
      zip                : "",
      street             : "",
      city               : "",
      country            : "",
      homeNumber         : "",
      confirmedPassword  : "",
      routePaths: {
        login: VueRouter.ROUTE_PATH_LOGIN,
        info: VueRouter.ROUTE_PATH_INFO,
      },
      violations: {
        email             : [],
        username          : [],
        firstname         : [],
        lastname          : [],
        zip               : [],
        street            : [],
        city              : [],
        homeNumber        : [],
        country           : [],
        password          : [],
        confirmedPassword : [],
      },
    }
  },
  validations(): ComponentValidation{
    return {
      email: {
        required: helpers.withMessage(this.$t('validations.required'), required),
        email,
      },
      username: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      firstname: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      lastname: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      zip: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      street: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      city: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      homeNumber: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      country: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      password: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      confirmedPassword: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      }
    }
  },
  mixins: [
    BaseApiResponseViolationsToDataFieldsViolations,
    FailedBackendResponseHandler,
    VuelidateHandler,
  ],
  methods: {
    /**
     * @description handles confirmation password change event
     */
    onConfirmPasswordChanged(confirmationPassword: string): void {
      this.confirmedPassword = confirmationPassword;
    },
    /**
     * @description handles password change event
     */
    onPasswordChanged(password: string): void {
      this.password = password;
    },
    /**
     * @description handles password change event
     */
    bothPasswordsChanged(password: string): void {
      this.password          = password;
      this.confirmedPassword = password;
    },
    /**
     * @description build the data bag sent for registration
     */
    buildRegistrationDataBag(): Record<string, string | number> {
      return {
        email             : this.email.trim(),
        password          : this.password.trim(),
        firstname         : this.firstname.trim(),
        lastname          : this.lastname.trim(),
        zip               : this.zip.trim(),
        street            : this.street.trim(),
        city              : this.city.trim(),
        country           : this.country.trim(),
        homeNumber        : this.homeNumber.trim(),
        username          : this.username.trim(),
        confirmedPassword : this.confirmedPassword.trim(),
      }
    },
    /**
     * @description will send registration request to backend
     */
    sendRegistrationRequestToBackend(): void {
      if (this.systemDisabledState.isDisabled) {
        return;
      }

      let isValid = this.validateForm();
      if( !isValid ){
        this.$rootEvent.showNotification(ToastTypeEnum.warning, this.$t('views.register.messages.violations.someFieldsAreIncorrect'));
        return;
      }

      let dataBag = this.buildRegistrationDataBag();
      this.$rootEvent.showFullPageLoader();
      this.$axios.postWithCsrf(SymfonyRoutes.buildUrl(SymfonyRoutes.URL_REGISTER_USER), dataBag).then( (response) => {

        /**
         * @see {BaseApiResponseViolationsToDataFieldsViolations}
         */
        this.responseViolationsToFieldViolations(response);
        if( !response.success ){
          /** @see FailedBackendResponseHandler **/
          this.handleFailedBackendResponse(response, SymfonyRoutes.URL_REGISTER_USER);
          this.$rootEvent.hideFullPageLoader();
          return;
        }

        this.$rootEvent.showNotification(ToastTypeEnum.info, this.$t('views.register.texts.youWillReceiveEmail'))
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

      let isPasswordValid = this.$refs.passwordWithConfirmation.validateInput();
      this.violations     = this.vuelidateErrorsToArrayOfViolationsForProperties(this.v$.$errors);
      return (isPasswordValid && this.isVuelidateResultValid);
    }
  },
  components: {
    'password-with-confirmation' : PasswordWithConfirmation,
    'remind-password-modal'      : RemindPasswordModal,
    'asterisk-required'          : AsteriskRequired,
    'vue-input'                  : VueInput,
    DataUsageInfo,
    MediumButtonWithIcon,
    PasswordConstraintsBlock
  }
}
</script>

<style lang="scss" scoped>
.two-inputs-per-row {
  @apply grid lg:grid-rows-1 lg:grid-cols-2 grid-cols-1 lg:gap-4
}
</style>
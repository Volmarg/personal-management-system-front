<template>
  <div>

    <div id="__next">
      <div class="w-full flex lg:flex-row lg:h-screen overflow-hidden flex-col-reverse">
        <div class="lg:flex lg:flex-col w-full lg:w-1/2  text-white p-8 items-start justify-between relative background">
          <div class="uppercase font-bold text-base tracking-wider flex flex-row items-center lg:justify-start w-full whitespace-nowrap text-white justify-center mb-8 lg:mb-0">
            <a class="flex flex-row items-center justify-start space-x-2 logo-link cursor-default" @click.prevent>
              <img src="/public/logo-white.svg" />
            </a>
          </div>
          <div class="flex flex-col w-full">
            <p class="text-2xl font-bold mb-4 text-center">
              {{ $t('security.login.welcomeTo') }} Personal Management System!
            </p>
            <p class="text-sm " v-html="$t('security.login.info.line1')">
            </p>

          </div>
          <div class="flex flex-row items-center lg:justify-between justify-center mt-4 lg:mt-0 w-full text-xs z-10">
            <div class="text-white">© Personal Management System</div>
          </div>
        </div>
        <div class="w-full lg:w-1/2 bg-white p-8 lg:p-24 flex flex-col items-center justify-center lg:items-start mb-8 sm:mb-20">
          <p class="text-2xl font-bold text-blue-500 mb-4">{{ $t('security.login.loginHeader') }}</p>
          <p v-if="isDev && !isDemo"><small>[Dev-System] Prefilled credentials</small></p>
          <p v-if="isDemo && !isDev"><small>[Demo-System] Prefilled credentials</small></p>

          <div class="flex flex-col">
            <form class="form flex flex-wrap w-full">
              <div class="w-full">

                <vue-input
                    type="text"
                    :label="$t('security.login.loginForm.email.label')"
                    :is-required="true"
                    :errors="violations.email"
                    :is-disabled="systemDisabledState.isDisabled"
                    @keypress.enter.prevent="handleSubmit"
                    v-model.trim="email"
                />

                <vue-input
                    type="password"
                    :label="$t('security.login.loginForm.password.label')"
                    :is-required="true"
                    :errors="violations.password"
                    :is-disabled="systemDisabledState.isDisabled"
                    @keypress.enter.prevent="handleSubmit"
                    v-model="password"
                />

                <p class="mb-2 justify-start flex">
                  {{ $t('generic.asteriskFieldsAreRequired') }}<asterisk-required/>
                </p>

              </div>

              <div class="w-full sm:w-auto mb-4">
                <MediumButtonWithIcon
                    :text="$t('security.login.loginForm.submit.label')"
                    button-classes="w-full sm:w-auto flex justify-center"
                    :disabled="systemDisabledState.isDisabled"
                    @click.prevent="handleSubmit"
                >
                  <template #icon>
                    <la
                        svg-icon-name="shield-alt-solid"
                        color="white"
                    />
                  </template>
                </MediumButtonWithIcon>
              </div>
            </form>

            <div class="flex-row text-md"
                 v-if="isDemo"
            >
              <div>
                <a href="https://github.com/Volmarg"
                   target="_blank"
                >
                  <fa :icon="['fab', 'github']"
                      class="social-icon"
                  />
                  <span>{{ $t('security.login.links.repository.label') }}</span>
                </a>
              </div>

              <div>
                <a href="https://volmarg.github.io/"
                   target="_blank"
                >
                  <fa icon="bookmark"
                      class="social-icon"
                  />
                  <span>{{ $t('security.login.links.documentation.label') }}</span>
                </a>
              </div>
            </div>

          </div>

          <!-- Register -->
          <div class="flex flex-row w-full mt-1 justify-center lg:justify-start"
               v-if="canRegister"
          >

            <span class="text-secondary mr-1">{{ $t('security.login.links.register.label') }}</span><span>
            <router-link :to="routePaths.registerPage"
                         class="link"
                         :class="{
                            'disabled-text-link': systemDisabledState.isDisabled
                         }"
            >{{ $t('security.login.links.register.linkText') }}</router-link>
            </span>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import SymfonyRoutes         from "@/router/SymfonyRoutes";
import SymfonySecurityRoutes from "@/router/SymfonyRoutes/SymfonySecurityRoutes";

import ConfigLoader          from "@/scripts/Core/Services/ConfigLoader/ConfigLoader";
import LocalStorageService   from "@/scripts/Core/Services/Storage/LocalStorageService";
import StringTypeProcessor   from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import Logger                from "@/scripts/Core/Logger";
import VueRouter             from "@/router/VueRouter";
import {ToastTypeEnum}       from "@/scripts/Libs/ToastNotification";
import EnvReader             from "@/scripts/Core/System/EnvReader";
import UserController        from "@/scripts/Core/Controller/UserController";
import {systemDisabledStore} from "@/scripts/Vue/Store/SystemDisabledState";

import PublicFolderAccessTokenMixin from "@/mixins/System/PublicFolderAccessTokenMixin.vue";
import DemoAwareMixin               from "@/mixins/Awarness/DemoAwareMixin.vue";

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import VueInput             from "@/components/Form/Input.vue";
import AsteriskRequired     from "@/components/Form/AsteriskRequired.vue";
import useVuelidate         from "@vuelidate/core";
import {email, helpers, required} from "@vuelidate/validators";
import VuelidateHandler     from "@/scripts/Vue/Mixins/VuelidateHandler.vue";
import {
  ComponentData,
  ComponentSetup,
  ComponentValidation
} from "@/scripts/Vue/Types/Components/types";


export default {
  name: "Login",
  setup: (): ComponentSetup => ({ v$: useVuelidate() }),
  data(): ComponentData {
    return {
      canRegister: false,
      systemDisabledState: systemDisabledStore(),
      isDev: EnvReader.isDev(),
      email: EnvReader.isDev() || EnvReader.isDemo() ? EnvReader.getPrefilledLoginEmail() : '',
      password: EnvReader.isDev() || EnvReader.isDemo() ? EnvReader.getPrefilledLoginPassword() : '',
      routePaths: {
        registerPage: VueRouter.ROUTE_PATH_REGISTER,
      },
      violations: {
        email: [],
        password: [],
      }
    }
  },
  validations(): ComponentValidation {
    return {
      email: {
        email,
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      password: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      }
    }
  },
  emits: [
    'loginSuccess',
    'showNotification'
  ],
  mixins: [
    PublicFolderAccessTokenMixin,
    DemoAwareMixin,
    VuelidateHandler,
  ],
  components: {
    "vue-input"             : VueInput,
    "asterisk-required"     : AsteriskRequired,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description will validate the form
     */
    validate(): void {
      this.v$.$validate();
      this.violations = this.vuelidateErrorsToPropsViolation(this.v$.$errors);
    },
    /**
     * @description handles logic for submission
     */
    async handleSubmit(): Promise<void> {
      if (this.systemDisabledState.isDisabled) {
        return;
      }

      /**
       * @description key `username` is required by backend package for handling jwt authentication
       */
      let dataBag = {
        username : this.email,
        password : this.password,
      };
      this.validate();
      if( !this.isVuelidateResultValid ){
        this.$rootEvent.showNotification(ToastTypeEnum.warning, this.$t('login.incorrectFormData'));
        return;
      }

      /**
       * @description this is also a special case where no BaseApiResponse is being returned as backend
       *              relies on external package for authenticating users and sends back `token`
       *
       *              still it's good enough to be set into the base api response dto
       *              but no other fields are prefilled, if the token key is missing
       *              then it means overall issue on backend
       *
       *              >[WARNING]<
       *                  The login credentials are not encrypted due to automated logic of jwt authentication bundle
       *                  in backend - in case when credentials should be encrypted then probably some built-in (bundle)
       *                  event must decrypt the data.
       *              >[WARNING]<
       */
      this.$rootEvent.showFullPageLoader();
      this.$axios.post(SymfonyRoutes.buildUrl(SymfonySecurityRoutes.URL_LOGIN), dataBag).then( async (baseApiResponse) => {

        /**
         * @description this is because once user logs in it's checked if he is inactive, and if he is, the
         *              guard redirects him to special landing page with information that he needs to activate account first.
         *
         *              But on the same moment this code would try to call backend for some "after-login" logic
         *              and backend would result in exception because inactive user is allowed only to
         *              do some basic things like allow password reset, request activation link etc.
         */
        if ((new UserController()).isUserActive()) {
          let publicFolderAccessToken = await this.getPublicFolderAccessToken();
          if (!publicFolderAccessToken) {
            console.error("Could net get public dir token")
            // this.$rootEvent.showNotification(ToastTypeEnum.error, this.$t('messages.internalServerError'));
            // this.$rootEvent.hideFullPageLoader();
            // return;
          }

          LocalStorageService.set(LocalStorageService.PUBLIC_FOLDER_AUTHENTICATION_TOKEN, publicFolderAccessToken);
        }

        if (StringTypeProcessor.isEmptyString(baseApiResponse.token)) {
          let message = this.$t('messages.internalServerError');
          if (baseApiResponse.isMessageSet()) {
            message = baseApiResponse.message;
          }

          this.$rootEvent.showNotification(ToastTypeEnum.error, message);
          this.$rootEvent.hideFullPageLoader();
          return;
        }

        this.$rootEvent.hideFullPageLoader();
        LocalStorageService.set(LocalStorageService.AUTHENTICATION_TOKEN, baseApiResponse.token);

        /**
         * @description this must be set to slash as in case of login it's not working properly with {@see VueRouter.ROUTE_PATH_HOME}
         * >Warning< not calling the `hideFullPageLoader` on purpose, as the route push causes extra loading time
         */
        this.$router.push(VueRouter.ROUTE_PATH_HOME);
        this.$emit("loginSuccess");
      }).catch( (error) => {
        Logger.error("Got error while trying to get authentication token", {
          error: error
        });

        this.$router.push(VueRouter.ROUTE_PATH_LOGIN);
      })

    },
    /**
     * @description will set email initial value
     */
    prefillEmail(): void {
      if (EnvReader.isDemo()) {
        this.email = ConfigLoader.general.demo.user.login;
        return;
      }

      if (EnvReader.isDev()) {
        this.email = EnvReader.getPrefilledLoginEmail();
        return;
      }

      this.email = '';
    },
    /**
     * @description will set password initial value
     */
    prefillPassword(): void {
      if (EnvReader.isDemo()) {
        this.password = ConfigLoader.general.demo.user.password;
        return;
      }

      if (EnvReader.isDev()) {
        this.password = EnvReader.getPrefilledLoginPassword();
        return;
      }

      this.password = '';
    }
  },
  async beforeMount(): Promise<void> {
    let response = await this.$axios.get(SymfonySecurityRoutes.buildUrl(SymfonySecurityRoutes.URL_CAN_REGISTER_CHECK));
    this.canRegister = response.code === 200;
    this.prefillEmail();
    this.prefillPassword();
  }
}
</script>

<style lang="scss" scoped>
.background {
  background: url(/public/image/login/spectrum-gradient.svg) no-repeat 0 0 fixed;
  background-size: cover;
}

.logo-link img {
  height: 40px;
}
</style>
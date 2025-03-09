<template>
  <section>
    <img src="/public/image/landing-pages/password-reset/reset.png"
         class="main-image"
    >
    <h2 class="headline">{{ $t('landingPage.passwordReset.headline.label') }}</h2>
    <br/>
    <p class="text" v-html="$t('landingPage.passwordReset.info.value')"></p>

    <MediumButtonWithIcon :text="$t('landingPage.passwordReset.button.label')"
                          :is-icon-on-top="true"
                          button-classes="text-2xl mb-10 w-full md:w-auto text-2xl mb-10"
                          :default-rounded="!isTabletBreakingPoint"
                          top-wrapper-classes="action-button-wrapper rounded-none md:rounded-lg"
                          @click="resetPassword"
                          :margin-right-class-number="0"
    >
      <template #icon>
        <la color="white"
            svg-icon-name="key-solid"
            font-size="20"/>
      </template>
    </MediumButtonWithIcon>

    <NavButtons />
    <div class="mt-10">&nbsp;</div>

  </section>
</template>

<script lang="ts">
import JwtService                   from "@/scripts/Core/Services/Security/JwtService";
import EventDispatcherService       from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";
import SymfonyRoutes                from "@/router/SymfonyRoutes";
import SymfonySecurityRoutes        from "@/router/SymfonyRoutes/SymfonySecurityRoutes";
import VueRouter                    from "@/router/VueRouter";
import {ToastTypeEnum}              from "@/scripts/Libs/ToastNotification";

import ResponsiveVarsMixin          from "@/mixins/Responsive/ResponsiveVarsMixin.vue";
import LineAwesome                  from "@/components/Ui/Icons/LineAwesome.vue";
import MediumButtonWithIcon         from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import ResponseHandlerMixin         from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";
import NavButtons                   from "@/views/User/InfoPage/Components/NavButtons.vue";

let jwtService = new JwtService();

export default {
  name: "PasswordResetConfirmation",
  mixins: [
    ResponseHandlerMixin,
    ResponsiveVarsMixin
  ],
  components: {
    NavButtons,
    "la": LineAwesome,
    MediumButtonWithIcon,
  },
  methods: {
    /**
     * @description will handle profile activation
     */
    resetPassword(): void {
      let jwtToken = this.$route.params.token;
      let payload  = jwtService.decodeUsingSignature(jwtToken, false);

      if(null === payload){
        EventDispatcherService.emitShowNotification(ToastTypeEnum.error, this.$t('views.resetPassword.texts.invalidToken'));
        return;
      }

      let calledBackendUrl = SymfonyRoutes.buildUrl(
          SymfonySecurityRoutes.URL_RESET_PASSWORD_USER,
          {
            [SymfonySecurityRoutes.URL_RESET_PASSWORD_USER_PARAM_TOKEN]: jwtToken
          }
      );

      this.$axios.get(calledBackendUrl).then( (response) => {
        if(!response.success){
          this.handleResponse(response, SymfonySecurityRoutes.URL_RESET_PASSWORD_USER_PARAM_TOKEN);
          return;
        }

        this.$rootEvent.showNotification(ToastTypeEnum.success, this.$t("views.resetPassword.texts.passwordHasBeenSet"));

        // give user time to ready message
        setTimeout(() =>{
          location.href = `/#${VueRouter.ROUTE_PATH_LOGIN}`;
        }, 2000);
      });

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vue/view/info-page.scss';
</style>
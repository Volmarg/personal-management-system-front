<template>

  <section>

    <img src="/public/image/landing-pages/change-email/change.png"
         class="main-image"
    >
    <h2 class="headline">{{ $t('landingPage.emailChange.headline.label') }}</h2>

    <br/>

    <div
        class="lg:flex mb-2 lg:mb-0"
        v-if="targetEmail"
    >
      <p class="text" v-html="$t('landingPage.emailChange.infoNewAddress.value')"></p>
      <p class="text inline">
        <span class="email-address font-bold underline">{{ targetEmail }}</span>
      </p>
    </div>

    <p
        class="text"
        v-html="$t('landingPage.emailChange.info.value')"
        v-if="targetEmail"
    ></p>


    <MediumButtonWithIcon :text="$t('landingPage.emailChange.button.label')"
                          :is-icon-on-top="true"
                          button-classes="text-2xl mb-10 w-full md:w-auto text-2xl mb-10"
                          :default-rounded="!isTabletBreakingPoint"
                          top-wrapper-classes="action-button-wrapper rounded-none md:rounded-lg"
                          @click="changeEmail"
                          :margin-right-class-number="0"
                          v-if="targetEmail"
    >
      <template #icon>
        <la color="white"
            svg-icon-name="envelope-solid"
            font-size="35"/>
      </template>
    </MediumButtonWithIcon>

    <NavButtons />
    <div class="mt-10">&nbsp;</div>

  </section>

</template>

<script lang="ts">
import JwtService                         from "@/scripts/Core/Services/Security/JwtService";
import EventDispatcherService             from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";
import SymfonyRoutes                      from "@/router/SymfonyRoutes";
import {ToastTypeEnum}                    from "@/scripts/Libs/ToastNotification";
import SymfonyUserSettingRoutes           from "@/router/SymfonyRoutes/User/Setting/SymfonyUserSettingRoutes";
import JwtTokenHandler                    from "@/scripts/Core/Security/JwtTokenHandler";

import {JwtTokenPayload} from "@/scripts/Dto/Jwt/JwtPayloadType";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import NavButtons                   from "@/views/User/InfoPage/Components/NavButtons.vue";
import LineAwesome                  from "@/components/Ui/Icons/LineAwesome.vue";
import MediumButtonWithIcon         from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";

let jwtService = new  JwtService();

export default {
  name: "PasswordResetConfirmation",
  mixins: [
    FailedBackendResponseHandler,
    ResponsiveVarsMixin
  ],
  components: {
    NavButtons,
    "la" : LineAwesome,
    MediumButtonWithIcon
  },
  computed: {
    /**
     * @description returns the new E-Mail that will be assigned to user
     */
    targetEmail(): string {
      let payload = (new JwtService()).decodeUsingSignature(this.$route.params.token, false) as JwtTokenPayload;

      return payload?.newEmailAddress ?? null;
    }
  },
  methods: {
    /**
     * @description will handle E-Mail changing
     */
    changeEmail(): void {
      let jwtToken = this.$route.params.token;
      let payload  = jwtService.decodeUsingSignature(jwtToken, false);

      if (null === payload) {
        EventDispatcherService.emitShowNotification(ToastTypeEnum.error, this.$t('views.changeEmail.texts.invalidToken'));
        return;
      }

      let calledBackendUrl = SymfonyRoutes.buildUrl(
          SymfonyUserSettingRoutes.URL_CHANGE_EMAIL,
          {
            [SymfonyUserSettingRoutes.URL_CHANGE_EMAIL_PARAM_TOKEN]: jwtToken
          }
      );

      this.$rootEvent.showFullPageLoader();
      this.$axios.getWithCsrf(calledBackendUrl).then( (response) => {
        if (!response.success) {
          this.$rootEvent.hideFullPageLoader();
          this.handleFailedBackendResponse(response, calledBackendUrl);
          return;
        }

        this.$rootEvent.showNotification(ToastTypeEnum.success, this.$t("views.user.baseData.email.changedWithSuccess"));

        // need to refresh the token because the confirmation route is publicly accessible so token will not be automatically refreshed
        // todo: replace
        // AuthenticatedUserWebsocketCallable.requestJwtToken();

        /**
         * Need timeout in order to:
         * - show the message first,
         */
        setTimeout(() => {
          /**
           * @description user need to be logged out, because otherwise will need more complex logic to refresh the jwt token
           *              as the token is being refreshed based on the user email in payload.
           *
           *              As the email just changed then the user cannot be found by old token anymore
           */
          (new JwtTokenHandler()).invalidateTokenAndRedirectUser();
        },300)
      });

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vue/view/info-page.scss';
</style>
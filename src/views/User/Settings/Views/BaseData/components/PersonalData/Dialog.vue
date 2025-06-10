<template>
  <Modal :title="$t('userSettings.tab.baseData.children.personalData.modal.header')"
         id="profile-base-data"
         :is-visible="isVisible"
         :size="isPhoneBreakingPoint ? 'full' : 'medium'"
  >
    <template #cancelButton>
      <MediumButtonWithIcon
          :text="$t('userSettings.tab.baseData.children.personalData.modal.button.close.label')"
          :is-mobile-full-width="true"
          margin-right-class="mr-0"
          class="px-2 sm:px-0"
          @click="$emit('modalClosed')"
      />
    </template>

    <template #content>

      <Username v-model="username"
                :violations="violations.username"
      />

      <MediumButtonWithIcon :text="$t('userSettings.tab.baseData.children.personalData.form.submit.label')"
                            :is-mobile-full-width="true"
                            @button-click="saveBaseData"
                            class="submit-button"
      >
        <template #icon>
          <la svg-icon-name="save-solid"
              :font-size="30"
              color="white"
              class="hover:opacity-50 cursor-pointer"
          />
        </template>
      </MediumButtonWithIcon>

    </template>
  </Modal>

</template>

<script lang="ts">

import {ComponentData, ComponentSetup, ComponentValidation} from "@/scripts/Vue/Types/Components/types";

import UserController           from "@/scripts/Core/Controller/UserController";
import SymfonyRoutes            from "@/router/SymfonyRoutes";
import SymfonyUserSettingRoutes from "@/router/SymfonyRoutes/User/Setting/SymfonyUserSettingRoutes";
import BaseApiResponse          from "@/scripts/Response/BaseApiResponse";
import {ToastTypeEnum}          from "@/scripts/Libs/ToastNotification";
import JwtTokenHandler          from "@/scripts/Core/Security/JwtTokenHandler";
import {userStateStore}         from "@/scripts/Vue/Store/UserState";

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import LineAwesome          from "@/components/Ui/Icons/LineAwesome.vue";
import Modal                from "@/components/Modal/Modal.vue";
import Username             from "@/views/User/Settings/Views/BaseData/components/PersonalData/Username.vue";

import VuelidateHandler from "@/scripts/Vue/Mixins/VuelidateHandler.vue";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";

export default {
  setup: (): ComponentSetup => ({v$: useVuelidate()}),
  data(): ComponentData {
    return {
      username     : (new UserController()).getLoggedInUserData().username,
      loggedInUser : (new UserController()).getLoggedInUserData(),
      violations: {
        username : [],
      },
    }
  },
  validations(): ComponentValidation{
    return {
      username: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
    }
  },
  props: {
    isVisible: {
      type     : Boolean,
      required : false,
    }
  },
  mixins: [
    VuelidateHandler,
    ResponsiveVarsMixin,
  ],
  components: {
    "la" : LineAwesome,
    Modal,
    Username,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description handles saving user data in DB
     */
    saveBaseData(): void {
      if (!this.validateForm()) {
        return;
      }

      let data = {
        username: this.username,
      }

      let calledUrl = SymfonyRoutes.buildUrl(SymfonyUserSettingRoutes.URL_USER_BASE_DATA_PERSONAL_SAVE);
      this.$rootEvent.showFullPageLoader();
      this.$axios.post(calledUrl, data).then( async (response: BaseApiResponse) => {

        if (response.success) {
          if (response.isMessageSet()) {
            this.$rootEvent.showNotification(ToastTypeEnum.success, response.message);
          }

          // the user data needs to be updated from the newly fetched token
          let userData      = (new UserController()).getLoggedInUserData();
          this.loggedInUser = userData;

          await JwtTokenHandler.requestJwtTokenAndWaitForIt();
          userStateStore().loadUserData();
        }

        this.$rootEvent.hideFullPageLoader();
      })
    },
    /**
     * @description Validates the form, returns bool as indication if everything is fine (true = OK),
     */
    validateForm(): boolean {
      this.v$.$validate();

      this.violations = this.vuelidateErrorsToPropsViolation(this.v$.$errors);

      return (0 === Object.keys(this.violations).length);
    }
  },
}
</script>

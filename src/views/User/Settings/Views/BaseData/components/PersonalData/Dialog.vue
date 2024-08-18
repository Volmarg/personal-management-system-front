<template>
  <Modal :title="$t('views.user.baseData.personalData.form.label')"
         :is-visible="isVisible"
         :is-vshow-visibility="true"
         :size="isPhoneBreakingPoint ? 'full' : 'medium'"
  >
    <template #cancelButton>
      <MediumButtonWithIcon
          :text="$t('userSettings.personalDataModal.buttons.close.label')"
          :is-mobile-full-width="true"
          margin-right-class="mr-0"
          class="px-2 sm:px-0"
          @click="$emit('modalClosed')"
      />
    </template>

    <template #content>

      <FirstName v-model="firstName"
                 :violations="violations.firstName"
      />

      <LastName v-model="lastName"
                :violations="violations.lastName"
      />

      <Address ref="addressComponent"/>

      <MediumButtonWithIcon :text="$t('views.user.baseData.personalData.form.submit.label')"
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

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Address              from "@/views/User/Settings/Views/BaseData/components/PersonalData/Address.vue";
import LineAwesome          from "@/components/Ui/Icons/LineAwesome.vue";
import Modal                from "@/components/Modal/Modal.vue";
import FirstName            from "@/views/User/Settings/Views/BaseData/components/PersonalData/FirstName.vue";
import LastName             from "@/views/User/Settings/Views/BaseData/components/PersonalData/LastName.vue";

import VuelidateHandler from "@/scripts/Vue/Mixins/VuelidateHandler.vue";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";

export default {
  setup: (): ComponentSetup => ({v$: useVuelidate()}),
  data(): ComponentData {
    return {
      firstName    : (new UserController()).getLoggedInUserData().firstname,
      lastName     : (new UserController()).getLoggedInUserData().lastname,
      loggedInUser : (new UserController()).getLoggedInUserData(),
      violations: {
        firstName : [],
        lastName: [],
      },
    }
  },
  validations(): ComponentValidation{
    return {
      firstName: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      lastName: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      }
    }
  },
  props: {
    isVisible: {
      type     : Boolean,
      required : false,
    }
  },
  emits: [
    'fileRemoved'
  ],
  mixins: [
    VuelidateHandler,
    ResponsiveVarsMixin,
  ],
  components: {
    "la" : LineAwesome,
    Modal,
    Address,
    FirstName,
    LastName,
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

      let addressData = this.$refs.addressComponent.getPersistedData();

      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        ...addressData
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
        }

        this.$rootEvent.hideFullPageLoader();
      })
    },
    /**
     * @description Validates the form, returns bool as indication if everything is fine (true = OK),
     */
    validateForm(): boolean {
      this.v$.$validate();

      let isAddressDataValid = this.$refs.addressComponent.isValid();
      this.violations        = this.vuelidateErrorsToArrayOfViolationsForProperties(this.v$.$errors);

      return  (
                isAddressDataValid
            &&  0 === Object.keys(this.violations).length
      )
    }
  },
}
</script>

<template>
  <Modal :title="$t('userSettings.tab.baseData.children.emailAddress.dialog.header')"
         :is-visible="isVisible"
         :size="dialogSize"
  >
    <template #cancelButton>
      <MediumButtonWithIcon
          :text="$t('userSettings.tab.baseData.children.emailAddress.dialog.button.cancel.label')"
          :is-mobile-full-width="true"
          margin-right-class="mr-0"
          class="px-2 sm:px-0"
          @click="$emit('modalClosed')"
      />
    </template>

    <template #content>

      <EmailAddressInput v-model="emailAddress"
                         :violations="violations.emailAddress"
      />


      <MediumButtonWithIcon :text="$t('userSettings.tab.baseData.children.emailAddress.form.submit.label')"
                            :is-mobile-full-width="true"
                            @button-click="save"
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

import {userStateStore, UserStateStore} from "@/scripts/Vue/Store/UserState";

import SymfonyRoutes            from "@/router/SymfonyRoutes";
import SymfonyUserSettingRoutes from "@/router/SymfonyRoutes/User/Setting/SymfonyUserSettingRoutes";
import BaseApiResponse          from "@/scripts/Response/BaseApiResponse";
import {ToastTypeEnum}          from "@/scripts/Libs/ToastNotification";

import EmailAddressInput    from "@/views/User/Settings/Views/BaseData/components/EmailAddress/EmailAddressInput.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import LineAwesome          from "@/components/Ui/Icons/LineAwesome.vue";
import Modal                from "@/components/Modal/Modal.vue";

import VuelidateHandler from "@/scripts/Vue/Mixins/VuelidateHandler.vue";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import useVuelidate      from "@vuelidate/core";
import {required, email, helpers} from "@vuelidate/validators";

export default {
  setup: (): ComponentSetup => ({v$: useVuelidate()}),
  data(): ComponentData {
    return {
      userStore: null as UserStateStore | null,
      emailAddress : '',
      violations: {
        emailAddress : [],
      },
    }
  },
  validations(): ComponentValidation{
    return {
      emailAddress: {
        required: helpers.withMessage(this.$t('validations.required'), required),
        email,
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
    EmailAddressInput,
    MediumButtonWithIcon
  },
  computed: {
    /**
     * @description will decide size of the dialog
     */
    dialogSize(): string {
      return (this.isPhoneBreakingPoint ? 'full' : 'medium');
    }
  },
  methods: {
    /**
     * @description handles saving user data in DB
     */
    save(): void {
      if (!this.validateForm()) {
        return;
      }

      let calledUrl = SymfonyRoutes.buildUrl(SymfonyUserSettingRoutes.URL_USER_BASE_DATA_EMAIL_SAVE, {
        [SymfonyUserSettingRoutes.URL_USER_BASE_DATA_EMAIL_SAVE_PARAM_EMAIL]: encodeURIComponent(this.emailAddress)
      });

      this.$rootEvent.showFullPageLoader();
      this.$axios.get(calledUrl).then( async (response: BaseApiResponse) => {
        this.$rootEvent.hideFullPageLoader();

        if (response.isMessageSet()) {
          let notificationType = (response.success ? ToastTypeEnum.success : ToastTypeEnum.warning);
          this.$rootEvent.showNotification(notificationType, response.message);
        }

        await this.userStore.refreshUserData();
        this.emailAddress = this.userStore.user.email;
      })
    },
    /**
     * @description Validates the form, returns bool as indication if everything is fine (true = OK),
     */
    validateForm(): boolean {
      this.v$.$validate();

      this.violations = this.vuelidateErrorsToPropsViolation(this.v$.$errors);

      return  (0 === Object.keys(this.violations).length);
    }
  },
  created(): void {
    this.userStore    = userStateStore();
    this.emailAddress = this.userStore.user.email;
  }
}
</script>

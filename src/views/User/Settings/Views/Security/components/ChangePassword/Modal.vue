<template>
  <div>

    <Modal :title="$t(`userSettings.tab.security.children.${translationGroup}.dialog.header`)"
           :is-visible="isVisible"
           :is-close-full-width="true"
           @modal-closed="$emit('modalClosed')"
           :size="isPhoneBreakingPoint ? 'full' : 'medium'"
    >
      <template #content>
        
        <PasswordWithConfirmation @both-passwords-changed="onPasswordChanged"
                                  @password-changed="onPasswordChanged"
                                  @confirm-password-changed="onConfirmPasswordChanged"
                                  ref="passwordWithConfirmation"
                                  class="mb-6"
        />

      </template>

      <template #footerRightSection>
        <MediumButtonWithIcon
            background-color-class="bg-blue-500"
            :text="$t(`userSettings.tab.security.children.${translationGroup}.form.submit.label`)"
            class="w-full sm:w-auto m-0-force"
            button-classes="w-full sm:w-auto"
            text-classes="text-center w-full"
            @click="save"
        />
      </template>

    </Modal>

  </div>
</template>

<script lang="ts">

import Modal                    from "@/components/Modal/Modal.vue";
import MediumButtonWithIcon     from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import PasswordWithConfirmation from "@/components/Form/PasswordWithConfirmation.vue";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyRoutes            from "@/router/SymfonyRoutes";
import SymfonyUserSettingRoutes from "@/router/SymfonyRoutes/User/Setting/SymfonyUserSettingRoutes";
import BaseApiResponse          from "@/scripts/Response/BaseApiResponse";
import {ToastTypeEnum}          from "@/scripts/Libs/ToastNotification";

export default {
  data(): ComponentData {
    return {
      rawPassword: null,
      rawConfirmPassword: null,
    }
  },
  props: {
    isVisible: {
      type     : Boolean,
      required : true,
    },
    isLockPassword: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  emits: [
    'modalClosed'
  ],
  mixins: [
    ResponsiveVarsMixin,
  ],
  components: {
    PasswordWithConfirmation,
    MediumButtonWithIcon,
    Modal
  },
  computed: {
    /**
     * @description returns prefix for used translations
     */
    translationGroup(): string {
      return this.isLockPassword ? 'changeLockPassword' : 'changePassword';
    },
  },
  methods: {
    /**
     * @description handler for when password gets changed
     *              - stores the raw password as data prop,
     *              - stores the raw confirmation password as data prop,
     */
    onPasswordChanged(rawPassword: string) {
      this.rawPassword = rawPassword;
      this.rawConfirmPassword = rawPassword;
    },
    /**
     * @description handles confirmation password change event
     */
    onConfirmPasswordChanged(confirmationPassword: string): void {
      this.rawConfirmPassword = confirmationPassword;
    },
    /**
     * @description Check if form can be submitted
     */
    validateForm(): boolean {
      let isPasswordValid = this.$refs.passwordWithConfirmation.validateInput();
      return isPasswordValid;
    },
    /**
     * @description handles sending the raw password to the backend
     */
    save(): void {
      if (!this.validateForm()) {
        return;
      }

      let route = this.isLockPassword ? SymfonyUserSettingRoutes.URL_CHANGE_LOCK_PASSWORD : SymfonyUserSettingRoutes.URL_CHANGE_PASSWORD;
      let calledUrl = SymfonyRoutes.buildUrl(route)
      let data      = {
        password: this.rawPassword,
        passwordConfirmed: this.rawConfirmPassword,
      }

      this.$rootEvent.showFullPageLoader();
      this.$axios.post(calledUrl, data).then((response: BaseApiResponse) => {
        this.$rootEvent.hideFullPageLoader();

        if (response.isMessageSet()) {
          let notificationType = response.success ? ToastTypeEnum.success : ToastTypeEnum.error;
          this.$rootEvent.showNotification(notificationType, response.message);
        }
      })
    }
  }
}
</script>
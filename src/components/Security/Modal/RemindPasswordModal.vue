<template>
  <div>

    <modal :is-visible="showModal"
           :title="$t('security.forgotPassword.header.label')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>

        <vue-input
            type="text"
            :label="$t('security.forgotPassword.form.email.label')"
            :is-required="true"
            :errors="violations.remindPasswordEmail"
            v-model.trim="remindPasswordEmail"
            @press-enter="sendNewPassword"
        />

        <MediumButtonWithIcon
            :text="$t('security.forgotPassword.form.submit.label')"
            button-classes="w-full md:w-auto flex justify-center"
            background-color-class="bg-blue-500"
            @button-click="sendNewPassword"
            class="mt-5 mb-5"
            text-classes="text-center"
        />

      </template>
    </modal>

  </div>
</template>

<script lang="ts">
import SymfonyRoutes         from "@/router/SymfonyRoutes";
import SymfonySecurityRoutes from "@/router/SymfonyRoutes/SymfonySecurityRoutes";

import MediumButtonWithIcon         from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import VueInput                     from "@/components/Form/Input.vue";
import Modal                        from "@/components/Modal/Modal.vue";
import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";
import VuelidateHandler             from "@/scripts/Vue/Mixins/VuelidateHandler.vue";
import useVuelidate                 from "@vuelidate/core";
import {email, helpers, required} from "@vuelidate/validators";
import {
  ComponentData,
  ComponentSetup,
  ComponentValidation
} from "@/scripts/Vue/Types/Components/types";
import {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

export default {
  name: "RemindPasswordDialog",
  emits: [
    "modalClosed"
  ],
  setup: (): ComponentSetup => ({ v$: useVuelidate({$scope: false}) }),
  data(): ComponentData {
    return {
      remindPasswordEmail : "",
      showModal: false,
      violations          : {
        remindPasswordEmail: []
      }
    }
  },
  props: {
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    }
  },
  validations(): ComponentValidation{
    return {
      remindPasswordEmail: {
        email,
        required: helpers.withMessage(this.$t('validations.required'), required),
      }
    }
  },
  components: {
    MediumButtonWithIcon,
    "modal"     : Modal,
    "vue-input" : VueInput,
  },
  mixins: [
    FailedBackendResponseHandler,
    ResponsiveModalSizeMixin,
    VuelidateHandler,
  ],
  methods: {
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
      this.$emit('modalClosed');
    },
    /**
     * @description will handle sending new password
     */
    sendNewPassword(): void {
      let isValid = this.validate();
      if(!isValid){
        return;
      }

      let dataBag = {
        email: this.remindPasswordEmail,
      }

      this.$rootEvent.showFullPageLoader();
      this.$axios.post(SymfonyRoutes.buildUrl(SymfonySecurityRoutes.URL_REQUEST_PASSWORD_RESET_LINK_USER), dataBag).then( (response) => {
        this.$rootEvent.hideFullPageLoader();

        if( !response.success ){
          /** @see FailedBackendResponseHandler **/
          this.handleFailedBackendResponse(response, SymfonySecurityRoutes.URL_REQUEST_PASSWORD_RESET_LINK_USER);
          return;
        }

        let message = this.$t('components.security.dialog.remindPassword.messages.mailWithPasswordResetLinkHasBeenSent');
        this.$rootEvent.showNotification(ToastTypeEnum.success, message);
        this.remindPasswordEmail = "";
      })
    },
    /**
     * @description will validate email and set/unset violations
     */
    validate(): boolean {
      this.v$.$validate();
      this.violations = this.vuelidateErrorsToArrayOfViolationsForProperties(this.v$.$errors);
      return this.isVuelidateResultValid;
    },
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  }
}
</script>
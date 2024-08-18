<template>
  <div>

    <Modal :title="$t('views.user.profile.accountRemoval.dialog.header.label')"
           :is-visible="isVisible"
           :is-close-full-width="true"
           @modal-closed="$emit('modalClosed')"
           :size="isPhoneBreakingPoint ? 'full' : 'medium'"
    >
      <template #content>
        <p
            v-html="$t('views.user.profile.accountRemoval.dialog.body.message.areYouSure')"
            class="text-red-500"
        />

        <p class="mt-2">{{ $t('views.user.profile.accountRemoval.dialog.body.message.info') }}</p>
      </template>
      <template #footerRightSection>
        <MediumButtonWithIcon
            background-color-class="bg-red-500"
            :text="$t('views.user.profile.accountRemoval.dialog.buttons.confirm.label')"
            class="w-full sm:w-auto m-0-force"
            button-classes="w-full sm:w-auto"
            text-classes="text-center w-full"
            @click="removeAccount()"
        />
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">

import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";
import MediumButtonWithIcon         from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Modal                        from "@/components/Modal/Modal.vue";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import SymfonyRoutes   from "@/router/SymfonyRoutes";
import {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";
import JwtTokenHandler from "@/scripts/Core/Security/JwtTokenHandler";

export default {
  props: {
    isVisible: {
      type     : Boolean,
      required : true,
    }
  },
  emits: [
    'modalClosed'
  ],
  mixins: [
    FailedBackendResponseHandler,
    ResponsiveVarsMixin,
  ],
  components: {
    MediumButtonWithIcon,
    Modal
  },
  methods: {

    /**
     * @description will send request to backend
     *              this result in backend sending email with user removal mail
     */
    removeAccount(): void {
      this.$axios.getWithCsrf(SymfonyRoutes.buildUrl(SymfonyRoutes.URL_REMOVE_USER)).then( (response) => {

        if(!response.success){
          this.handleFailedBackendResponse(response, SymfonyRoutes.URL_REMOVE_USER);
          return;
        }

        this.$rootEvent.showNotification(ToastTypeEnum.success, this.$t('views.remove.texts.accountHasBeenRemoved'));
        (new JwtTokenHandler()).invalidateTokenAndRedirectUser()
        this.$emit('modalClosed');
      })
    },
  }
}
</script>
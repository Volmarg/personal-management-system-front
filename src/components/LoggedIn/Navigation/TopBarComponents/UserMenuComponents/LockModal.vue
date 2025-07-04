<template>
  <div>
    <Modal :is-visible="showModal"
           id="system-lock"
           :title="isSystemLocked ? $t('other.lockModal.header') : $t('other.lockModal.headerLockBack')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #footerRightSection>
        <MediumButtonWithIcon
            background-color-class="bg-blue-500"
            :text="$t('job.settings.tabs.managePool.form.submit.label')"
            class="w-full sm:w-auto m-0-force"
            button-classes="w-full sm:w-auto"
            text-classes="text-center w-full"
            @click="onSubmit"
        />
      </template>

      <template #content>
        <i v-html="$t('other.lockModal.info')" />
        <div class="flex justify-center"
             v-if="isSystemLocked"
        >
          <div class="mt-6 w-full flex flex-col">
            <p v-if="isDemo && !isDev"><small>[Demo-System] Prefilled credentials</small></p>
            <FormInput type="password"
                       :label="$t('other.lockModal.form.lock.label')"
                       v-model="password"
            />
          </div>
        </div>

      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";
import Modal                from "@/components/Modal/Modal.vue";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";
import DemoAwareMixin           from "@/mixins/Awarness/DemoAwareMixin.vue";

import SymfonySecurityRoutes from "@/router/SymfonyRoutes/SymfonySecurityRoutes";

import ConfigLoader from "@/scripts/Core/Services/ConfigLoader/ConfigLoader";
import EnvReader    from "@/scripts/Core/System/EnvReader";

import {ComponentData}  from "@/scripts/Vue/Types/Components/types";
import {ToastTypeEnum}  from "@/scripts/Libs/ToastNotification";
import {userStateStore} from "@/scripts/Vue/Store/UserState";

export default {
  data(): ComponentData {
    return {
      isDev: EnvReader.isDev(),
      isSystemLocked: userStateStore().user?.isSystemLocked ?? true,
      password: null,
      showModal: false,
    }
  },
  props: {
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    }
  },
  components: {
    MediumButtonWithIcon,
    Modal,
    FormInput,
  },
  mixins: [
    ResponsiveModalSizeMixin,
    DemoAwareMixin,
  ],
  emits: [
    "modalClosed",
    "confirmClick",
  ],
  methods: {
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
      this.$emit('modalClosed');
    },
    /**
     * @description handle user submitting the lock/unlock system modal
     */
    onSubmit(): void {
      let url = SymfonySecurityRoutes.buildUrl(SymfonySecurityRoutes.URL_TOGGLE_RESOURCES_LOCK);
      this.$rootEvent.showFullPageLoader();
      this.$axios.post(url,{password: this.password}).then((response) => {

        if (!response.success) {
          this.$rootEvent.hideFullPageLoader();
        }

        if (response.isMessageSet()) {
          let notificationType = (response.success ? ToastTypeEnum.success : ToastTypeEnum.warning);
          this.$rootEvent.showNotification(notificationType, response.message);
        }

        if (response.success){
          /**
           * @description reloading page is a must in this case, otherwise would need some complex logic to reload current page state
           */
          setTimeout(() => {
            location.reload();
          }, 1500) // let the user read response message
        }
      })
    },
    /**
     * @description fill up demo credentials
     */
    fillDemoCredentials(): void {
      if (this.isDemo) {
        this.password = ConfigLoader.general.demo.user.password;
      }
    }
  },
  beforeMount(): void {
    this.fillDemoCredentials();
  },
  updated(): void{
    this.showModal = this.isModalVisible;
    this.fillDemoCredentials();
  }
}
</script>
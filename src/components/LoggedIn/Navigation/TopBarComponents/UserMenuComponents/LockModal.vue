<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('other.lockModal.header')"
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
        <div class="flex justify-center">
          <div class="mt-6 w-full flex flex-col">
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
import FormInput                    from "@/components/Form/Input.vue";
import Modal                        from "@/components/Modal/Modal.vue";
import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";
import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  data(): ComponentData {
    return {
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
    FailedBackendResponseHandler,
    ResponsiveModalSizeMixin,
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
      // todo
      this.$emit('modalClosed');
    }
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  }
}
</script>
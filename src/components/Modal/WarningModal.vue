<template>
  <div>

    <Modal
        :is-visible="isVisible"
        :size="size"
        :title="title"
        :is-close-visible="isCloseVisible"
        :is-close-full-width="true"
        @modal-closed="$emit('modalClosed')"
    >

      <template #content>
        <slot name="content"></slot>
      </template>

      <template #footerRightSection>
        <MediumButtonWithIcon
            background-color-class="bg-red-500"
            top-wrapper-classes="w-full sm:w-auto"
            button-classes="w-full sm:w-auto flex justify-center sm:block"
            text-classes="text-center"
            class="w-full sm:w-auto"
            :text="$t('generic.button.confirm.label')"
            @click="$emit('confirm')"
        />
      </template>

    </Modal>

  </div>
</template>

<script lang="ts">

import Modal                from "@/components/Modal/Modal.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  props: {
    /**
     * @description modal size
     */
    size: {
      type     : String,
      required : false,
      default  : "small"
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      default: String,
      required: true,
    },
    isCloseVisible: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  emits: [
    'confirm',
    'modalClosed'
  ],
  components: {
    Modal,
    MediumButtonWithIcon
  }
}
</script>
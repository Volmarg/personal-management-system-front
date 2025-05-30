<template>
  <div>

    <Modal
        :id="id"
        :is-visible="isVisible"
        :size="size"
        :title="title"
        :is-close-visible="isCloseVisible"
        :is-close-full-width="true"
        @modal-closed="$emit('modalClosed')"
    >
      <template #aboveTitle>
        <div class="mb-2 text-center">
          <fa :icon="['fa', 'exclamation-triangle']"
              class="text-orange-700 text-5xl"
          />
        </div>
      </template>

      <template #content>
        <slot name="content"></slot>
      </template>

      <template #footerRightSection>
        <MediumButtonWithIcon
            background-color-class="bg-red-500"
            top-wrapper-classes="w-full md:w-auto"
            button-classes="w-full md:w-auto flex justify-center md:block"
            text-classes="text-center"
            class="w-full md:w-auto"
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
    id: {
      type: String,
      required: false,
      default: ''
    },
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
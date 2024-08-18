<template>
  <Modal :title="$t('system.timer.warningModal.header')"
         :is-visible="isVisible"
         size="small"
  >
    <template #cancelButton>
      <MediumButtonWithIcon
          :text="$t('system.timer.warningModal.buttons.no')"
          margin-right-class="mr-0"
          @click="$emit('modalClosed')"
      />
    </template>

    <template #footerRightSection>
      <MediumButtonWithIcon
          background-color-class="bg-green-500"
          :text="$t('system.timer.warningModal.buttons.ok')"
          @click="onConfirm"
      />
    </template>

    <template #content>
      <p v-html="$t('system.timer.warningModal.text')"></p>
    </template>
  </Modal>

</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Modal                from "@/components/Modal/Modal.vue";

export default {
  props: {
    isVisible: {
      type     : Boolean,
      required : false,
    }
  },
  emits: [
    'modalClosed',
    'confirmed'
  ],
  components: {
    Modal,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description handler when user clicks on confirmation button
     *             - emits the confirmation event further
     */
    onConfirm(): void {
      this.$emit('confirmed');
    },
  },
}
</script>
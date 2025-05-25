<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('notes.common.createUpdateForm.header.create')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>
        <CreateUpdateForm :initial-category="$route.params.id"
                          @submit="$emit('modalClosed')"
                          ref="form"
        />
      </template>

      <template #footerLeftSection>
        <MediumButtonWithIcon :text="$t('notes.new.form.submit.label')"
                              :margin-right-class-number="0"
                              @button-click="$refs.form.submit(); $emit('modalClosed')"
                              button-extra-classes="pt-3 pb-3 md:pt-1 md:pb-1"
                              class="w-full md:w-auto"
                              button-classes="w-full md:w-auto mr-1"
                              text-classes="text-center w-full"
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal                from "@/components/Modal/Modal.vue";
import CreateUpdateForm     from "@/views/Modules/Notes/Components/Note/CreateUpdateForm.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      initialSmallSizeModal: "full",
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
    CreateUpdateForm,
    Modal,
  },
  mixins: [
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
  ],
  methods: {
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
      this.$emit('modalClosed');
    },
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  }
}
</script>
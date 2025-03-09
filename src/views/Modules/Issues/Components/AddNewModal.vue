<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('issues.pending.modal.addNew.header')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>

        <div class="flex justify-center">
          <div class="mt-6 w-full flex flex-col md:w-2/3">

            <CreateEditForm :header="$t('issues.pending.common.createEditForm.header.new')"
                            @submit="$emit('closeModal')"
            />

          </div>
        </div>

      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import CreateEditForm               from "@/views/Modules/Issues/Components/CreateEditForm.vue";
import Modal                        from "@/components/Modal/Modal.vue";
import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
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
    CreateEditForm,
    Modal,
  },
  mixins: [
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
    "addNewClick",
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
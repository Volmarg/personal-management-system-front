<template>
  <div>

    <WarningModal :is-visible="showModal"
                  id="todo-element-remove"
                  :title="$t('todo.common.removeElementModal.header')"
                  @modal-closed="onModalClosed"
                  @confirm="onDelete"
                  :size="modalSize"
    >
      <template #content>
        {{ $t('todo.common.removeElementModal.text') }}
      </template>
    </WarningModal>

  </div>
</template>

<script lang="ts">
import WarningModal                 from "@/components/Modal/WarningModal.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {SingleElement} from "@/scripts/Core/Types/Modules/Todo";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import SymfonyTodoRoutes from "@/router/SymfonyRoutes/Modules/SymfonyTodoRoutes";

export default {
  emits: [
    "modalClosed",
    "removeConfirmClick"
  ],
  data(): ComponentData {
    return {
      showModal: false,
    }
  },
  props: {
    element: {
      type: Object as SingleElement,
      required: true,
    },
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    }
  },
  components: {
    WarningModal,
  },
  mixins: [
    ResponsiveModalSizeMixin,
  ],
  methods: {
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
      this.$emit('modalClosed');
    },
    /**
     * @description handle deleting the entry on backend
     */
    async onDelete(): void {
      await this.$moduleCall.remove(SymfonyTodoRoutes.TODO_ELEMENT_BASE_URL, this.element.id);
      this.$emit('removeConfirmClick');
    }
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  }
}
</script>
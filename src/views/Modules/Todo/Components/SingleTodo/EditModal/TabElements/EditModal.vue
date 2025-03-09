<template>
  <Modal :is-visible="showModal"
         :title="$t('todo.common.editElementModal.header') + ': ' + element.name"
         @modal-closed="onModalClosed"
         :size="modalSize"
         :cancel-text="$t('todo.common.editModal.text.close')"
         v-if="element"
  >
    <template #content>
      <CreateEditElementForm :id="element.id"
                             :initial-name="element.name"
                             :todo-data="todoData"
                             :header="$t('todo.common.form.createEditTodoElement.headerEdit')"
                             @submit="$emit('confirmClick')"
      />
    </template>

  </Modal>
</template>

<script lang="ts">
import Modal                 from "@/components/Modal/Modal.vue";
import CreateEditElementForm from "@/views/Modules/Todo/Components/CreateEditElementForm.vue";

import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData}             from "@/scripts/Vue/Types/Components/types";
import {SingleElement, SingleTodo} from "@/scripts/Core/Types/Modules/Todo";

export default {
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
    todoData: {
      type: Object as SingleTodo,
      required: true,
    },
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    },
  },
  components: {
    CreateEditElementForm,
    Modal,
  },
  mixins: [
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
    }
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  },
  created(): void {
    this.initialSmallSizeModal = "medium";
  },
  watch: {
    isModalVisible(): void {
      this.showModal = this.isModalVisible;
    }
  }
}
</script>
<template>
  <div>
    <Modal :is-visible="showModal"
           id="todo-create"
           :title="$t('issues.pending.modal.addNewTodo.header')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>
        <CreateEditForm :can-select-module="false"
                        :is-submit-visible="isSubmitVisible"
        />
      </template>

      <template #footerRightSection>
        <MediumButtonWithIcon
            background-color-class="bg-blue-500"
            :text="$t('todo.common.form.createEditTodo.submit.label')"
            class="w-full sm:w-auto m-0-force"
            button-classes="w-full sm:w-auto"
            text-classes="text-center w-full"
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal                        from "@/components/Modal/Modal.vue";
import CreateEditForm               from "@/views/Modules/Todo/Components/CreateEditForm.vue";
import MediumButtonWithIcon         from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";
import TodoModuleMixin              from "@/views/Modules/Todo/Mixin/TodoModuleMixin.vue";

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
    },
    isSubmitVisible: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  components: {
    MediumButtonWithIcon,
    Modal,
    CreateEditForm,
  },
  mixins: [
    ResponsiveModalSizeMixin,
    TodoModuleMixin,
  ],
  emits: [
    "modalClosed",
    "todoElementAddClick"
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
  },
}
</script>
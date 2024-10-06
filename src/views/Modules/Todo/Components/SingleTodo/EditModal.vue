<template>
  <div v-if="todoData">
    <Modal :is-visible="showModal"
           :title="todoData.name"
           @modal-closed="onModalClosed"
           :size="modalSize"
           :cancel-text="$t('todo.common.editModal.text.close')"
    >
      <template #content>
        <Tabs :tabs-with-content="tabsContent"
              id="todoEditModal"
        />
      </template>

      <template #footerRightSection>
        <!-- delete -->
        <MediumButtonWithIcon
            background-color-class="bg-red-500"
            :text="$t('todo.common.editModal.text.delete')"
            class="w-full sm:w-auto m-0-force"
            button-classes="w-full sm:w-auto"
            text-classes="text-center w-full"
            @click="save"
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Tabs                         from "@/components/Navigation/Tabs/Tabs.vue";
import TabElements                  from "@/views/Modules/Todo/Components/SingleTodo/EditModal/TabElements.vue";
import TabEdit                      from "@/views/Modules/Todo/Components/SingleTodo/EditModal/TabEdit.vue";
import Modal                        from "@/components/Modal/Modal.vue";
import MediumButtonWithIcon         from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";
import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      showModal: false,
    }
  },
  props: {
    todoData: {
      type: Object,
      required: true,
    },
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    },
  },
  components: {
    Tabs,
    MediumButtonWithIcon,
    Modal,
  },
  mixins: [
    FailedBackendResponseHandler,
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
    "confirmClick",
  ],
  computed: {
    /**
     * @description returns the data structure for tabs
     */
    tabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName: this.$t('todo.common.editModal.text.tab.todoList.label'),
          tabComponent: TabElements,
          tabComponentProps: {
            todoData: this.todoData
          }
        },
        {
          tabName: this.$t('todo.common.editModal.text.tab.edit.label'),
          tabComponent: TabEdit,
          tabComponentProps: {
            todoData: this.todoData
          }
        }
      ];
    }
  },
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
  created(): void {
    this.initialSmallSizeModal = "medium";
  }
}
</script>
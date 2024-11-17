<template>
  <Base :info-block-description="$t('todo.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent"
          @single-todo-click="onSingleTodoClick"
    />

    <Container class="mt-4">
      <div class="flex justify-center">
        <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
          <h2 class="text-lg mb-2">{{ $t('todo.common.form.createEditTodo.header.new') }}</h2>
          <CreateEditForm @submit="getAll"
                          ref="form"
          />
        </div>
      </div>
    </Container>
  </Base>

  <EditModal :is-modal-visible="isEditModalVisible"
             @modal-closed="onEditClose"
             @delete-click="isRemoveModalVisible = true"
             @delete-element-click="onElementDelete"
             @edit-element-click="onElementEdit"
             @update-confirm-click="getAll"
             @create-click="onElementCreateOrUpdate"
             :todo-data="activeTodo"
  />

  <RemoveModal :is-modal-visible="isRemoveModalVisible"
               @modal-closed="isRemoveModalVisible = false"
               @remove-confirm-click="onRemoveConfirm"
               class="relative z-21"
               :todo-data="activeTodo"
  />

  <ElementEditModal :is-modal-visible="isElementEditModalVisible"
                    :element="activeElement"
                    :todo-data="activeTodo"
                    @modal-closed="isElementEditModalVisible = false; activeElement = null"
                    @confirm-click="onElementCreateOrUpdate"
                    class="relative z-30"
  />

  <ElementRemoveModal :is-modal-visible="isElementRemoveModalVisible"
                      :element="activeElement"
                      @modal-closed="isElementRemoveModalVisible = false; activeElement = null"
                      @remove-confirm-click="oneElementRemoveConfirm"
                      class="relative z-21"
  />

</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import TodoModuleMixin from "@/views/Modules/Todo/Mixin/TodoModuleMixin.vue";

import CreateEditForm from "@/views/Modules/Todo/Components/CreateEditForm.vue";

import Container from "@/components/Ui/Containers/Container.vue";
import Tabs      from "@/components/Navigation/Tabs/Tabs.vue";
import Base      from "@/views/Modules/Base.vue";

import TabGoals  from "@/views/Modules/Todo/Components/Tabs/TabGoals.vue";
import TabIssues from "@/views/Modules/Todo/Components/Tabs/TabIssues.vue";
import TabTodo   from "@/views/Modules/Todo/Components/Tabs/TabTodo.vue";

import EditModal   from "@/views/Modules/Todo/Components/SingleTodo/EditModal.vue";
import RemoveModal from "@/views/Modules/Todo/Components/SingleTodo/RemoveModal.vue";

import ElementEditModal   from "@/views/Modules/Todo/Components/SingleTodo/EditModal/TabElements/EditModal.vue";
import ElementRemoveModal from "@/views/Modules/Todo/Components/SingleTodo/EditModal/TabElements/RemoveModal.vue";

import SymfonyTodoRoutes from "@/router/SymfonyRoutes/Modules/SymfonyTodoRoutes";

export default {
  data(): ComponentData {
    return {
      activeTodo: null,
      activeElement: null,
      todo: [],
      isEditModalVisible: false,
      isRemoveModalVisible: false,
      isElementRemoveModalVisible: false,
      isElementEditModalVisible: false,
      years: [
        {
          label: 2019,
          value: 2019,
        },
        {
          label: 2023,
          value: 2023,
        },
      ],
    }
  },
  components: {
    CreateEditForm,
    ElementRemoveModal,
    ElementEditModal,
    RemoveModal,
    EditModal,
    Container,
    Base,
    Tabs,
  },
  mixins: [
    TodoModuleMixin,
  ],
  computed: {
    /**
     * @description returns the data structure for tabs
     */
    tabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName: this.$t('todo.tab.todo.header'),
          tabComponent: TabTodo,
          tabComponentProps: {
            allTodo: this.todo
          }
        },
        {
          tabName: this.$t('todo.tab.goals.header'),
          tabComponent: TabGoals,
          tabComponentProps: {
            allTodo: this.todo
          }
        },
        {
          tabName: this.$t('todo.tab.issues.header'),
          tabComponent: TabIssues,
          tabComponentProps: {
            allTodo: this.todo
          }
        }
      ];
    }
  },
  methods: {
    /**
     * @description element gets removed, close the modals, and re-fetch all entries
     */
    oneElementRemoveConfirm(): void {
      this.isElementRemoveModalVisible = false;
      this.isEditModalVisible = false;
      this.getAll();
    },
    /**
     * @description triggered when element creation / update has been confirmed
     */
    onElementCreateOrUpdate(): void {
      this.activeTodo = null;
      this.activeElement = null;

      this.isEditModalVisible = false;
      this.isElementEditModalVisible = false;

      this.getAll();
    },
    /**
     * @description when element-delete is clicked: show modal, set currently handled element data
     */
    onElementDelete(eventData: Record): void {
      this.isElementRemoveModalVisible = true;
      this.activeElement = eventData.element;
    },
    /**
     * @description sets the active element and makes the element edit modal visible
     */
    onElementEdit(eventData: Record): void {
      this.isElementEditModalVisible = true;
      this.activeElement = eventData.element;
    },
    /**
     * @description when todo-edit modal is closed: hide modal, unset todo data and clear form
     */
    onEditClose(): void {
      this.isEditModalVisible = false;
      this.activeTodo = null;
      this.$refs.form.clearFormData();
    },
    /**
     * @description returns all entries from backend
     */
    async getAll(): Promise<void> {
      this.todo = await this.$moduleCall.getAll(SymfonyTodoRoutes.TODO_BASE_URL);
    },
    /**
     * @description closes all the dialogs and fetches new data state
     */
    onRemoveConfirm(): void {
      this.isRemoveModalVisible = false;
      this.isElementRemoveModalVisible = false;
      this.isEditModalVisible = false
      this.getAll();
    },
    /**
     * @description sets the active todo data and shows the dialog
     */
    onSingleTodoClick(id: number): void {
      this.activeTodo = this.getTodoById(id, this.todo);
      this.isEditModalVisible = true;
    }
  },
  beforeMount(): void {
    this.getAll();
  }
}
</script>
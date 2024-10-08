<template>
  <div  class="issue-block"
        :class="{
          'issue-block-fluid': !isDashboardWidget,
          'issue-block-big': isDashboardWidget,
       }"
  >
    <div class="w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <!-- top with menu -->
      <div class="flex flex-row items-center justify-between mb-6">
        <div class="flex flex-col">
          <div class="text-lg text-blue-500"><span v-html="title" /></div>
        </div>

        <div class="relative">
          <Hamburger @click="onHamburgerClick"
                     v-if="isMenuVisible"
          />
          <Menu :is-menu-open="isMenuOpen"
                @add-records-click="isAddRecordModalVisible = true; isMenuOpen = false;"
                @handle-related-todo-click="onHandleTodoClick"
                @view-edit-click="isViewEditModalVisible = true; isMenuOpen = false;"
                @removed-click="isRemoveModalVisible = true; isMenuOpen = false;"
          />
        </div>
      </div>

      <div class="w-full">
        <!-- todo: set props properly -->
        <MainContent :contact-entries-count="contacts.length"
                     last-contact-date="22.06.2024"
                     last-progress-date="30.07.2024"
                     :progress-entries-count="progressList.length"
        />
        <BottomContent :is-for-dashboard="isForDashboard"
                       v-if="isDashboardStateVisible"
        />
      </div>
    </div>
  </div>

  <div v-if="isMenuVisible">
    <RemoveModal :is-modal-visible="isRemoveModalVisible"
                 @modal-closed="this.isRemoveModalVisible = false"
                 @remove-confirm-click="onRemoveConfirmed"
    />

    <AddRecordsModal :is-modal-visible="isAddRecordModalVisible"
                 @modal-closed="this.isAddRecordModalVisible = false"
                 @add-contact-click="onAddContactClick"
                 @add-issue-click="onAddIssueClick"
    />

    <AddNewTodoModal :is-modal-visible="isHandleTodoModalVisible"
                     :is-submit-visible="false"
                     @modal-closed="this.isHandleTodoModalVisible = false"
                     @confirm-click="onHandleRelatedTodoConfirmed"
                     @add-todo-click="addTodoClicked"
                     @todo-element-toggle-state-click="todoElementToggleStateClicked"
                     @todo-element-remove-click="todoElementRemoveClicked"
                     @todo-element-update-click="todoElementUpdateClicked"
                     @todo-element-add-click="todoElementAddClicked"
    />

    <ViewEditModal :is-modal-visible="isViewEditModalVisible"
                     @modal-closed="this.isViewEditModalVisible = false"
                     @confirm-click="onViewEditConfirmed"
                     @contact-remove-click="onContactRemoveClick"
                     @contact-update-click="onContactUpdateClick"
                     @progress-remove-click="onProgressRemoveClick"
                     @progress-update-click="onProgressUpdateClick"
    />

    <EditTodoModal :is-modal-visible="isTodoEditModalVisible"
                   @modal-closed="isTodoEditModalVisible = false"
                   :todo-data="todo"
                   :can-select-module="false"
    />
  </div>

</template>

<script lang="ts">

import EditTodoModal   from "@/views/Modules/Todo/Components/SingleTodo/EditModal.vue";
import Hamburger       from "@/views/Modules/Issues/Components/IssueBlock/Components/Hamburger.vue";
import Menu            from "@/views/Modules/Issues/Components/IssueBlock/Components/Menu.vue";
import MainContent     from "@/views/Modules/Issues/Components/IssueBlock/Components/MainContent.vue";
import BottomContent   from "@/views/Modules/Issues/Components/IssueBlock/Components/BottomContent.vue";

import AddNewTodoModal from "@/views/Modules/Issues/Components/AddNewTodoModal.vue";
import AddRecordsModal from "@/views/Modules/Issues/Components/AddRecordsModal.vue";
import ViewEditModal   from "@/views/Modules/Issues/Components/ViewEditModal.vue";
import RemoveModal     from "@/views/Modules/Issues/Components/RemoveModal.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import TypeChecker from "@/scripts/Core/Services/Types/TypeChecker";

export default {
  data(): ComponentData {
    return {
      isTodoEditModalVisible: false,
      isHandleTodoModalVisible: false,
      isAddRecordModalVisible: false,
      isViewEditModalVisible: false,
      isRemoveModalVisible: false,
      isMenuOpen: false,
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    todo: {
      type: [Object, null],
      required: true
    },
    contacts: {
      type: Array,
      required: true,
    },
    progressList: {
      type: Array,
      required: true
    },
    isForDashboard: {
      type: Boolean,
      required: true,
    },
    isDashboardStateVisible: {
      type: Boolean,
      required: false,
      default: true,
    },
    isMenuVisible: {
      type: Boolean,
      required: false,
      default: true,
    },
    isDashboardWidget: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  components: {
    EditTodoModal,
    RemoveModal,
    AddNewTodoModal,
    AddRecordsModal,
    ViewEditModal,
    Menu,
    Hamburger,
    MainContent,
    BottomContent,
  },
  emits: [
    "reFetchData"
  ],
  methods: {
    /**
     * @description handles user clicking contact entry removal
     *              - updates front and backend
     */
    onContactRemoveClick(): void {
      //
    },
    /**
     * @description handles user clicking contact entry update
     *              - updates front and backend
     */
    onContactUpdateClick(): void {
      //
    },
    /**
     * @description handles user clicking progress entry removal
     *              - updates front and backend
     */
    onProgressRemoveClick(): void {
      //
    },
    /**
     * @description handles user clicking progress entry update
     *              - updates front and backend
     */
    onProgressUpdateClick(): void {
      //
    },
    /**
     * @description handle user clicking on the hamburger menu, basically does toggle menu state
     */
    onHamburgerClick(): void {
      this.isMenuOpen = !this.isMenuOpen
    },
    /**
     * @description handles user clicking on the add todo, and thus creating it
     *              - updates front and backend
     */
    addTodoClicked(): void {
      //
    },
    /**
     * @description handles user clicking on the toggle-todo-element-state,
     *              - updates front and backend
     */
    todoElementToggleStateClicked(): void {
      //
    },
    /**
     * @description handles user clicking on the remove-todo-element-state,
     *              - updates front and backend
     */
    todoElementRemoveClicked(): void {
      //
    },
    /**
     * @description handles user clicking on the edit-todo-element and then saving changes,
     *              - updates front and backend
     */
    todoElementUpdateClicked(): void {
      //
    },
    /**
     * @description handles user clicking on the add todo (when non exists yet),
     *              - updates front and backend
     */
    todoElementAddClicked(): void {
      //
    },
    /**
     * @description handle user clicking on Add issue contact:
     *              - update front,
     *              - call backend to save data
     */
    onAddContactClick(): void {
      //
    },
    /**
     * @description handle user clicking on Add issue contact:
     *              - update front,
     *              - call backend to save data
     */
    onAddIssueClick(): void {
      //
    },
    /**
     * @description handle user clicking on handling related todo action in the menu
     *              displays dialog
     */
    onHandleRelatedTodoConfirmed(): void {
      //
    },
    /**
     * @description handle user clicking on view-edit action in the menu
     *              displays dialog
     */
    onViewEditConfirmed(): void {
      //
    },
    /**
     * @description handle user confirming record removal
     *              - remove entry on backend,
     *              - update front
     *              - hide modal
     */
    onRemoveConfirmed(): void {
      //
    },
    /**
     * @description hide menu, show either create-todo or edit-todo modal
     */
    onHandleTodoClick(): void {
      if (!this.todo || TypeChecker.isObject(this.todo) && Object.keys(this.todo).length === 0) {
        this.isHandleTodoModalVisible = true;
      } else {
        this.isTodoEditModalVisible = true;
      }

      this.isMenuOpen = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.issue-block {
  @apply p-2
}

.issue-block-fluid {
  @apply w-full xl:w-1/4 lg:w-1/3 md:w-1/2 md:p-2
}

.issue-block-big {
  @apply w-full lg:w-1/2
}
</style>
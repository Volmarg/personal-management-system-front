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
        <div class="flex flex-col text-left">
          <div class="text-lg text-blue-500"><span v-html="title" /></div>
          <div class="mt-1 text-sm text-gray-400"><span v-html="description" /></div>
        </div>

        <div class="relative">
          <Hamburger @click="onHamburgerClick"
                     v-if="isMenuVisible"
          />
          <Menu :is-menu-open="isMenuOpen"
                @handle-related-todo-click="onHandleTodoClick"
                @view-edit-click="isViewEditModalVisible = true; isMenuOpen = false;"
                @removed-click="isRemoveModalVisible = true; isMenuOpen = false;"
          />
        </div>
      </div>

      <div class="w-full">
        <MainContent :contact-entries-count="contacts.length"
                     :last-contact-date="lastContactDate"
                     :last-progress-date="lastProgressDate"
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

    <AddNewTodoModal :is-modal-visible="isHandleTodoModalVisible"
                     :is-submit-visible="false"
                     @modal-closed="this.isHandleTodoModalVisible = false"
    />

    <ViewEditModal :is-modal-visible="isViewEditModalVisible"
                   :id="id"
                   :name="title"
                   :description="description"
                   :show-on-dashboard="isForDashboard"
                   :contacts="contacts"
                   :all-progress="progressList"
                   @modal-closed="this.isViewEditModalVisible = false"
                   @confirm-click="onViewEditConfirmed"
                   @contact-edit-click="isContactEditModalVisible = true; editedContact = $event.contact"
                   @progress-edit-click="isProgressEditModalVisible = true; editedProgress = $event.progress"
    />

    <EditTodoModal :is-modal-visible="isTodoEditModalVisible"
                   @modal-closed="isTodoEditModalVisible = false"
                   :todo-data="todo"
                   :can-select-module="false"
    />

    <ContactEditModal :is-modal-visible="isContactEditModalVisible"
                      @modal-closed="isContactEditModalVisible = false"
                      @remove-click="isContactRemoveModalVisible = true; removedContact = $event.contact"
                      :contact="editedContact"
                      class="relative z-21"
    />

    <ContactRemoveModal :is-modal-visible="isContactRemoveModalVisible"
                        @modal-closed="isContactRemoveModalVisible = false"
                        :contact="removedContact"
                        class="relative z-22"
    />

    <ProgressEditModal :is-modal-visible="isProgressEditModalVisible"
                       @modal-closed="isProgressEditModalVisible = false"
                       @remove-click="isProgressRemoveModalVisible = true; removedProgress = $event.progress"
                       :progress="editedProgress"
                       class="relative z-21"
    />

    <ProgressRemoveModal :is-modal-visible="isProgressRemoveModalVisible"
                         @modal-closed="isProgressRemoveModalVisible = false"
                         :progress="removedProgress"
                         class="relative z-22"
    />

  </div>

</template>

<script lang="ts">

import EditTodoModal   from "@/views/Modules/Todo/Components/SingleTodo/EditModal.vue";
import Hamburger       from "@/views/Modules/Issues/Components/IssueBlock/Components/Hamburger.vue";
import Menu            from "@/views/Modules/Issues/Components/IssueBlock/Components/Menu.vue";
import MainContent     from "@/views/Modules/Issues/Components/IssueBlock/Components/MainContent.vue";
import BottomContent   from "@/views/Modules/Issues/Components/IssueBlock/Components/BottomContent.vue";

import ProgressEditModal   from "@/views/Modules/Issues/Components/ViewEditModal/Tabs/TabProgress/ProgressEditModal.vue";
import ProgressRemoveModal from "@/views/Modules/Issues/Components/ViewEditModal/Tabs/TabProgress/ProgressRemoveModal.vue";

import ContactEditModal   from "@/views/Modules/Issues/Components/ViewEditModal/Tabs/TabContacts/ContactEditModal.vue";
import ContactRemoveModal from "@/views/Modules/Issues/Components/ViewEditModal/Tabs/TabContacts/ContactRemoveModal.vue";

import AddNewTodoModal from "@/views/Modules/Issues/Components/AddNewTodoModal.vue";
import ViewEditModal   from "@/views/Modules/Issues/Components/ViewEditModal.vue";
import RemoveModal     from "@/views/Modules/Issues/Components/RemoveModal.vue";

import {ComponentData}                 from "@/scripts/Vue/Types/Components/types";
import {SingleContact, SingleProgress} from "@/scripts/Core/Types/Modules/Issues";


import TypeChecker         from "@/scripts/Core/Services/Types/TypeChecker";
import DateTimeProcessor   from "@/scripts/Core/Services/TypesProcessors/DateTimeProcessor";
import SymfonyIssuesRoutes from "@/router/SymfonyRoutes/Modules/SymfonyIssuesRoutes";

export default {
  data(): ComponentData {
    return {
      editedProgress: null as SingleProgress | null,
      removedProgress: null as SingleProgress | null,
      isProgressEditModalVisible: false,
      isProgressRemoveModalVisible: false,
      editedContact: null as SingleContact | null,
      removedContact: null as SingleContact | null,
      isContactEditModalVisible: false,
      isContactRemoveModalVisible: false,
      isTodoEditModalVisible: false,
      isHandleTodoModalVisible: false,
      isViewEditModalVisible: false,
      isRemoveModalVisible: false,
      isMenuOpen: false,
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
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
    ProgressEditModal,
    ProgressRemoveModal,
    ContactEditModal,
    ContactRemoveModal,
    EditTodoModal,
    RemoveModal,
    AddNewTodoModal,
    ViewEditModal,
    Menu,
    Hamburger,
    MainContent,
    BottomContent,
  },
  emits: [
    "reFetchData"
  ],
  computed: {
    /**
     * @description returns the latest contact date if any is set, null otherwise
     */
    lastContactDate(): string | null {
      if (this.contacts.length === 0) {
        return null;
      }

      let dates = this.contacts.map((contact: SingleContact) => contact.date);
      return DateTimeProcessor.getLatestDate(dates);
    },
    /**
     * @description returns the latest progress date if any is set, null otherwise
     */
    lastProgressDate(): string | null {
      if (this.progressList.length === 0) {
        return null;
      }

      let dates = this.progressList.map((progress: SingleProgress) => progress.date);
      return DateTimeProcessor.getLatestDate(dates);
    },
  },
  methods: {
    // todo: wipe the methods if not used + events and props
    /**
     * @description handle user clicking on the hamburger menu, basically does toggle menu state
     */
    onHamburgerClick(): void {
      this.isMenuOpen = !this.isMenuOpen
    },
    /**
     * @description handle user confirming record removal
     *              - remove entry on backend,
     *              - update front
     *              - hide modal
     */
    onRemoveConfirmed(): void {
      this.$moduleCall.remove(SymfonyIssuesRoutes.ISSUE_BASE_URL, this.id);
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
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
          <CreateEditForm @form-submit="onNewSubmit" />
        </div>
      </div>
    </Container>
  </Base>


  <EditModal :is-modal-visible="isEditModalVisible"
             @modal-closed="isEditModalVisible = false"
             :todo-data="activeTodo"
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
import EditModal from "@/views/Modules/Todo/Components/SingleTodo/EditModal.vue";

export default {
  data(): ComponentData {
    return {
      activeTodo: null,
      todo: [
        {
          id: 1,
          name: "Learn symfony framework",
          description: "Discover the magic of Symfony",
          showOnDashboard: true,
          elements: [
            {
              id: 1,
              name: "Play with demo project",
              isDone: true,
            },
            {
              id: 2,
              name: "Get some online courses",
              isDone: true,
            },
            {
              id: 3,
              name: "Create Your own project on Symfony 7.x",
              isDone: false,
            },
          ],
          module: {
            name: "issues",
            id: 1,
          }
        },
        {
          id: 3,
          name: "Get an expensive cookie",
          description: "Need super expensive sweets, cuz I'm worth it!",
          showOnDashboard: true,
          elements: [
            {
              id: 5,
              name: "Eat the cookie!",
              isDone: false,
            },
          ],
          module: {
            name: null,
            id: 1,
          }
        },
        {
          id: 2,
          name: "Start learning how to play guitar",
          description: "",
          showOnDashboard: false,
          elements: [
            {
              id: 4,
              name: "Get guitar",
              isDone: false,
            },
            {
              id: 5,
              name: "Check methods for self learning",
              isDone: true,
            },
            {
              id: 6,
              name: "Check guitars to buy",
              isDone: true,
            },
            {
              id: 7,
              name: "Test",
              isDone: false,
            },
          ],
          module: {
            name: "goals",
            id: "",
          }
        },
      ],
      isEditModalVisible: false,
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
     * @description handle user pressing submit, creates entry in db and updates front
     */
    onNewSubmit(): void {
      //
    },
    /**
     * @description sets the active todo data and shows the dialog
     */
    onSingleTodoClick(id: number): void {
      this.activeTodo = this.getTodoById(id, this.todo);
      this.isEditModalVisible = true;
    }
  }
}
</script>
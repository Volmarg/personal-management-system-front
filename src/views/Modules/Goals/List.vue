<template>
  <Base :info-block-description="$t('goals.list.description')">
    <div class="flex flex-wrap"
         v-if="usedTodo.length > 0"
    >
      <SingleTodo v-for="singleTodo in usedTodo"
                  :name="singleTodo.name"
                  :description="singleTodo.description"
                  :id="singleTodo.id"
                  :show-on-dashboard="singleTodo.showOnDashboard"
                  @single-todo-click="onSingleTodoClick(singleTodo.id)"
      />
    </div>
    <NoResultsText v-else />
  </Base>

  <EditModal :is-modal-visible="isEditModalVisible"
             @modal-closed="isEditModalVisible = false"
             :todo-data="activeTodo"
  />
</template>

<script lang="ts">
import SingleTodo    from "@/views/Modules/Todo/Components/SingleTodo.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";
import Base          from "@/views/Modules/Base.vue";
import EditModal     from "@/views/Modules/Todo/Components/SingleTodo/EditModal.vue";

import TodoModuleMixin from "@/views/Modules/Todo/Mixin/TodoModuleMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      activeTodo: null,
      isEditModalVisible: false,
      allTodo: [
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
      ]
    }
  },
  components: {
    EditModal,
    Base,
    NoResultsText,
    SingleTodo
  },
  emits: [
    'singleTodoClick'
  ],
  mixins: [
    TodoModuleMixin
  ],
  computed: {
    /**
     * @description returns the list of todo objects used in this component for given module
     */
    usedTodo(): Array<Record> {
      return this.allTodo.filter((singleTodo) => singleTodo.module.name === this.boundModule.goals);
    },
  },
  methods: {
    /**
     * @description sets the active todo data and shows the dialog
     */
    onSingleTodoClick(id: number): void {
      this.activeTodo = this.getTodoById(id, this.allTodo);
      this.isEditModalVisible = true;
    }
  }
}
</script>
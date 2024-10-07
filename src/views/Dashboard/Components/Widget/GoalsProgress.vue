<template>
  <BigDataDisplayBlock :header="$t('dashboard.widget.goalProgress.header')">
    <div class="flex flex-wrap flex-row justify-between">
      <SingleTodo v-for="singleTodo in allTodo"
                  :name="singleTodo.name"
                  :description="singleTodo.description"
                  :elements="singleTodo.elements"
                  :id="singleTodo.id"
                  :show-on-dashboard="singleTodo.showOnDashboard"
                  :is-interactive="false"
                  :show-elements-in-block="true"
                  @single-todo-click="onSingleTodoClick(singleTodo.id)"
      />
    </div>

    <NoResultsText v-if="allTodo.length === 0" />
  </BigDataDisplayBlock>
</template>

<script lang="ts">
import BigDataDisplayBlock from "@/views/Dashboard/Components/BigDataDisplayBlock.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";
import SingleTodo          from "@/views/Modules/Todo/Components/SingleTodo.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
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
    SingleTodo,
    NoResultsText,
    BigDataDisplayBlock
  }
}
</script>
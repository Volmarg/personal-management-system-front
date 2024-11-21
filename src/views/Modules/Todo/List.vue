<template>
  <ListBase :todo-provider="todoProvider">
    <template #default="props">
      {{handleSlotData(props)}}
      <Tabs :tabs-with-content="tabsContent"
            @single-todo-click="props.onSingleTodoClick"
      />
    </template>
  </ListBase>
</template>

<script lang="ts">
import ListBase from "@/views/Modules/Todo/ListBase.vue";
import Tabs     from "@/components/Navigation/Tabs/Tabs.vue";

import TabTodo   from "@/views/Modules/Todo/Components/Tabs/TabTodo.vue";
import TabGoals  from "@/views/Modules/Todo/Components/Tabs/TabGoals.vue";
import TabIssues from "@/views/Modules/Todo/Components/Tabs/TabIssues.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyTodoRoutes from "@/router/SymfonyRoutes/Modules/SymfonyTodoRoutes";

export default {
  data(): ComponentData {
    return {
      isFetched: false,
      todo: [],
    }
  },
  components: {
    Tabs,
    ListBase
  },
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
     * @description takes any necessary slot props data and passes them onto THIS component data
     */
    handleSlotData(data: Record): void {
      this.todo = data.todo;
    },
    /**
     * @description returns a promise that returns the used todo upon resolving
     */
    todoProvider(): Promise {
      return this.$moduleCall.getAll(SymfonyTodoRoutes.TODO_BASE_URL);
    }
  },
}
</script>
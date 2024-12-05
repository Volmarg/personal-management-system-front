<template>
  <ListBase :todo-provider="goalsProvider"
            :can-select-module="false"
            :selected-module-id="moduleId"
  >
    <template #default="props">
      {{handleSlotData(props)}}
      <TodoGroupBase :all-todo="todo"
                     :module-name="boundModule.goals"
                     @single-todo-click="props.onSingleTodoClick"
      />
    </template>
  </ListBase>
</template>

<script lang="ts">
import ListBase      from "@/views/Modules/Todo/ListBase.vue";
import TodoGroupBase from "@/views/Modules/Todo/Components/TodoGroupBase.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyGoalsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyGoalsRoutes";

import TodoModuleMixin from "@/views/Modules/Todo/Mixin/TodoModuleMixin.vue";

import {CommonState} from "@/scripts/Vue/Store/Module/CommonState";

export default {
  data(): ComponentData {
    return {
      isFetched: false,
      todo: [],
      moduleId: null,
    }
  },
  components: {
    TodoGroupBase,
    ListBase
  },
  mixins: [
    TodoModuleMixin
  ],
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
    goalsProvider(): Promise {
      return this.$moduleCall.getAll(SymfonyGoalsRoutes.GOALS_BASE_URL);
    }
  },
  async beforeMount(): Promise<void> {
    this.moduleId = await CommonState().getRelationModuleId(this.boundModule.goals);
  }
}
</script>
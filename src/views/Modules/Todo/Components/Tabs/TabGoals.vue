<template>
  <TodoBaseList :all-todo="allTodo"
                :module="boundModule.goals"
  />
</template>

<script lang="ts">
import TodoModuleMixin from "@/views/Modules/Todo/Mixin/TodoModuleMixin.vue";

import TodoBaseList from "@/views/Modules/Todo/Components/TodoBaseList.vue";

export default {
  props: {
    allTodo: {
      type: Array,
      required: true,
    }
  },
  components: {
    TodoBaseList
  },
  mixins: [
    TodoModuleMixin
  ]
}
</script>
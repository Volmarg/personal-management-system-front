<template>
  <TodoBaseList :all-todo="allTodo"
                :module="null"
  />
</template>

<script lang="ts">
import TodoBaseList  from "@/views/Modules/Todo/Components/TodoBaseList.vue";

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
}
</script>
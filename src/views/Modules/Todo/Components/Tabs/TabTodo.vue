<template>
  <TodoGroupBase :all-todo="allTodo"
                 :module-name="null"
  />
</template>

<script lang="ts">
import TodoGroupBase  from "@/views/Modules/Todo/Components/TodoGroupBase.vue";

export default {
  props: {
    allTodo: {
      type: Array,
      required: true,
    }
  },
  components: {
    TodoGroupBase
  },
}
</script>
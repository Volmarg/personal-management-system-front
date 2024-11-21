<template>
  <TodoGroupBase :all-todo="allTodo"
                 :module-name="boundModule.goals"
  />
</template>

<script lang="ts">
import TodoModuleMixin from "@/views/Modules/Todo/Mixin/TodoModuleMixin.vue";

import TodoGroupBase from "@/views/Modules/Todo/Components/TodoGroupBase.vue";

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
  mixins: [
    TodoModuleMixin
  ]
}
</script>
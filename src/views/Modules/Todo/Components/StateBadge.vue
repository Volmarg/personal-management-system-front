<template>
  <Badge class="self-center"
         :background-class="isDone ? 'bg-green-500' : 'bg-blue-500'"
  >
    <span v-if="isDone">
      {{ $t('todo.common.todoList.state.done') }}
    </span>

    <span v-else>
      {{ $t('todo.common.todoList.state.notDone') }}
    </span>
  </Badge>
</template>

<script lang="ts">
import Badge from "@/components/Ui/Badge/Badge.vue";

export default {
  props: {
    isDone: {
      type: Boolean,
      required: true,
    }
  },
  components: {
    Badge,
  }
}
</script>
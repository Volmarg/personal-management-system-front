<template>
  <div class="flex flex-wrap mt-10"
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
</template>

<script lang="ts">
import SingleTodo    from "@/views/Modules/Todo/Components/SingleTodo.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";

export default {
  props: {
    allTodo: {
      type: Array,
      required: true,
    },
    moduleName: {
      type: [String, null],
      required: true,
    }
  },
  components: {
    NoResultsText,
    SingleTodo
  },
  emits: [
    'singleTodoClick'
  ],
  computed: {
    /**
     * @description returns the list of todo objects used in this component for given module
     */
    usedTodo(): Array<Record> {
      return this.allTodo.filter((singleTodo) => singleTodo.module.name === this.moduleName);
    },
  },
  methods: {
    /**
     * @description handle clicking on the single todo block, emit the event with data further
     */
    onSingleTodoClick(data: Record): void {
      this.$emit('singleTodoClick', data)
    }
  }
}
</script>
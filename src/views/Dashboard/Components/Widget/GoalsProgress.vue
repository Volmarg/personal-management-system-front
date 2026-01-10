<template>
  <BigDataDisplayBlock :header="$t('dashboard.widget.goalProgress.header')"
                       :is-locked="isLocked"
  >
    <div class="flex flex-wrap flex-row justify-between">
      <SingleTodo v-for="singleTodo in data"
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

    <NoResultsText v-if="data.length === 0" />
  </BigDataDisplayBlock>
</template>

<script lang="ts">
import BigDataDisplayBlock from "@/views/Dashboard/Components/BigDataDisplayBlock.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";
import SingleTodo          from "@/views/Modules/Todo/Components/SingleTodo.vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    isLocked: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  components: {
    SingleTodo,
    NoResultsText,
    BigDataDisplayBlock
  }
}
</script>
<template>
  <!-- entries -->
  <div v-if="elements.length > 0">
    <SingleElement v-for="element of visibleResults"
                   :key="JSON.stringify(element)"
                   :element="element"
                   :todo="todoData"
                   @remove-click="$emit('removeClick', {element: element})"
                   @edit-click="$emit('editClick', {element: element})"
    />

    <Pagination :number-of-results="elements.length"
                :initial-current-page="currentPage"
                :initial-count-of-result-per-page="resultsPerPage"
                @page-number-changes="onPaginationChange"
                class="mt-6"
    />

    <hr class="mt-4">
  </div>

  <NoResultsText v-else/>

  <!-- form -->
  <CreateEditElementForm @submit="$emit('createClick')"
                         :header="$t('todo.common.form.createEditTodoElement.headerNew')"
                         :todo-data="todoData"
  />

</template>

<script lang="ts">
import SingleElement         from "@/views/Modules/Todo/Components/SingleTodo/EditModal/TabElements/SingleElement.vue";
import NoResultsText         from "@/components/Page/NoResultsText.vue";
import Pagination            from "@/components/Ui/Pagination.vue";
import CreateEditElementForm from "@/views/Modules/Todo/Components/CreateEditElementForm.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import PaginationMixin from "@/scripts/Vue/Mixins/Ui/PaginationMixin.vue";

export default {
  data(): ComponentData {
    return {
      currentPage: 1,
      resultsPerPage: 5,
      visibleResults: [],
      checkboxes: {},
    }
  },
  props: {
    todoData: {
      type: Object,
      required: true,
    },
  },
  components: {
    CreateEditElementForm,
    Pagination,
    NoResultsText,
    SingleElement,
  },
  emits: [
    'singleTodoClick',
    'createClick',
    "removeClick",
    "editClick",
  ],
  mixins: [
    PaginationMixin,
  ],
  computed: {
    /**
     * @description returns elements in the todo
     */
    elements(): Array {
      if (Object.keys(this.todoData).length > 0 && this.todoData.elements.length > 0) {
        return this.todoData.elements;
      }

      return [];
    }
  },
  methods: {
    /**
     * @description will handle the event when page number changes on pagination
     */
    onPaginationChange(currentPage: number, countOfResultsPerPage: number): void {
      this.currentPage    = currentPage;
      this.visibleResults = this.filterShownResultByPagination(currentPage, countOfResultsPerPage, this.elements);
    },
  },
  mounted(): void {
    this.visibleResults = this.filterShownResultByPagination(this.currentPage, this.resultsPerPage, this.elements);
  }
}
</script>
<template>
  <div v-if="0 !== getCountOfPages">
      <v-pagination
          v-model="currentPage"
          :pages="getCountOfPages"
          :range-size="1"
          :active-color="color.blue"
          :hide-first-button="isPhoneBreakingPoint"
          :hide-last-button="isPhoneBreakingPoint"
          @update:modelValue="$emit('pageNumberChanges', currentPage, countOfResultsPerPage)"
      />
  </div>
</template>

<script lang="ts">
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import Colors              from "@/scripts/Vue/Mixins/Colors.vue";
import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

/**
 * @link https://www.npmjs.com/package/@hennge/vue3-pagination
 */
export default {
  name: "Pagination",
  data(): ComponentData {
    return {
      currentPage           : null,
      countOfResultsPerPage : null,
    }
  },
  props: {
    /**
     * @description this is amount of results shown per page
     */
    initialCountOfResultPerPage: {
      type     : Number,
      required : false,
      default  : 2,
    },
    /**
     * @description this is number of page to be initially selected
     */
    initialCurrentPage: {
      type     : Number,
      required : false,
      default  : 1,
    },
    /**
     * @description this is total amount of results to be handled and spited to pages
     */
    numberOfResults: {
      type     : Number,
      required : true,
    }
  },
  mixins: [
    Colors,
    ResponsiveVarsMixin,
  ],
  emits: [
    "pageNumberChanges"
  ],
  components: {
    "v-pagination" : VPagination,
  },
  computed: {
    /**
     * @description will return count of pages to be shown
     */
    getCountOfPages(): number {
      let countOfPages = Math.ceil(this.numberOfResults / this.countOfResultsPerPage);

      return countOfPages;
    }
  },
  methods: {
  },
  updated(): void {
    this.countOfResultsPerPage = this.initialCountOfResultPerPage;
    this.currentPage           = this.initialCurrentPage;
  },
  created(): void {
    this.currentPage           = this.initialCurrentPage;
    this.countOfResultsPerPage = this.initialCountOfResultPerPage;
  }
}
</script>

<style lang="scss">
  .Pagination * {
    font-size: 1.25rem;
  }

  .Pagination {
    li {
      $liMargin: 3px;
      margin-left: $liMargin;
      margin-right: $liMargin;
    }

    .Page-active {
      color: white;
      border-radius: 90px;
      padding: 15px;
    }
  }
</style>
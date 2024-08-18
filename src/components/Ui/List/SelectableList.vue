<template>
  <div>
    <ul class="flex-grow md:block px-0 sm:px-4 pb-4 md:pb-0 md:overflow-y-auto">

      <li v-for="(element, index) in visibleListElements"
          :key="index"
          class="flex justify-between template-list-element"
      >
        <span @click="onElementClicked(element, index)"
              :class="getListElementClasses(element)"
              class="
                inline-block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 hover:bg-gray-200 dark-mode:bg-gray-700
                dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200
                hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline
                text-left cursor-pointer rounded-b-none w-full
              "
        >
          {{ element[elementPropertyNameUsedAsLabel] }}
        </span>
        <slot name="list-element-extra-content"
              :array-index="index"
        ></slot>
      </li>
    </ul>

    <Pagination :number-of-results="countOfListElements"
                :initial-count-of-result-per-page="config.pagination.resultPerPage"
                :initial-current-page="config.pagination.currentPage"
                @page-number-changes="onPaginationChange"
                class="mt-5"
    />

  </div>

</template>

<script lang="ts">
import TypeChecker from "@/scripts/Core/Services/Types/TypeChecker";
import Md5Service  from "@/scripts/Core/Services/Crypto/Md5Service";

import PaginationMixin from "@/scripts/Vue/Mixins/Ui/PaginationMixin.vue";
import Pagination      from "@/components/Ui/Pagination.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

/**
 * @description this component is a list with selectable element
 */
export default {
  name: "SelectableList",
  data(): ComponentData {
    return {
      isInitiallyFiltered: false,
      selectedElementHash: null,
      visibleListElements: [],
      config: {
        pagination: {
          resultPerPage : 5,
          currentPage   : 1,
        }
      }
    }
  },
  props: {
    listElements: {
      type     : Array,
      required : true,
    },
    elementPropertyNameUsedAsLabel: {
      type     : String,
      required : true,
    },
    listElementClasses: {
      type     : [Object, String],
      required : false,
      default  : "",
    }
  },
  mixins: [
    PaginationMixin,
  ],
  emits: [
    "clickedElement"
  ],
  components: {
    Pagination,
  },
  computed: {
    /**
     * @description returns the count of all list elements
     */
    countOfListElements(): number {
      return this.listElements.length;
    }
  },
  methods: {
    /**
     * @description handler for when element on list is clicked:
     *              - calculates the element hash (used later to mark selected element on list)
     */
    onElementClicked(listElement: unknown, index: number): void {
      let elementHash          = this.getElementHash(listElement);
      this.selectedElementHash = elementHash;

      this.$emit('clickedElement', index)
    },
    /**
     * @description returns the hash value of the selected element
     */
    getElementHash(listElement): string {
      let elementHash = Md5Service.hash(JSON.stringify(listElement));

      return elementHash;
    },
    /**
     * @description will handle the event when page number changes on pagination
     */
    onPaginationChange(currentPage: number, countOfResultsPerPage: number): void {
      this.config.pagination.currentPage = currentPage;
      this.visibleListElements           = this.filterShownResultByPagination(currentPage, countOfResultsPerPage, this.listElements);
    },
    /**
     * @description will provide list elements classes
     *              this solution is needed due to css being already conditionally added and provided via prop
     */
    getListElementClasses(listElement: unknown): string {
      let definedClasses = 'bg-gray-200 template-selected text-blue-500 hover:text-blue-500';
      let mergedClasses  = "";

      let listElementHash = this.getElementHash(listElement);
      if (listElementHash === this.selectedElementHash) {
        mergedClasses += definedClasses;
      }

      let classesFromProp = "";
      if( TypeChecker.isObject(this.listElementClasses) ){

        let classesArray = Object.keys(this.listElementClasses);
        classesFromProp  = classesArray.join(" ");
      }else{

        classesFromProp = this.listElementClasses;
      }

      mergedClasses += classesFromProp;
      return mergedClasses;
    },
  },
  created(): void {
    // handle non async based list elements
    if (
            this.visibleListElements.length > 0
        &&  !this.isInitiallyFiltered
    ) {
      this.visibleListElements = this.filterShownResultByPagination(this.config.pagination.currentPage, this.config.pagination.resultPerPage, this.listElements);
      this.isInitiallyFiltered  = true;
    }

  },
  watch: {
    /**
     * @description some list elements are fetched via sync so need to check if list elements changed
     *              and if it did then initialize the select list from pagination
     */
    listElements(newValue){
      if (
              newValue.length > 0
          &&  !this.isInitiallyFiltered
      ) {
        this.visibleListElements = this.filterShownResultByPagination(this.config.pagination.currentPage, this.config.pagination.resultPerPage, this.listElements);
        this.isInitiallyFiltered  = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.template-list-element {
  border-bottom: 1px solid;
  @apply border-gray-200;
  &:hover {
    @apply rounded-lg
  }
}

.template-selected {
  @apply rounded-lg
}
</style>
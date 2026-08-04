<template>
  <div class="flex justify-end mb-4">
    <SearchInput v-model.trim="searchValue" />
  </div>

  <div v-if="visibleResults.length !== 0">
    <div class="files-list-wrapper">
      <div v-for="fileData in visibleResults"
           :key="fileData.fileNameWithExt"
           class="mt-2"
      >
        <FileListElement
            :file-id="fileData.id"
            :file-name-with-ext="fileData.fileNameWithExt"
            :file-path="fileData.path"
            :file-state="fileData.state"
            :illness-id="illness.id"
            :file-appointment-id="fileData.appointmentId"
            @remove-file="$emit('removeFile', $event)"
            @appointment-change="$emit('appointmentChange')"
            ref="fileListElement"
        />
      </div>
    </div>

    <div>
      <Pagination :number-of-results="searchValue ? searchMatchingResults.length : files.length"
                  :initial-current-page="currentPage"
                  :initial-count-of-result-per-page="resultsPerPage"
                  @page-number-changes="onPaginationPageNumberChange"
                  class="mt-2"
      />
    </div>
  </div>

  <NoResultsText v-else />

</template>

<script lang="ts">
import FileListElement from "@/views/Modules/Health/Components/Overview/ViewEditModal/Tabs/TabFiles/FileListElement.vue";
import SearchInput     from "@/components/Navigation/SearchInput.vue";
import Pagination      from "@/components/Ui/Pagination.vue";
import NoResultsText   from "@/components/Page/NoResultsText.vue";

import {ComponentData}       from "@/scripts/Vue/Types/Components/types";
import {FileListElementType} from "@/scripts/Core/Types/Modules/Health";

export default {
  data(): ComponentData {
    return {
      visibleResults: [],
      searchMatchingResults: [],
      searchValue: null,
      currentPage: 1,
      resultsPerPage: 5,
    }
  },
  props: {
    illness: {
      type: Object,
      required: true,
    },
    files: {
      type: Array,
      required: true
    },
  },
  components: {
    NoResultsText,
    Pagination,
    FileListElement,
    SearchInput
  },
  emits: [
    'removeFile',
    'appointmentChange'
  ],
  methods: {
    /**
     * @description validates all the file list elements
     */
    getListElementsState(): FileListElementType {
      let elementsData = [] as FileListElementType;
      for (let elementComponent of this.$refs.fileListElement) {
        elementsData.push({
          isValid: elementComponent.validateData(),
          appointmentId: elementComponent.appointmentId,
          fileId: elementComponent.fileId,
        });
      }

      return elementsData;
    },
    /**
     * @description will handle the event when page number changes on pagination
     */
    onPaginationPageNumberChange(nextPage: number): void {
      this.currentPage = nextPage;
      this.filterShownResults(nextPage);
    },
    /**
     * @description will filter the results shown on page
     */
    filterShownResults(currentPage: number): void {
      let visibleResults = [] as Array<unknown>;
      this.searchMatchingResults = [];

      let resultOffset = (currentPage-1) * this.resultsPerPage;
      let resultsCount = 0;

      for (let fileData of this.files) {
        resultsCount++;

        if (resultsCount <= resultOffset) {
          continue;
        }

        if (!this.matchesSearchValue(fileData)) {
          continue;
        }

        visibleResults.push(fileData);
        if (visibleResults.length >= this.resultsPerPage) {
          break;
        }
      }

      this.visibleResults = visibleResults;
    },
    /**
     * @description check if file matches the search value
     */
    matchesSearchValue(fileData: Record<string, string | number>): boolean {
      if (!this.searchValue) {
        return true;
      }

      if (String(fileData.fileNameWithExt).toLowerCase().includes(this.searchValue.toLowerCase())) {
        this.searchMatchingResults.push(fileData);
        return true;
      }

      return false;
    },
  },
  created(): void  {
    this.visibleResults = this.files;
    this.filterShownResults(1);
  },
  watch: {
    files: {
      deep: true,
      handler: function() {
        this.visibleResults = this.files;
        this.filterShownResults(1);
      }
    },
    searchValue(): void {
      this.filterShownResults(1);
    }
  }
}
</script>

<style lang="scss" scoped>
.files-list-wrapper {
  @apply overflow-auto w-full;
}
</style>
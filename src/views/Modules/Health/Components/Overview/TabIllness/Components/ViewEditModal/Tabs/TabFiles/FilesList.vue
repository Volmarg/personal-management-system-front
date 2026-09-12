<template>
  <div class="flex justify-end mb-4">
    <SearchInput v-model.trim="searchValue" />
  </div>

  <div v-if="usedResults.length !== 0">
    <div class="files-list-wrapper">
      <div v-for="fileData in usedResults"
           :key="fileData.fileNameWithExt"
           class="mt-2"
      >
        <!-- v-show is a must here, else can't get all appointments-files data on submit -->
        <FileListElement
            :file-id="fileData.id"
            :file-name-with-ext="fileData.fileNameWithExt"
            :file-path="fileData.path"
            :file-state="fileData.state"
            :illness-id="illness.id"
            :file-appointment-id="fileData.appointmentId"
            v-show="fileData.isVisible"
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
import FileListElement from "@/views/Modules/Health/Components/Overview/TabIllness/Components/ViewEditModal/Tabs/TabFiles/FileListElement.vue";
import SearchInput     from "@/components/Navigation/SearchInput.vue";
import Pagination      from "@/components/Ui/Pagination.vue";
import NoResultsText   from "@/components/Page/NoResultsText.vue";

import {ComponentData}       from "@/scripts/Vue/Types/Components/types";
import {FileListElementType} from "@/scripts/Core/Types/Modules/Health";

export default {
  data(): ComponentData {
    return {
      usedResults: [],
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
     * @description will filter the results shown on page.
     *              This is a special case:
     *              - cloning and modifying original data,
     *              - pagination results are v-show based (instead of v-if)
     */
    filterShownResults(currentPage: number): void {
      let usedResults = [] as Array<unknown>;
      let visibleResultsCount = 0;
      this.searchMatchingResults = [];

      let resultOffset = (currentPage-1) * this.resultsPerPage;
      let resultsCount = 0;

      for (let fileData of this.files) {
        resultsCount++;
        let isVisible = true;

        // clone is a must, else modyfing original data prop would trigger watcher
        let clonedData = {...fileData};
        if (resultsCount <= resultOffset) {
          isVisible = false;
        }

        if (!this.matchesSearchValue(fileData)) {
          isVisible = false;
        }

        if (visibleResultsCount >= this.resultsPerPage) {
          isVisible = false;
        }

        if (isVisible) {
          visibleResultsCount++;
        }

        clonedData.isVisible = isVisible;
        usedResults.push(clonedData);
      }

      this.usedResults = usedResults;
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
    this.usedResults = this.files;
    this.filterShownResults(1);
  },
  watch: {
    files: {
      deep: true,
      handler: function() {
        this.usedResults = this.files;
        this.filterShownResults(this.currentPage);
      }
    },
    searchValue(): void {
      this.currentPage = 1;
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
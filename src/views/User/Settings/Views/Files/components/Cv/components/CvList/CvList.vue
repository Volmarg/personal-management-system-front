<template>
  <div>
    <NoResultsText v-if="filesData.length === 0" />
    <SingleCvData v-for="fileData in visibleFiles"
                  :key="fileData.id"
                  :file-data="fileData"
                  @file-removed="$emit('fileRemoved')"
                  @file-updated="$emit('fileUpdated')"
    />

    <Pagination :number-of-results="filesData.length"
                :initial-count-of-result-per-page="config.pagination.resultPerPage"
                :initial-current-page="config.pagination.currentPage"
                @page-number-changes="onPaginationChange"/>

  </div>
</template>

<script lang="ts">
import UploadedFileDTO from "@/scripts/Dto/File/UploadedFileDTO";

import PaginationMixin from "@/scripts/Vue/Mixins/Ui/PaginationMixin.vue";

import NoResultsText   from "@/components/Page/NoResultsText.vue";
import Pagination      from "@/components/Ui/Pagination.vue";
import SingleCvData    from "@/views/User/Settings/Views/Files/components/Cv/components/SingleCvData/SingleCvData.vue";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      visibleFiles: [] as Array<UploadedFileDTO>,
      config: {
        pagination: {
          resultPerPage : 4,
          currentPage   : 1,
        }
      },
    }
  },
  props: {
    filesData: {
      type     : Array as () => Array<UploadedFileDTO>,
      required : true,
    }
  },
  components: {
    SingleCvData,
    Pagination,
    NoResultsText
  },
  emits: [
    'fileRemoved',
    'fileUpdated'
  ],
  mixins: [
    PaginationMixin
  ],
  methods: {
    /**
     * @description will handle the event when page number changes on pagination
     */
    onPaginationChange(currentPage: number, countOfResultsPerPage: number): void {
      this.config.pagination.currentPage = currentPage;
      this.visibleFiles                  = this.filterShownResultByPagination(currentPage, countOfResultsPerPage, this.filesData);
    }
  },
  created() {
    this.visibleFiles = this.filterShownResultByPagination(this.config.pagination.currentPage, this.config.pagination.resultPerPage, this.filesData);
  },
  watch: {
    filesData: {
      deep: true,
      handler() {

        this.visibleFiles = this.filterShownResultByPagination(this.config.pagination.currentPage, this.config.pagination.resultPerPage, this.filesData);
        if (0 === this.visibleFiles.length){
          this.config.pagination.currentPage--;
          this.visibleFiles = this.filterShownResultByPagination(this.config.pagination.currentPage, this.config.pagination.resultPerPage, this.filesData);
        }

      }
    }
  }
}
</script>
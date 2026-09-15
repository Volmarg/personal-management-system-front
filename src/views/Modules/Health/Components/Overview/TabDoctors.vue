<template>
  <div>
    <div class="flex justify-end mb-4">
      <SearchInput v-model.trim="searchValue" />
    </div>

    <div v-if="usedResults.length > 0"
         class="flex flex-wrap justify-center"
    >
      <DoctorCard v-for="doctor in usedResults"
                  :key="doctor.id"
                  :doctor="doctor"
      />
    </div>

    <div v-else>
      <NoResultsText />
    </div>

    <div>
      <Pagination :number-of-results="searchValue ? searchMatchingResults.length : doctors.length"
                  :initial-current-page="currentPage"
                  :initial-count-of-result-per-page="resultsPerPage"
                  @page-number-changes="onPaginationChange"
                  class="mt-2"
      />
    </div>
  </div>

  <teleport to="body">
    <FloatingRoundedPlus class="mb-10"
                         @click="isAddNewModalVisible = true"
                         v-tippy="$t('health.overview.tabs.doctors.sidebarNav.add.text')"
                         v-if="tabName === this.$parent.activeTabName"
    />

    <ViewEditModal :is-modal-visible="isAddNewModalVisible"
                   :modal-title="$t('health.overview.tabs.doctors.modal.createEdit.title.create')"
                   @modal-closed="isAddNewModalVisible = false"
                   class="relative z-20"
    />
  </teleport>
</template>

<script lang="ts">
import PaginationFilterConfigDTO from "@/scripts/Dto/Ui/PaginationResultFilterConfigDTO";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {DoctorStore} from "@/scripts/Vue/Store/Module/Health/DoctorStore";

import DoctorCard          from "@/views/Modules/Health/Components/Overview/TabDoctor/DoctorCard.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";
import FloatingRoundedPlus from "@/components/Ui/Floating/FloatingRoundedPlus.vue";
import ViewEditModal       from "@/views/Modules/Health/Components/Overview/TabDoctor/ViewEditModal.vue";
import SearchInput         from "@/components/Navigation/SearchInput.vue";
import Pagination          from "@/components/Ui/Pagination.vue";

import PaginationMixin from "@/scripts/Vue/Mixins/Ui/PaginationMixin.vue";

export default {
  data(): ComponentData {
    return {
      isAddNewModalVisible: false,
      store: null,
      doctors: [],
      currentPage: 1,
      resultsPerPage: 5,
      usedResults: [],
      searchMatchingResults: [],
      searchValue: '',
    }
  },
  props: {
    tabName: {
      type: String,
      required: true,
    }
  },
  components: {
    Pagination,
    SearchInput,
    FloatingRoundedPlus,
    ViewEditModal,
    NoResultsText,
    DoctorCard,
  },
  mixins: [
    PaginationMixin
  ],
  methods: {
    /**
     * @description will handle the event when page number changes on pagination
     */
    onPaginationChange(currentPage: number, countOfResultsPerPage: number): void {
      this.currentPage = currentPage;
      this.filterPagination(currentPage, countOfResultsPerPage)
    },
    /**
     * @description decides which results are matching the search query, matching results are visible, rest is hidden
     */
    paginationSearchFilterCallback(rowData: Record<string, unknown>): boolean {
      let normalisedSearchValue = this.searchValue.toLowerCase();
      if (!normalisedSearchValue) {
        return true;
      }

      let checkedProps = [
          'name',
          'address',
          'specialisation',
          'information',
      ];

      for (let prop of checkedProps) {
        if (String(rowData[prop]).toLowerCase().includes(normalisedSearchValue)) {
          this.searchMatchingResults.push(rowData);
          return true;
        }
      }

      return false;
    },
    /**
     * @description filters shown results on page
     */
    filterPagination(currentPage: number, countOfResultsPerPage: number): void {
      let dto = PaginationFilterConfigDTO.create(currentPage, countOfResultsPerPage, this.doctors)
      dto.resultMatchingCallback = this.paginationSearchFilterCallback;

      this.searchMatchingResults = [];
      this.usedResults = this.filterShownResultByPagination(dto);
    }
  },
  async beforeMount(): Promise<void> {
    this.store = DoctorStore();
    await this.store.getAll();
    this.doctors = this.store.allEntries;
    this.filterPagination(this.currentPage, this.resultsPerPage)
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.doctors = this.store.allEntries;
      }
    },
    searchValue(): void {
      this.currentPage = 1;
      this.filterPagination(this.currentPage, this.resultsPerPage)
    },
  }
}
</script>

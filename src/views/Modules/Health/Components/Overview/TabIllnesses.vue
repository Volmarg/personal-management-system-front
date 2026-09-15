<template>
  <div class="flex justify-end mb-4">
    <SearchInput v-model.trim="searchValue" />
  </div>

  <div v-if="usedResults.length > 0"
      class="flex flex-wrap w-full"
  >
      <Block v-for="illness in usedResults"
             :key="illness.id"
             :illness="illness"
             @files-saved="onFilesSave"
             ref="illnessBlock"
      />
  </div>

  <div v-else>
    <NoResultsText />
  </div>

  <div>
    <Pagination :number-of-results="searchValue ? searchMatchingResults.length : illnesses.length"
                :initial-current-page="currentPage"
                :initial-count-of-result-per-page="resultsPerPage"
                @page-number-changes="onPaginationChange"
                class="mt-2"
    />
  </div>

  <teleport to="body">
    <FloatingRoundedPlus class="mb-10"
                         @click="isAddNewModalVisible = true"
                         v-tippy="$t('health.overview.tabs.illnesses.sidebarNav.add.text')"
                         v-if="tabName === $parent.activeTabName"
    />

    <ViewEditModal :is-modal-visible="isAddNewModalVisible"
                   @modal-closed="onAddNewModalClose"
                   class="relative z-20"
    />
  </teleport>
</template>

<script lang="ts">

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Block               from "@/views/Modules/Health/Components/Overview/TabIllness/Block.vue";
import ViewEditModal       from "@/views/Modules/Health/Components/Overview/TabIllness/ViewEditModal.vue";
import SearchInput         from "@/components/Navigation/SearchInput.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";
import Pagination          from "@/components/Ui/Pagination.vue";
import FloatingRoundedPlus from "@/components/Ui/Floating/FloatingRoundedPlus.vue";

import {IllnessStore} from "@/scripts/Vue/Store/Module/Health/IllnessStore";

import BaseError                 from "@/scripts/Core/Error/BaseError";
import PromiseService            from "@/scripts/Core/Services/Promise/PromiseService";
import PaginationFilterConfigDTO from "@/scripts/Dto/Ui/PaginationResultFilterConfigDTO";

import PaginationMixin from "@/scripts/Vue/Mixins/Ui/PaginationMixin.vue";

export default {
  data(): ComponentData {
    return {
      store: null,
      illnesses: [],
      isAddNewModalVisible: false,
      currentPage: 1,
      resultsPerPage: 4,
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
    NoResultsText,
    SearchInput,
    FloatingRoundedPlus,
    ViewEditModal,
    Block
  },
  mixins: [
    PaginationMixin
  ],
  methods: {
    /**
     * @description wait for new block to be added and open its edit modal. The "create" modal has only the illness form
     *              while "edit" has files and other things. We want to be able to add more things to newly created issue.
     */
    onAddNewModalClose(data): void {
      this.isAddNewModalVisible = false
      if (!data.id) {
        throw new BaseError("Illness id is missing in the data object");
      }

      let findMatchingBlock= () => {
        return this.$refs.illnessBlock.find((block)=> block.illness.id === data.id);
      };

      this.$rootEvent.showFullPageLoader();
      PromiseService.buildPeriodicallyCheckedPromise(() => {
        return findMatchingBlock() !== undefined;
      }).then(() => {
        this.$rootEvent.hideFullPageLoader();
        let matchingBlock = findMatchingBlock();
        matchingBlock.openEditModal();
      })
    },
    /**
     * @description refreshes illnesses states when files gets saved
     */
    async onFilesSave(): Promise<void> {
      await this.store.getAll();
      this.illnesses = this.store.allEntries;
    },
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
      let dto = PaginationFilterConfigDTO.create(currentPage, countOfResultsPerPage, this.illnesses)
      dto.resultMatchingCallback = this.paginationSearchFilterCallback;

      this.searchMatchingResults = [];
      this.usedResults = this.filterShownResultByPagination(dto);
    }
  },
  async beforeMount(): Promise<void> {
    this.store = IllnessStore();
    await this.store.getAll();
    this.illnesses = this.store.allEntries;
    this.filterPagination(this.currentPage, this.resultsPerPage)
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.illnesses = this.store.allEntries;
        this.filterPagination(this.currentPage, this.resultsPerPage)
      }
    },
    searchValue(): void {
      this.currentPage = 1;
      this.filterPagination(this.currentPage, this.resultsPerPage)
    },
  }
}
</script>

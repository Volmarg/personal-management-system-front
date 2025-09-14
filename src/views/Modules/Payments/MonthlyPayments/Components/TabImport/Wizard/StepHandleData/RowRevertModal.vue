<template>
  <teleport to="body">
    <Modal :is-visible="isVisible"
            id="data-revert-modal"
            :title="$t('payments.monthly.tabs.import.step.processData.revertDataModal.header')"
            :is-confirm-visible="false"
            :cancel-text="$t('payments.monthly.tabs.import.step.processData.revertDataModal.button.close.label')"
            @modal-closed="$emit('close')"
            @confirm="$emit('confirm')"
    >
      <template #content>
        <p class="mb-4 text-center">{{ $t('payments.monthly.tabs.import.step.processData.revertDataModal.body') }}</p>

        <div class="flex justify-end mb-4">
          <SearchInput v-model="searchedString" />
        </div>

        <div class="flex flex-col gap-6"
             v-if="visibleEntries.length > 0"
        >
          <div class="w-full flex items-center justify-start bg-white dark:bg-gray-800 shadow border p-4 cursor-pointer hover:opacity-70"
               v-for="(data, index) in visibleEntries"
               :key="JSON.stringify(data)"
               @click="onRevertClick(index)"
          >
            <div class="flex-shrink"></div>
            <div class="flex-grow">{{ data }}</div>
          </div>

          <Pagination :number-of-results="filteredResults.length"
                      :initial-current-page="currentPage"
                      :initial-count-of-result-per-page="resultsPerPage"
                      @page-number-changes="paginateData"
          />
        </div>

        <div v-else
             class="text-center mt-4"
        >
          {{ $t('generic.noDataToDisplay') }}
        </div>

      </template>
    </Modal>
  </teleport>
</template>

<script lang="ts">

import Modal       from "@/components/Modal/Modal.vue";
import SearchInput from "@/components/Navigation/SearchInput.vue";
import Pagination  from "@/components/Ui/Pagination.vue";

import PaginationMixin from "@/scripts/Vue/Mixins/Ui/PaginationMixin.vue";

import {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {UploadWizardStore, UploadWizardStoreType} from "@/scripts/Vue/Store/Module/Payments/Monthly/UploadWizardStore";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      currentPage: 1,
      resultsPerPage: 3,
      visibleEntries: [],
      searchedString: null,
      wizardStore: null as null | UploadWizardStoreType,
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      required: false,
    }
  },
  mixins: [
    PaginationMixin,
  ],
  emits: [
    'confirm',
    'close',
  ],
  components: {
    Pagination,
    Modal,
    SearchInput
  },
  computed: {
    /**
     * @description results filtered by search string (checking every key of each entry for matching value),
     */
    filteredResults(): Array<Record<string, unknown>> {
      if (StringTypeProcessor.isEmptyString(this.searchedString)) {
        return this.wizardStore.deletedSpreadsheetRowsOriginalData;
      }

      let filtered = [] as Array<Record<string, unknown>>;
      for (let entry of this.wizardStore.deletedSpreadsheetRowsOriginalData) {
        for (let value of Object.values(entry)) {
          if (String(value).toLowerCase().includes(String(this.searchedString).toLowerCase())) {
            filtered.push(entry)
            break;
          }
        }
      }

      return filtered;
    },
  },
  methods: {
    /**
     * @description will revert the selected row / spreadsheet entry
     */
    onRevertClick(index: number): void {
      let realIndex = this.getPaginatedIndex(index, this.currentPage, this.resultsPerPage);

      let mappedValue = {...this.wizardStore.deletedMappedValues[realIndex]};
      let spreadsheetValue = {...this.wizardStore.deletedSpreadsheetRowsOriginalData[realIndex]};

      delete this.wizardStore.deletedMappedValues[realIndex];
      delete this.wizardStore.deletedSpreadsheetRowsOriginalData[realIndex];

      this.wizardStore.deletedMappedValues = this.wizardStore.deletedMappedValues.filter(Boolean);
      this.wizardStore.deletedSpreadsheetRowsOriginalData = this.wizardStore.deletedSpreadsheetRowsOriginalData.filter(Boolean);

      this.wizardStore.spreadsheetRowsOriginalData.push(spreadsheetValue);
      this.wizardStore.rowsMappedValues.push(mappedValue);
      this.wizardStore.rowsCurrentValues.push(mappedValue);

      this.paginateData(1, this.resultsPerPage);
      this.$rootEvent.showNotification(ToastTypeEnum.info, this.$t('payments.monthly.tabs.import.step.processData.revertDataModal.text.reverted'));
    },
    /**
     * @description will handle the event when page number changes on pagination
     */
    paginateData(currentPage: number, countOfResultsPerPage: number): void {
      this.currentPage    = currentPage;
      this.visibleEntries = this.filterShownResultByPagination(currentPage, countOfResultsPerPage, this.filteredResults);
    },
  },
  beforeMount():void {
    this.wizardStore = UploadWizardStore();
    this.filteredResults = this.wizardStore.deletedSpreadsheetRowsOriginalData;
    this.paginateData(1, this.resultsPerPage);
  },
  watch: {
    /**
     * @description will trigger pagination update when searched string changes
     */
    searchedString(): void {
      this.paginateData(1, this.resultsPerPage);
    },
    /**
     * @description paginate results when data is removed, also fixes empty modal when row gets deleted
     */
    'wizardStore.deletedMappedValues':{
      deep: true,
      handler: function(): void {
        this.paginateData(1, this.resultsPerPage);
      }
    }
  }
}
</script>
<template>
  <div class="flex justify-end mb-4">
    <SearchInput v-model.trim="searchValue" />
  </div>

  <div v-if="illness.appointments.length > 0">
    <div class="flex flex-wrap mt-10 justify-center">
      <SingleAppointment v-for="appointment in visibleResult"
                         :key="appointment.id"
                         :appointment="appointment"
                         @click="onAppointmentClick(appointment)"
      />
    </div>

    <teleport to="body">
      <AppointmentEditModal :is-modal-visible="isEditModalVisible"
                            :appointment="handledAppointment"
                            :illness="illness"
                            @modal-closed="isEditModalVisible = false"
                            @remove-click="isRemoveModalVisible = true"
                            class="relative z-21"
      />

      <AppointmentRemoveModal :is-modal-visible="isRemoveModalVisible"
                              :appointment="handledAppointment"
                              @modal-closed="isRemoveModalVisible = false"
                              @appointment-removed="this.isEditModalVisible = false"
                              class="relative z-22"
      />
    </teleport>

  </div>

  <div>
    <Pagination :number-of-results="searchValue ? searchMatchingResults.length : illness.appointments.length"
                :initial-current-page="currentPage"
                :initial-count-of-result-per-page="resultsPerPage"
                @page-number-changes="onPaginationChange"
                class="mt-2"
    />
  </div>

    <hr class="mt-10"/>

  <div>
    <div class="flex justify-center">
      <div class="mt-6 w-full flex flex-col xl:w-1/2">
        <AppointmentCreateEditForm :illness="illness"
                                   :header="$t('health.overview.tabs.subTabs.tabs.appointments.createEditForm.header.add')"
        />
      </div>
    </div>

  </div>

  <hr class="mt-10"/>

</template>

<script lang="ts">
import SingleAppointment         from "@/views/Modules/Health/Components/Overview/ViewEditModal/Tabs/TabAppointments/SingleAppointment.vue";
import AppointmentEditModal      from "@/views/Modules/Health/Components/Overview/ViewEditModal/Tabs/TabAppointments/AppointmentEditModal.vue";
import AppointmentRemoveModal    from "@/views/Modules/Health/Components/Overview/ViewEditModal/Tabs/TabAppointments/AppointmentRemoveModal.vue";
import AppointmentCreateEditForm from "@/views/Modules/Health/Components/Common/AppointmentCreateEditForm.vue";
import Pagination                from "@/components/Ui/Pagination.vue";
import SearchInput               from "@/components/Navigation/SearchInput.vue";

import PaginationMixin from "@/scripts/Vue/Mixins/Ui/PaginationMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import PaginationFilterConfigDTO from "@/scripts/Dto/Ui/PaginationResultFilterConfigDTO";

export default {
  data(): ComponentData {
    return {
      searchValue: '',
      visibleResult: [],
      searchMatchingResults: [],
      currentPage: 1,
      resultsPerPage: 3,
      isEditModalVisible: false,
      isRemoveModalVisible: false,
      handledAppointment: null,
    }
  },
  props: {
    illness: {
      type: Object,
      required: true,
    },
  },
  components: {
    SearchInput,
    Pagination,
    SingleAppointment,
    AppointmentEditModal,
    AppointmentRemoveModal,
    AppointmentCreateEditForm,
  },
  mixins: [
    PaginationMixin
  ],
  emits: [
    'appointmentEditClick'
  ],
  methods: {
    /**
     * @description marks handled appointment and opens the edit modal
     */
    onAppointmentClick(appointment: Record<string, string>): void {
      this.handledAppointment = appointment;
      this.isEditModalVisible = true;
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
      if (String(rowData.information).toLowerCase().includes(normalisedSearchValue)) {
        this.searchMatchingResults.push(rowData);
        return true;
      }

      if (rowData.doctor.name.toLowerCase().includes(normalisedSearchValue)) {
        this.searchMatchingResults.push(rowData);
        return true;
      }

      let isMatchingFile = false;
      rowData.storageFiles.forEach((fileData: Record<string, string|number>) => {
        let fileNameWithExt = fileData.fileNameWithExtension as string;
        let normalisedFileName = fileNameWithExt.toLowerCase().split(".").reverse().pop();
        if (normalisedFileName?.includes(normalisedSearchValue)) {
          isMatchingFile = true;
          return;
        }
      })

      if (isMatchingFile) {
        this.searchMatchingResults.push(rowData);
        return true;
      }

      return false;
    },
    /**
     * @description filters shown results on page
     */
    filterPagination(currentPage: number, countOfResultsPerPage: number): void {
      let dto = PaginationFilterConfigDTO.create(currentPage, countOfResultsPerPage, this.illness.appointments)
      dto.resultMatchingCallback = this.paginationSearchFilterCallback;

      this.searchMatchingResults = [];
      this.visibleResult = this.filterShownResultByPagination(dto);
    }
  },
  mounted(): void {
    this.filterPagination(this.currentPage, this.resultsPerPage)
  },
  watch: {
    'illness.appointments': {
      deep: true,
      handler: function(): void {
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
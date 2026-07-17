<template>
  <div>
    <Modal :is-visible="showModal"
           id="storage-file-picker"
           :title="$t('storage.picker.modal.header')"
           @modal-closed="closeModal"
    >
      <template #content>
        <div class="flex justify-center"
             v-if="showModal"
        >
          <div class="w-full flex flex-col">

            <SimpleTable :headers="table.headers"
                         :data="tableData"
                         :backend-max-results="totalResults"
                         :is-backend-pagination="true"
                         :results-per-page="perPage"
                         :is-row-hover-action-cursor="true"
                         :with-checkboxes="true"
                         :row-click-toggles-checkbox="true"
                         @before-page-change="onBeforePageChange"
                         @search-value-change="searchValue = $event"
                         ref="table"
            />

          </div>
        </div>

      </template>

      <template #footerRightSection>
        <MediumButtonWithIcon :text="$t('storage.picker.modal.buttons.confirm.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full md:w-auto"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              background-color-class="bg-blue-500"
                              @button-click="onConfirmClick"
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BaseError            from "@/scripts/Core/Error/BaseError";
import SymfonyStorageRoutes from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";
import PaginatedApiResponse from "@/scripts/Response/PaginatedApiResponse";
import PublicFolderService  from "@/scripts/Core/Services/PublicFolder/PublicFolderService";

import Modal         from "@/components/Modal/Modal.vue";
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import PickerPreview from "@/views/Modules/Storage/Common/Modal/ImagePicker/PickerPreview.vue";
import PickerTags    from "@/views/Modules/Storage/Common/Modal/ImagePicker/PickerTags.vue";

import ResponseHandlerMixin from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  data(): ComponentData {
    return {
      showModal: false,
      searchChangeTriggerTimeout: null,
      entries: [],
      totalResults: 0,
      currentPageNumber: 1,
      searchValue: '',
      perPage: 5,
      table: {
        headers: [
          {
            label: 'id',
            dataValuePath : 'id.value',
            dataIsComponentPath : 'id.isComponent',
            isVisible: false,
            dataComponentPropertiesPath: null
          },
          {
            label: 'path',
            dataValuePath : 'path.value',
            dataIsComponentPath : 'path.isComponent',
            isVisible: false,
            dataComponentPropertiesPath: null
          },
          {
            label: 'module',
            dataValuePath : 'module.value',
            dataIsComponentPath : 'module.isComponent',
            isVisible: false,
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('storage.picker.table.header.preview.label'),
            dataValuePath : 'preview.value',
            dataIsComponentPath : 'preview.isComponent',
            dataComponentPropertiesPath: 'preview.componentProps'
          },
          {
            label: this.$t('storage.picker.table.header.module.label'),
            dataValuePath : 'moduleLabel.value',
            dataIsComponentPath : 'moduleLabel.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('storage.picker.table.header.fileName.label'),
            dataValuePath : 'fileName.value',
            dataIsComponentPath : 'fileName.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('storage.picker.table.header.tags.label'),
            dataValuePath : 'tags.value',
            dataIsComponentPath : 'tags.isComponent',
            dataComponentPropertiesPath: "tags.componentProps"
          },
        ],
      }
    }
  },
  props: {
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    },
  },
  components: {
    MediumButtonWithIcon,
    SimpleTable,
    Modal
  },
  mixins: [
    ResponseHandlerMixin,
  ],
  emits: [
    "modalClosed",
    "onSelectionConfirm"
  ],
  computed: {
    /**
     * @description returns table data
     */
    tableData(): Array {
      let data = [];
      for (let entry of this.entries) {
        data.push({
          values: {
            id: {
              value: entry.id,
              isComponent: false,
            },
            path: {
              value: entry.path,
              isComponent: false,
            },
            module: {
              value: entry.module,
              isComponent: false,
            },
            fileName: {
              value: `${entry.name}.${entry.ext}`,
              isComponent: false,
            },
            moduleLabel: {
              value: this.$t(`storage.module.${entry.module}.label`),
              isComponent: false,
            },
            tags: {
              value: PickerTags,
              isComponent: true,
              componentProps : {
                tags: entry.tags,
              }
            },
            preview: {
              value: PickerPreview,
              isComponent: true,
              componentProps : {
                path: PublicFolderService.buildUrl(`${entry.dir}/${entry.name}.${entry.ext}`),
                extension: entry.ext,
                width: '50px'
              }
            },
          }
        })
      }

      return data;
    }
  },
  methods: {
    /**
     * @description collects checked rows data and emits an event with this data
     */
    onConfirmClick(): void {
      let entries = [];
      for (let checkedRowData of Object.values(this.$refs.table.checkedRowsData)) {
        let colId       = checkedRowData.find((colData: Record<string, unknown>) => colData.fieldName === 'id');
        let colFilePath = checkedRowData.find((colData: Record<string, unknown>) => colData.fieldName === 'path');
        let colModule   = checkedRowData.find((colData: Record<string, unknown>) => colData.fieldName === 'module');

        let formattedData = {
          id: colId?.value,
          filePath: colFilePath?.value,
          module: colModule?.value,
        };

        this.validateCheckedData(formattedData);

        entries.push(formattedData)
      }

      this.$emit('onSelectionConfirm', entries);
      this.closeModal();
    },
    /**
     * @description validates if the formatted/checked row data strutcure is valid
     */
    validateCheckedData(formattedData: Record<string, unknown>): void {
      if (!formattedData.id) {
        throw new BaseError("Formated data is missing an `id`. Got: " + formattedData.id );
      }

      if (!formattedData.filePath) {
        throw new BaseError("Formated data is missing a `filePath`. Got: " + formattedData.filePath);
      }

      if (!formattedData.module) {
        throw new BaseError("Formated data is missing a `module`. Got: " + formattedData.module);
      }
    },
    /**
     * @description re-fetches the page-offset data when table page change
     */
    onBeforePageChange(nextPage: number): void {
      this.fetchData(nextPage);
    },
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    closeModal(): void {
      this.entries = [];
      this.currentPageNumber = 1;
      this.totalResults = 0;

      this.$emit('modalClosed');
    },
    /**
     * @description fetches backend data for given page / criteria
     */
    async fetchData(pageNumber: number = 1): Promise<void> {
      this.$rootEvent.showFullPageLoader();

      let queryArgs = {
        pageNumber: pageNumber,
        perPage: this.perPage,
        query: this.searchValue,
      };

      let queryParams = new URLSearchParams(queryArgs).toString();
      let calledUrl = SymfonyStorageRoutes.buildUrl(SymfonyStorageRoutes.FILE_FILTER_URL) + `?${queryParams}`;

      this.$axios.get(calledUrl, PaginatedApiResponse).then((response: PaginatedApiResponse) => {
        this.$rootEvent.hideFullPageLoader();
        if (!this.handleResponse(response)) {
          return;
        }

        this.entries = response.data.allRecords;
        this.currentPageNumber = response.currentPageNumber;
        this.totalResults = response.totalResults;
      })
    }
  },
  mounted(): void {
    this.showModal = this.isModalVisible;
  },
  updated(): void {
    this.showModal = this.isModalVisible;
  },
  watch: {
    async isModalVisible(): Promise<void> {
      if (this.isModalVisible) {
        this.fetchData();
      }
    },
    /**
     * @description using timeout to prevent instant-refetch on query-value change (let the user type)
     */
    searchValue(): void {
      if (this.isModalVisible) {
        if (null !== this.searchChangeTriggerTimeout) {
          clearTimeout(this.searchChangeTriggerTimeout);
          this.searchChangeTriggerTimeout = null;
        }

        this.searchChangeTriggerTimeout = setTimeout(() => {
          this.fetchData();
        }, 500)
      }
    }
  }
}
</script>
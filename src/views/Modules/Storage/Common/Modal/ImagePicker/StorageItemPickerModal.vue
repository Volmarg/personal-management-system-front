<template>
  <div>
    <Modal :is-visible="showModal"
           id="storage-file-edit"
           :title="$t('storage.picker.modal.header')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>
        <div class="flex justify-center">
          <div class="w-full flex flex-col">

            <SimpleTable :headers="table.headers"
                         :data="tableData"
                         :backend-max-results="totalResults"
                         :is-backend-pagination="true"
                         :results-per-page="perPage"
                         @before-page-change="onBeforePageChange"
                         @search-value-change="searchValue = $event"
            />

          </div>
        </div>

      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyStorageRoutes from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";
import PaginatedApiResponse from "@/scripts/Response/PaginatedApiResponse";
import PublicFolderService  from "@/scripts/Core/Services/PublicFolder/PublicFolderService";

import Modal         from "@/components/Modal/Modal.vue";
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import PickerPreview from "@/views/Modules/Storage/Common/Modal/ImagePicker/PickerPreview.vue";
import PickerTags    from "@/views/Modules/Storage/Common/Modal/ImagePicker/PickerTags.vue";

import ResponseHandlerMixin from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";

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
            label: this.$t('storage.picker.table.header.preview.label'),
            dataValuePath : 'preview.value',
            dataIsComponentPath : 'preview.isComponent',
            dataComponentPropertiesPath: 'preview.componentProps'
          },
          {
            label: this.$t('storage.picker.table.header.module.label'),
            dataValuePath : 'module.value',
            dataIsComponentPath : 'module.isComponent',
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
    SimpleTable,
    Modal
  },
  mixins: [
    ResponseHandlerMixin,
  ],
  emits: [
    "modalClosed",
    "updateSuccess",
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
            fileName: {
              value: `${entry.name}.${entry.ext}`,
              isComponent: false,
            },
            module: {
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
     * @description re-fetches the page-offset data when table page change
     */
    onBeforePageChange(nextPage: number): void {
      this.fetchData(nextPage);
    },
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
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
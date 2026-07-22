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
                         :results-per-page="perPage"
                         :is-row-hover-action-cursor="true"
                         :with-checkboxes="true"
                         :row-click-toggles-checkbox="true"
                         :checked-rows-hashes="checkedRowsHashes"
                         :fields-for-row-hashing="['id']"
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
import PublicFolderService  from "@/scripts/Core/Services/PublicFolder/PublicFolderService";

import Modal         from "@/components/Modal/Modal.vue";
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import PickerPreview from "@/views/Modules/Storage/Common/Modal/ImagePicker/PickerPreview.vue";
import PickerTags    from "@/views/Modules/Storage/Common/Modal/ImagePicker/PickerTags.vue";

import RowAndCellDataMixin  from "@/components/Ui/Table/Mixin/RowAndCellDataMixin.vue";
import ResponseHandlerMixin from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  data(): ComponentData {
    return {
      showModal: false,
      searchChangeTriggerTimeout: null,
      entries: [],
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
    checkedFileIds: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    },
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
    RowAndCellDataMixin,
  ],
  emits: [
    "modalClosed",
    "onSelectionConfirm"
  ],
  computed: {
    /**
     * @description takes the checked/selected file ids and turns them into format usable for in-table checkboxes state tracking
     */
    checkedRowsHashes(): Array<string> {
      return this.checkedFileIds.map((id: number) => this.hashRowData([{
        id: id
      }]));
    },
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
      for (let rowHash of Object.keys(this.$refs.table.checkboxesRowsData)) {
        let checkedRowData = this.$refs.table.checkboxesRowsData[rowHash];
        let colId = checkedRowData.find((colData: Record<string, unknown>) => colData.fieldName === 'id');

        let formattedData = {
          id: colId?.value,
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
    },
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    closeModal(): void {
      this.entries = [];
      this.$emit('modalClosed');
    },
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
        this.entries = await this.$moduleCall.getAll(SymfonyStorageRoutes.FILE_BASE_URL);
      }
    },
  }
}
</script>
<template>
  <div class="modal-wrapper">
    <Modal :title="$t('generic.dialog.uploadDialog.header')"
           :id="id"
           :is-visible="isVisible"
           @modal-closed="onModalClose"
           :size="modalSize"
           :is-close-full-width="true"
    >
      <template #content>

        <Upload :configuration-id="upload.configurationId"
                :fetch-initial-config="false"
                :extra-data="upload.extraData"
                @upload-finished="onUploadFinish"
        />

        <div v-if="isFolderSelectVisible">
          <WarningBlock v-if="!form.selectedModule"
                        :text="$t('storage.picker.modal.subModal.upload.text.noModuleSelected')"
                        class="mt-4"
          />

          <WarningBlock v-if="form.selectedModule && !form.selectedPath"
                        :text="$t('storage.picker.modal.subModal.upload.text.noFolderSelected')"
                        class="mt-4"
          />

          <div class="mt-8 flex justify-center flex-row">
            <div class="mt-6 md:w-1/2 lg:w-1/3 w-full">
              <ModuleWithFoldersSelect @module-select-change="form.selectedModule = $event"
                                       @folder-select-change="form.selectedPath = $event"
                                       ref="moduleWithDirSelect"
                                       class="mb-4 s"
              />
            </div>
          </div>
        </div>

      </template>
    </Modal>
  </div>
</template>

<script lang="ts">

import Modal                   from "@/components/Modal/Modal.vue";
import Upload                  from "@/components/Ui/Upload/Component/Upload.vue";
import WarningBlock            from "@/components/Page/WarningBlock.vue";
import ModuleWithFoldersSelect from "@/views/Modules/Storage/Common/ModuleWithFoldersSelect.vue";

import ResponsiveVarsMixin      from "@/mixins/Responsive/ResponsiveVarsMixin.vue";
import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import BaseError        from "@/scripts/Core/Error/BaseError";
import UploadConfigEnum from "@/scripts/Core/Enum/Modules/Storage/UploadConfigEnum";

export default {
  data(): ComponentData {
    return {
      upload: {
        configurationId: null,
        extraData: {},
      },
      initialSmallSizeModal: 'medium',
      form: {
        selectedModule: null,
        selectedPath: null,
      }
    }
  },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    configurationId: {
      type     : String,
      required : false,
    },
    isVisible: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    isFolderSelectVisible: {
      type: Boolean,
      required: false,
      default: false,
    },
    extraData: {
      type: Object,
      required: false,
      default: function() {
        return {};
      },
    },
    refreshStorageState: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  emits: [
    'uploadFinished'
  ],
  components: {
    WarningBlock,
    ModuleWithFoldersSelect,
    Upload,
    Modal,
  },
  mixins: [
    ResponsiveVarsMixin,
    ResponsiveModalSizeMixin,
  ],
  methods: {
    /**
     * @description will fetch the storage structure after upload is done, not closing dialog on purpose, because
     *              it might turn out that some files upload will fail and user should be able to see which one.
     */
    onUploadFinish(): void {
      this.$emit('uploadFinished');
      if (this.refreshStorageState) {
        StorageState().getAll();
      }
    },
    onModalClose(): void {
      this.$emit('modalClosed')
      this.form.selectedModule = null;
      this.form.selectedPath = null;
    },
  },
  created(): void {
    if (!this.isFolderSelectVisible && !this.configurationId) {
      throw new BaseError("Either `configurationId` must be supplied or `isFolderSelectVisible=true` must be set");
    }

    if (!this.extraData.uploadDir && !this.isFolderSelectVisible) {
      throw new BaseError("Either `extraData.uploadDir` must be supplied or `isFolderSelectVisible=true` must be set");
    }

    this.upload.configurationId = this.configurationId;
    this.upload.extraData = this.extraData;
  },
  watch: {
    /**
     * @description set storage module upload configId whenever the selected module changes
     */
    'form.selectedModule'() {
      if (!this.form.selectedModule) {
        this.upload.configurationId = null;
        return;
      }

      this.upload.configurationId = UploadConfigEnum[this.form.selectedModule.toUpperCase()];
    },
    /**
     * @description set storage module upload dir whenever the selected dir changes
     */
    'form.selectedPath'() {
      if (!this.form.selectedPath) {
        this.upload.extraData = {};
        return;
      }

      this.upload.extraData.uploadDir = this.form.selectedPath;
    }
  }
}
</script>

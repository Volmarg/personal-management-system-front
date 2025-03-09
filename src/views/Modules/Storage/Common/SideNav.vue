<template>
  <TransferFiles class="mb-82"
                 :is-disabled="!isAnyFileSelected"
                 @click="isAnyFileSelected ? isMoveFilesModalVisible=true : null"
  />
  <RemoveFiles class="mb-74"
               :is-disabled="!isAnyFileSelected"
               @click="isAnyFileSelected ? isRemoveModalVisible=true : null"
  />

  <ToggleLock class="mb-48"/>

  <UploadFile class="mb-30"
              @click="isUploadModalVisible=true"
  />

  <AddFolder class="mb-20"
             @click="isAddFolderModalVisible=true"
  />

  <AddFolderModal :is-modal-visible="isAddFolderModalVisible"
                  @modal-closed="isAddFolderModalVisible=false"
  />

  <RemoveModal :is-modal-visible="isRemoveModalVisible"
               @modal-closed="isRemoveModalVisible=false"
  />

  <MoveFilesModal :is-modal-visible="isMoveFilesModalVisible"
                  @modal-closed="isMoveFilesModalVisible=false"
  />

  <UploadDialog :is-visible="isUploadModalVisible"
                :configuration-id="uploadConfigId"
                :extra-data="uploadExtraData"
                @modal-closed="isUploadModalVisible=false"
  />
</template>

<script lang="ts">
import MoveFilesModal from "@/views/Modules/Storage/Common/Modal/MoveFilesModal.vue";
import AddFolderModal from "@/views/Modules/Storage/Common/Modal/AddFolderModal.vue";
import RemoveModal    from "@/views/Modules/Storage/Common/Modal/RemoveModal.vue";
import UploadDialog   from "@/components/Ui/Upload/Dialog/UploadDialog.vue";

import ToggleLock    from "@/views/Modules/Storage/Common/SideNav/ToggleLock.vue";
import AddFolder     from "@/views/Modules/Storage/Common/SideNav/AddFolder.vue";
import UploadFile    from "@/views/Modules/Storage/Common/SideNav/UploadFile.vue";
import RemoveFiles   from "@/views/Modules/Storage/Common/SideNav/RemoveFiles.vue";
import TransferFiles from "@/views/Modules/Storage/Common/SideNav/TransferFiles.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

export default {
  data(): ComponentData {
    return {
      uploadConfigId: StorageState().uploadConfigId,
      isAddFolderModalVisible: false,
      isRemoveModalVisible: false,
      isUploadModalVisible: false,
      isMoveFilesModalVisible: false,
    }
  },
  components: {
    AddFolder,
    UploadFile,
    RemoveFiles,
    TransferFiles,
    AddFolderModal,
    RemoveModal,
    UploadDialog,
    MoveFilesModal,
    ToggleLock,
  },
  computed: {
    /**
     * @description check if any file is selected
     */
    isAnyFileSelected(): boolean {
      return StorageState().selectedFilesData.length != 0;
    },
    /**
     * @description extra data provided for upload, forwarded further to backend on upload
     */
    uploadExtraData(): Record {
      return {
        uploadDir: this.$route.query.dir
      }
    }
  }
}
</script>
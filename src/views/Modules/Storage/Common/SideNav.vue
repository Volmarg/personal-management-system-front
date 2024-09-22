<template>
  <TransferFiles class="mb-76"
                 :is-disabled="!isAnyFileSelected"
                 @click="isAnyFileSelected ? isMoveFilesModalVisible=true : null"
  />
  <RemoveFiles class="mb-60"
               :is-disabled="!isAnyFileSelected"
               @click="isAnyFileSelected ? isRemoveModalVisible=true : null"
  />

  <UploadFile class="mb-30"
              @click="isUploadModalVisible=true"
  />

  <AddFolder class="mb-20"
             @click="isAddFolderModalVisible=true"
  />

  <Settings class="mb-6"
            @click="isSettingsModalVisible=true"
  />

  <AddFolderModal :is-modal-visible="isAddFolderModalVisible"
                  @modal-closed="isAddFolderModalVisible=false"
  />

  <RemoveModal :is-modal-visible="isRemoveModalVisible"
               @modal-closed="isRemoveModalVisible=false"
  />

  <SettingsModal :is-modal-visible="isSettingsModalVisible"
                 @modal-closed="isSettingsModalVisible=false"
  />

  <MoveFilesModal :is-modal-visible="isMoveFilesModalVisible"
                  @modal-closed="isMoveFilesModalVisible=false"
  />

  <UploadDialog :is-visible="isUploadModalVisible"
                :configuration-id="123"
                @modal-closed="isUploadModalVisible=false"
  />
</template>

<script lang="ts">
import MoveFilesModal from "@/views/Modules/Storage/Common/Modal/MoveFilesModal.vue";
import AddFolderModal from "@/views/Modules/Storage/Common/Modal/AddFolderModal.vue";
import RemoveModal    from "@/views/Modules/Storage/Common/Modal/RemoveModal.vue";
import SettingsModal  from "@/views/Modules/Storage/Common/Modal/SettingsModal.vue";
import UploadDialog   from "@/components/Ui/Upload/Dialog/UploadDialog.vue";

import AddFolder     from "@/views/Modules/Storage/Common/SideNav/AddFolder.vue";
import UploadFile    from "@/views/Modules/Storage/Common/SideNav/UploadFile.vue";
import Settings      from "@/views/Modules/Storage/Common/SideNav/Settings.vue";
import RemoveFiles   from "@/views/Modules/Storage/Common/SideNav/RemoveFiles.vue";
import TransferFiles from "@/views/Modules/Storage/Common/SideNav/TransferFiles.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {storageModuleState} from "@/scripts/Vue/Store/StorageModuleState";

export default {
  data(): ComponentData {
    return {
      isAddFolderModalVisible: false,
      isRemoveModalVisible: false,
      isSettingsModalVisible: false,
      isUploadModalVisible: false,
      isMoveFilesModalVisible: false,
    }
  },
  components: {
    AddFolder,
    UploadFile,
    Settings,
    RemoveFiles,
    TransferFiles,
    AddFolderModal,
    RemoveModal,
    SettingsModal,
    UploadDialog,
    MoveFilesModal,
  },
  computed: {
    /**
     * @description check if any file is selected
     */
    isAnyFileSelected(): boolean {
      return storageModuleState().selectedFilesData.length != 0;
    }
  }
}
</script>
<template>
  <FolderBase :dirs-structure="dirsStructure"
              :route-name="routeName"
              folder-content-classes="pl-6 pr-6 pt-6"
  >
    <template #singleFile="{fileData, dirNodeData}">
      <SingleFile :file-data="fileData"
                  :dir-node-data="dirNodeData"
      />
    </template>
  </FolderBase>
</template>

<script lang="ts">
import FolderHandlerMixin from "@/views/Modules/Storage/Mixin/FolderHandlerMixin.vue";

import FolderBase from "@/views/Modules/Storage/Common/FolderBase.vue";
import SingleFile from "@/views/Modules/Storage/Files/SingleFile.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StorageState, StorageTypeEnum} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import VueRouterStorage  from "@/router/Modules/VueRouterStorage";

export default {
  data(): ComponentData {
    return {
      routeName: VueRouterStorage.ROUTE_NAME_STORAGE_FILES_FOLDER,
    }
  },
  mixins: [
    FolderHandlerMixin
  ],
  components: {
    FolderBase,
    SingleFile
  },
  async beforeMount(): Promise<void> {
    StorageState().uploadConfigId = '645dsf789shkdczs23431245jk687sd123';
    await this.getDirsStructure(StorageTypeEnum[StorageTypeEnum.files]);
  },
}
</script>
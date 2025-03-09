<template>
  <FolderBase :dirs-structure="dirsStructure"
              :route-name="routeName"
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
import SingleFile from "@/views/Modules/Storage/Video/SingleFile.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";
import {StorageState, StorageTypeEnum} from "@/scripts/Vue/Store/Module/Storage/StorageState";

export default {
  data(): ComponentData {
    return {
      routeName: VueRouterStorage.ROUTE_NAME_STORAGE_VIDEO_FOLDER,
    }
  },
  mixins: [
    FolderHandlerMixin
  ],
  components: {
    SingleFile,
    FolderBase
  },
  async beforeMount(): Promise<void> {
    StorageState().uploadConfigId = '312s456d7gewse123rg7gh456g1s';
    await this.getDirsStructure(StorageTypeEnum[StorageTypeEnum.videos]);
  }
}
</script>
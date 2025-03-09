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
import SingleFile from "@/views/Modules/Storage/Images/SingleFile.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StorageState, StorageTypeEnum} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

export default {
  data(): ComponentData {
    return {
      routeName: VueRouterStorage.ROUTE_NAME_STORAGE_IMAGES_FOLDER,
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
    StorageState().uploadConfigId = '12ds23hs8sh7s4645678f4sadg456789as1';
    await this.getDirsStructure(StorageTypeEnum[StorageTypeEnum.images]);
  }
}
</script>
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

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

export default {
  data(): ComponentData {
    return {
      routeName: VueRouterStorage.ROUTE_NAME_STORAGE_IMAGES_FOLDER,
      dirsStructure: [],
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
    this.dirsStructure = await this.getDirsStructure('images');
  }
}
</script>
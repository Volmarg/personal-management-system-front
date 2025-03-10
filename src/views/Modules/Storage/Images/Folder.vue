<template>
  <FolderBase :dirs-structure="dirsStructure"
              :route-name="routeName"
  >
    <template #containerBeginning>
      <Lightbox :images="lightboxImages"
                :force-is-visible="isLightboxVisible"
                :active-image-index="lightboxActiveIndex"
                @hide="isLightboxVisible = false"
      />
    </template>
    <template #singleFile="{fileData, dirNodeData}">
      <SingleFile :file-data="fileData"
                  :dir-node-data="dirNodeData"
                  @image-click="onImageClick"
      />
    </template>
  </FolderBase>
</template>

<script lang="ts">
import FolderHandlerMixin from "@/views/Modules/Storage/Mixin/FolderHandlerMixin.vue";

import Lightbox   from "@/components/Ui/Lightbox/Lightbox.vue";
import FolderBase from "@/views/Modules/Storage/Common/FolderBase.vue";
import SingleFile from "@/views/Modules/Storage/Images/SingleFile.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StorageState, StorageTypeEnum} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

import PublicFolderService from "@/scripts/Core/Services/PublicFolder/PublicFolderService";

export default {
  data(): ComponentData {
    return {
      store: null as StorageState,
      lightboxActiveIndex: 0,
      isLightboxVisible: false,
      routeName: VueRouterStorage.ROUTE_NAME_STORAGE_IMAGES_FOLDER,
    }
  },
  mixins: [
    FolderHandlerMixin
  ],
  components: {
    Lightbox,
    SingleFile,
    FolderBase
  },
  computed: {
    /**
     * @description images paths for the lightbox
     */
    lightboxImages(): Array {
      if (!this.store.activeNodeData.files) {
        return [];
      }

      return this.store.activeNodeData.files.map(file => {
            let filePath = `${this.store.activeNodeData.path}/` + file.name + (file.ext ? `.${file.ext}` : '');
            return PublicFolderService.buildUrl(filePath)
        }
      )
    }
  },
  methods: {
    /**
     * @description will open lightbox with currently clicked image
     */
    onImageClick(data: Record): void {
      this.lightboxActiveIndex = this.lightboxImages.indexOf(data.fileUrl);
      this.isLightboxVisible = true
    },
  },
  async beforeMount(): Promise<void> {
    this.store = StorageState();
    this.store.uploadConfigId = '12ds23hs8sh7s4645678f4sadg456789as1';
    await this.getDirsStructure(StorageTypeEnum[StorageTypeEnum.images]);
  }
}
</script>
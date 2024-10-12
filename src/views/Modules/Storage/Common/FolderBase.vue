<template>
  <div class="flex justify-start flex-row flex-wrap  -mt-5 mb-5 ">
    <span class="text-lg text-left font-bold ml-2">
      > {{ $route.params.dirname }}
    </span>
    <span class="self-end text-tiny ml-2 mb-0.5">
       ({{$route.params.path}})
    </span>
  </div>

  <Container extra-classes="folder-container">
    <div class="flex flex-row h-full">
      <FoldersTree :dirs-structure="dirsStructure"
                   :route-name="routeName"
                   ref="foldersTree"
      />
      <FolderContent :folder-content-classes="folderContentClasses">
        <template #singleFile="{fileData}">
          <slot name="singleFile"
                :file-data="fileData"
          ></slot>
        </template>
      </FolderContent>
    </div>
  </Container>

  <SideNav />

</template>

<script lang="ts">

import SideNav       from "@/views/Modules/Storage/Common/SideNav.vue";
import FoldersTree   from "@/views/Modules/Storage/Common/FoldersTree.vue";
import FolderContent from "@/views/Modules/Storage/Common/FolderContent.vue";
import Container     from "@/components/Ui/Containers/Container.vue";
import {storageModuleState} from "@/scripts/Vue/Store/StorageModuleState";

export default {
  props: {
    dirsStructure: {
      type: Array,
      required: true
    },
    folderContentClasses: {
      type: String,
      required: false,
      default: 'p-6'
    },
    routeName: {
      type: String,
      required: true,
    }
  },
  components: {
    Container,
    FoldersTree,
    FolderContent,
    SideNav,
  },
  beforeMount() {
    storageModuleState().clearSelectedFiles();
  },
  updated(): void {
    storageModuleState().clearSelectedFiles();
  }
}
</script>

<style lang="scss" scoped>
.folder-container {
  min-height: 300px;
  @apply p-0 pr-4
}
</style>
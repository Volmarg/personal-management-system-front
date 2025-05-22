<template>
  <div class="flex justify-start flex-row flex-wrap  -mt-5 mb-5 ">
    <span class="text-lg text-left font-bold ml-2">
      >
      <fa v-if="activeNodeData.isLocked"
          icon="lock"
          class="text-red-500"
      />

      <fa v-else
          icon="lock-open"
          class="text-green-500"
      />

      {{ dirName }}
    </span>
    <span class="self-end text-tiny ml-2 mb-0.5">
       ({{$route.query.dir}})
    </span>
  </div>

  <div class="flex justify-end mb-4">
    <SearchInput v-model="searchValue" />
  </div>

  <Container extra-classes="folder-container">
    <slot name="containerBeginning"></slot>

    <div class="flex flex-row h-full">
      <FoldersTree :dirs-structure="dirsStructure"
                   :route-name="routeName"
                   ref="foldersTree"
      />
      <FolderContent :folder-content-classes="folderContentClasses"
                     :search-value="searchValue"
                     @visible-files-change="$emit('visibleFilesChange', $event)"
      >
        <template #description="{dirNodeData}">
          <p class="dir-description"
             v-html="dirNodeData.description"
          >
          </p>
        </template>
        <template #singleFile="{fileData, dirNodeData}">
          <slot name="singleFile"
                :file-data="fileData"
                :dir-node-data="dirNodeData"
          ></slot>
        </template>
      </FolderContent>
    </div>
  </Container>

  <SideNav />

</template>

<script lang="ts">
import ModuleBaseDataMixin from "@/mixins/Modules/ModuleBaseDataMixin.vue";

import SideNav       from "@/views/Modules/Storage/Common/SideNav.vue";
import FoldersTree   from "@/views/Modules/Storage/Common/FoldersTree.vue";
import FolderContent from "@/views/Modules/Storage/Common/FolderContent.vue";
import Container     from "@/components/Ui/Containers/Container.vue";
import SearchInput   from "@/components/Navigation/SearchInput.vue";

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      searchValue: '',
    }
  },
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
  mixins: [
    ModuleBaseDataMixin,
  ],
  emits: [
    "visibleFilesChange"
  ],
  components: {
    Container,
    FoldersTree,
    FolderContent,
    SideNav,
    SearchInput,
  },
  computed: {
    /**
     * @description get currently open dir name
     */
    dirName(): string {
      return this.$route.query.dir.split("/").reverse()[0] ?? '';
    },
    /**
     * @description returns current active node data
     */
    activeNodeData(): string {
      return StorageState().activeNodeData;
    }
  },
  methods: {
    /**
     * @description the goal of this handler is to somehow solve the problem of clicking on the storage "View"
     *              and not having any directory open (main one should be opened). That's because up to that point
     *              the directories structure is not known.
     *
     *              When user lands on the page, checking if there is any active folder in tree, if not then it's
     *              safe assumption that user visited non-existing directory, so he gets redirected on root node.
     *
     *              That not only solves the mentioned problem, but also is kinda feature since it will redirect
     *              user to root dir if he visits non-existing folder (by typing path in url etc.).
     */
    redirectToRootDir(): void {
      // next tick is needed because we wait for dom to load, only then can detect if there is any node active
      this.$nextTick(() => {
        if (this.dirsStructure.length === 0) {
          return;
        }

        let rootDir = this.dirsStructure[0].path;
        let path = null;
        for (let match of this.$route.matched) {
          if (match.name === this.$route.name) {
            path = match.path
          }
        }

        let url = this.buildStorageUrl(rootDir, path);
        if (!document.querySelector('.active-folder-tree-node')){
          this.$router.push(url);
        }
      })
    }
  },
  beforeMount() {
    StorageState().clearSelectedFiles();
  },
  updated(): void {
    StorageState().clearSelectedFiles();
    this.redirectToRootDir();
  },
  watch: {
    dirsStructure: {
      deep: true,
      handler: function() {
        this.redirectToRootDir();
      }
    },
    /**
     * @description that's desired, else it's confusing that opened folder is empty
     */
    '$route.query.dir'(): void {
      this.searchValue = '';
    }
  }
}
</script>

<style lang="scss">
.folder-container {
  min-height: 300px;
  @apply p-0 pr-4
}

.dir-description {
  @import 'src/assets/scss/libs/tinymce/content-outside-editor';
  min-height: 20px;
  @apply mb-2 mt-4 mx-6
}
</style>
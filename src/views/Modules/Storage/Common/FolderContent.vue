<template>
  <div class="w-full">
    <div v-if="visibleFiles.length > 0">
      <slot name="description"
            :dir-node-data="nodeData"
      ></slot>
    </div>

    <div v-if="visibleFiles.length > 0"
         class="flex flex-row flex-wrap"
    >
      <div v-for="file in visibleFiles"
                  :key="JSON.stringify(file)"
                  :class="folderContentClasses"
      >
        <slot name="singleFile"
              :file-data="file"
              :dir-node-data="nodeData"
        ></slot>
      </div>
    </div>

    <div class="flex justify-center flex-col w-full p-5 align-self-center h-full"
         v-else
    >
      <NoResultsText />
    </div>
  </div>
</template>

<script lang="ts">

import NoResultsText from "@/components/Page/NoResultsText.vue";

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  props: {
    folderContentClasses: {
      type: String,
      required: false,
    },
    searchValue: {
      type: String,
      required: true,
    }
  },
  components: {
    NoResultsText,
  },
  emits: [
    'visibleFilesChange'
  ],
  computed: {
    /**
     * @description returns files in the folder, depending on the provided search criteria
     */
    visibleFiles(): Array {
      let filteredFiles = [];
      if (!this.nodeData?.files) {
        return [];
      }

      if (StringTypeProcessor.isEmptyString(this.searchValue)) {
        this.$emit('visibleFilesChange', this.nodeData.files);
        return this.nodeData.files;
      }

      for (let file of this.nodeData.files) {
        let fileWithExt = file.name + (file.ext ? `.${file.ext}` : '');
        if (fileWithExt.includes(this.searchValue)) {
          filteredFiles.push(file);
        }
      }

      this.$emit('visibleFilesChange', filteredFiles);
      return filteredFiles;
    },
    /**
     * @description gets the data of currently active node
     */
    nodeData(): Record {
      return StorageState().activeNodeData;
    }
  }
}
</script>
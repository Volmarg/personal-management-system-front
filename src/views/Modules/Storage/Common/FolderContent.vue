<template>
  <div v-if="nodeData.files && nodeData.files.length > 0"
       class="flex flex-row flex-wrap"
  >
    <div v-for="file in nodeData.files"
                :key="JSON.stringify(file)"
                :class="folderContentClasses"
    >
      <slot name="singleFile"
            :file-data="file"
            :dir-node-data="nodeData"
      ></slot>
    </div>
  </div>

  <div class="flex justify-center flex-col w-full p-5"
       v-else
  >
    <NoResultsText />
  </div>
</template>

<script lang="ts">

import NoResultsText from "@/components/Page/NoResultsText.vue";

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

export default {
  props: {
    folderContentClasses: {
      type: String,
      required: false,
    }
  },
  components: {
    NoResultsText,
  },
  computed: {
    /**
     * @description gets the data of currently active node
     */
    nodeData(): Record {
      return StorageState().activeNodeData;
    }
  }
}
</script>
<template>
  <div v-if="nodeData.files && nodeData.files.length > 0"
       class="flex flex-row"
  >
    <SingleFile v-for="file in nodeData.files"
                :key="JSON.stringify(file)"
                class="p-4"
                :file-data="file"
    />
  </div>

  <div class="flex justify-center flex-col w-full p-5"
       v-else
  >
    <NoResultsText />
  </div>
</template>

<script lang="ts">

import SingleFile           from "@/views/Modules/Storage/Files/SingleFile.vue";
import NoResultsText        from "@/components/Page/NoResultsText.vue";
import {storageModuleState} from "@/scripts/Vue/Store/StorageModuleState";
export default {
  components: {
    NoResultsText,
    SingleFile
  },
  computed: {
    /**
     * @description gets the data of currently active node
     */
    nodeData(): Record {
      return storageModuleState().activeNodeData;
    }
  }
}
</script>
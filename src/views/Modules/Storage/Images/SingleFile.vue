<template>
  <FileBase :file-data="fileData"
            :dir-node-data="dirNodeData"
            :select-on-file-representation-click="false"
            :use-img-width-for-text-width="true"
            :module-name="moduleName"
            class="single-file"
  >
    <template #fileRepresentation>
      <img :src="fileUrl"
           class="single-file"
           @click='$emit("imageClick", {fileUrl: fileUrl})'
      />
    </template>
  </FileBase>
</template>

<script lang="ts">
import FileBase from "@/views/Modules/Storage/Common/FileBase.vue";

import FileHandlerMixin from "@/views/Modules/Storage/Mixin/FileHandlerMixin.vue";

import {StorageTypeEnum} from "@/scripts/Vue/Store/Module/Storage/StorageState";

export default {
  components: {
    FileBase
  },
  props: {
    fileData: {
      type: Object,
      required: true,
    },
    dirNodeData: {
      type: Object,
      required: true,
    },
  },
  mixins: [
    FileHandlerMixin,
  ],
  emits: [
    'imageClick'
  ],
  computed: {
    /**
     * @description returns storage module name
     */
    moduleName() {
      return StorageTypeEnum[StorageTypeEnum.images];
    }
  },
}
</script>

<style lang="scss" scoped>
.single-file {
  img {
    max-height: 150px;
    min-width: 100px;
  }

  @apply cursor-pointer flex flex-col
}

</style>

<style lang="scss">
.selected .file-icon {
  --fill: rgb(59, 130, 246) !important;
}

.file-name-wrapper-images {
  max-width: none !important;

  @apply w-auto
}

</style>
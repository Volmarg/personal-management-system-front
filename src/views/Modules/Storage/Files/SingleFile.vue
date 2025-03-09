<template>
  <FileBase :file-data="fileData"
            :dir-node-data="dirNodeData"
            :module-name="moduleName"
            class="single-file"
  >
    <template #fileRepresentation>
      <la svg-icon-name="file-alt"
          class="file-icon"
          font-size="80"
          color="rgb(107 114 128)"
      />
    </template>
  </FileBase>
</template>

<script lang="ts">
import FileBase from "@/views/Modules/Storage/Common/FileBase.vue";

import FileHandlerMixin  from "@/views/Modules/Storage/Mixin/FileHandlerMixin.vue";
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
    FileHandlerMixin
  ],
  computed: {
    /**
     * @description returns storage module name
     */
    moduleName() {
      return StorageTypeEnum[StorageTypeEnum.files];
    }
  },
}
</script>

<style lang="scss" scoped>
.single-file {
  $height: 180px;
  min-height: $height;
  max-height: $height;
}
</style>

<style lang="scss">
.single-file {
  @apply cursor-pointer flex flex-col
}

.selected .file-icon {
  --fill: rgb(59, 130, 246) !important;
}

.file-name-wrapper-files {
  max-width: 100px;
}

</style>
<template>
  <FileBase :file-data="fileData"
            :dir-node-data="dirNodeData"
            :use-img-width-for-text-width="true"
            module-name="images"
            class="single-file"
  >
    <template #fileRepresentation>
      <img :src="fileUrl"
           class="single-file"
      />
    </template>
  </FileBase>
</template>

<script lang="ts">
import FileBase from "@/views/Modules/Storage/Common/FileBase.vue";

import FileHandlerMixin from "@/views/Modules/Storage/Mixin/FileHandlerMixin.vue";

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
  ]
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
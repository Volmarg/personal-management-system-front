<template>
  <img :src="path"
       v-if="isImage"
       class="image"
  />

  <la svg-icon-name="file-alt"
      font-size="45"
      v-else
  />
</template>

<script lang="ts">
import FileService from "@/scripts/Core/Services/File/FileService";

export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    extension: {
      type: String,
      required: true,
    },
  },
  computed: {
    isImage(): boolean {
      return FileService.isImageExtension(this.extension);
    }
  }
}
</script>
<style lang="scss" scoped>
  .image {
    width: 150px;
  }
</style>
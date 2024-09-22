<template>
  <FileBase :file-data="fileData"
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
export default {
  components: {
    FileBase
  },
  props: {
    fileData: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.single-file {
  $height: 210px;
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

.file-representation {
  @apply hover:opacity-70
}

</style>
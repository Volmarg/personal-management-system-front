<template>
  <div class="dirs-wrapper">
    <TreeNode :nodes="dirsStructure"
              :storage-route-name="routeName"
    />
  </div>
</template>

<script lang="ts">
import TreeNode from "@/views/Modules/Storage/Common/TreeNode.vue";

export default {
  props: {
    dirsStructure: {
      type: Array,
      required: true
    },
    routeName: {
      type: Array,
      required: true
    }
  },
  components: {
    TreeNode
  }
}
</script>

<style lang="scss" scoped>
.dirs-wrapper {
  $width: 250px;
  min-height: 300px;
  width: $width;
  min-width: $width;
  @apply bg-gray-100 text-left pl-2 pt-2
}
</style>
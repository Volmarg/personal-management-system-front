<template>
  <div class="dirs-wrapper">
    <TreeNode :nodes="dirsStructure"
              :storage-route-name="routeName"
    />
  </div>
</template>

<script lang="ts">
import TreeNode from "@/views/Modules/Storage/Common/TreeNode.vue";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

export default {
  computed: {
    routeName(): string {
      return VueRouterStorage.ROUTE_NAME_STORAGE_FILES_FOLDER;
    }
  },
  props: {
    dirsStructure: {
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
  min-height: 300px;
  width: 250px;
  @apply bg-gray-100 h-full text-left pl-2 pt-2
}
</style>
<template>
  <ul class="node-level">
    <li v-for="node of nodes"
        :key="JSON.stringify(node)"
        class="node-child"
    >
      {{setActiveNodeData(node)}}
      <router-link :to="{to: storageRouteName, query: {dir: node.path}}">
        <span class="node-child-data"
              :class="{
                'locked-node-child-data': node.isLocked
              }"
        >
          <fa icon="folder-open"
              class="folder-icon"
              :class="{
                'active-folder-tree-node': isNodeActive(node),
                'locked-node': node.isLocked
              }"
              v-if="isNodeActive(node)"
          />

          <fa icon="folder"
              class="folder-icon"
              v-else
          />
        <span class="dir-name">{{ node.dirname }}</span>
        </span>
      </router-link>

      <TreeNode v-if="node.children.length > 0"
                :nodes="node.children"
                :storage-route-name="storageRouteName"
      />
    </li>
  </ul>
</template>

<script lang="ts">

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

export default {
  props: {
    storageRouteName: {
      type: String,
      required: true,
    },
    nodes: {
      type: Object,
      required: true
    }
  },
  methods: {
    /**
     * @description is current tree node active
     */
    isNodeActive(node: Record): boolean {
      return this.$route.query.dir == node.path;
    },
    /**
     * @description set data of active node into storage
     */
    setActiveNodeData(node: Record): void {
      if (!this.isNodeActive(node)) {
        return;
      }

      StorageState().activeNodeData = node;
    }
  },
}
</script>

<style lang="scss" scoped>
.node-level {
  @apply ml-2
}

.node-child {
  @apply mt-1
}

.folder-icon {
  font-size: 18px;
}

.dir-name {
  @apply text-gray-700
}

.node-child-data {
  @apply hover:opacity-50 cursor-pointer
}

.active-folder-tree-node:not(.locked-node) + .dir-name {
  @apply text-blue-500
}

.locked-node-child-data * {
  @apply text-red-500
}
</style>
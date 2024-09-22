<template>
  <ul class="node-level">
    <li v-for="node of nodes"
        :key="JSON.stringify(node)"
        class="node-child"
    >
      {{setActiveNodeData(node)}}
      <router-link :to="{to: storageRouteName, params: {path: node.path, dirname: node.dirname}}">
        <span class="node-child-data">
          <fa icon="folder-open"
              class="folder-icon"
              :class="{
                'active-folder-tree-node': isNodeActive(node)
              }"
              v-if="isNodeActive(node)"
          />

          <fa icon="folder"
              class="folder-icon"
              v-else
          />
        {{ node.dirname }}
        </span>
      </router-link>

      <TreeNode v-if="node.children.length > 1"
                :nodes="node.children"
                :storage-route-name="storageRouteName"
      />
    </li>
  </ul>
</template>

<script lang="ts">

import {storageModuleState} from "@/scripts/Vue/Store/StorageModuleState";

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
      return this.$route.params.path == node.path;
    },
    /**
     * @description set data of active node into storage
     */
    setActiveNodeData(node: Record): void {
      if (!this.isNodeActive(node)) {
        return;
      }

      storageModuleState().activeNodeData = node;
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
  @apply text-blue-500
}

.node-child-data {
  @apply hover:opacity-50 cursor-pointer
}
</style>
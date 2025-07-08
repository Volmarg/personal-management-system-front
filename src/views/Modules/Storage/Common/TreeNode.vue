<template>
  <ul
      class="node-level duration-400"
      :class="{
        'root-node': isRootNode,
        'h-0-force overflow-hidden': !isRootNode && !isOpen
      }"
      ref="nodeLevel"
  >
    <li v-for="node of nodes"
        :key="JSON.stringify(node)"
        class="node-child"
    >
      {{setActiveNodeData(node)}}
      <span class="open-close-toggle"
            :class="{
              'node-open': isRootNode || storage?.isTreeNodeOpen(node.path),
              'node-collapsed': !isRootNode && !storage?.isTreeNodeOpen(node.path),
            }"
            @click="toggleNode($event.target)"
            ref="openCloseToggle"
            :data-node-path="node.path"
            v-if="node.children.length !== 0 && !isRootNode"
      />

      <span class="empty-toggle-node"
            v-else-if="!isRootNode"
      />
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
                :is-open="isRootNode || storage?.isTreeNodeOpen(node.path)"
                ref="treeNode"
                @node-collapse="$emit('nodeCollapse')"
                @node-open="$emit('nodeOpen')"
      />
    </li>
  </ul>
</template>

<script lang="ts">

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      storage: null as StorageState,
    }
  },
  props: {
    storageRouteName: {
      type: String,
      required: true,
    },
    nodes: {
      type: Object,
      required: true
    },
    isRootNode: {
      type: Boolean,
      required: false,
      default: false,
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: [
    'nodeCollapse',
    'nodeOpen',
  ],
  methods: {
    /**
     * @description will toggle all the nodes in this node.
     * > WARNING < This method is used in {FoldersTree.vue::toggleAll}, sadly JSdoc has no way to document, and TS hinting won't work in this case
     */
    toggleAll(open: boolean | undefined): void {
      let togglers = Array.isArray(this.$refs.openCloseToggle) ? this.$refs.openCloseToggle : [this.$refs.openCloseToggle];
      for (let toggler of togglers) {
        if (open) {
          this.openNode(toggler);
          continue;
        }

        this.closeNode(toggler)
      }
    },
    /**
     * @description toggle between open/close state of current node
     */
    toggleNode(toggler: HTMLElement | undefined): void {
      let elementUl = this.getTogglerParentList(toggler);
      if (!elementUl) {
        return;
      }

      elementUl.classList.toggle("h-0-force");
      elementUl.classList.toggle("overflow-hidden");
      toggler.classList.toggle('node-open');
      toggler.classList.toggle('node-collapsed');

      let nodePath = toggler?.getAttribute('data-node-path');
      if (elementUl.classList.contains("h-0-force")) {
        this.$emit('nodeCollapse');
        this.storage.removeOpenTreeNode(nodePath);
      } else {
        this.$emit('nodeOpen');
        this.storage.addOpenTreeNode(nodePath);
      }
    },
    /**
     * @description close current node
     */
    closeNode(toggler: HTMLElement | undefined): void {
      let elementUl = this.getTogglerParentList(toggler);
      if (!elementUl) {
        return;
      }

      elementUl.classList.add("h-0-force");
      elementUl.classList.add("overflow-hidden");
      toggler.classList.add('node-collapsed');
      toggler.classList.remove('node-open');

      let nodePath = toggler?.getAttribute('data-node-path');
      this.storage.removeOpenTreeNode(nodePath);
    },
    /**
     * @description open current node
     */
    openNode(toggler: HTMLElement | undefined): void {
      let elementUl = this.getTogglerParentList(toggler);
      if (!elementUl) {
        return;
      }

      elementUl.classList.remove("h-0-force");
      elementUl.classList.remove("overflow-hidden");
      toggler.classList.remove('node-collapsed');
      toggler.classList.add('node-open');

      let nodePath = toggler?.getAttribute('data-node-path');
      this.storage.addOpenTreeNode(nodePath);
    },
    /**
     * @description takes the toggler element, and looks for the closes UL parent
     * @returns {HTMLElement | undefined}
     */
    getTogglerParentList(toggler: HTMLElement | undefined): HTMLElement | undefined {
      // this can happen if DOM is updated
      if (!toggler) {
        return undefined;
      }

      return toggler.closest('li').querySelector(":scope ul");
    },
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

      this.storage.activeNodeData = node;
    }
  },
  beforeMount(): void {
    this.storage = StorageState();
  },
}
</script>

<style lang="scss" scoped>
.open-close-toggle {
  @apply mr-2
}

.node-level {
  @apply ml-2 transition-all
}

.node-level:not(.root-node) .node-level {
  @apply ml-7
}

.node-level:not(.root-node) {
  @apply border-l-2 border-dashed pl-1.5 border-gray-400
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

.node-open {
  &::after {
    content:  "－";
  }
}

.node-collapsed {
  &::after {
    content:  "＋";
  }
}

.node-open, .node-collapsed {
  &::after {
    @apply font-bold;
  }

  @apply cursor-pointer hover:opacity-50;
}

// this is added to keep the same spacing that's present when open / close buttons are attached
.empty-toggle-node {
  &::after {
    content: "\00a0\00a0\00a0\00a0\00a0\00a0";
  }
}

</style>
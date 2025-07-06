<template>
  <div class="dirs-wrapper">
    <p
        @click="toggleAllClick"
        class="cursor-pointer select-none hover:opacity-50"
    >
      {{ $t(trans.toggleAll.currentState) }}
    </p>

    <TreeNode :nodes="dirsStructure"
              :storage-route-name="routeName"
              :is-root-node="true"
              @node-collapse="onNodeToggle"
              @node-open="onNodeToggle"
              ref="treeNode"
    />
  </div>
</template>

<script lang="ts">
import TreeNode from "@/views/Modules/Storage/Common/TreeNode.vue";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      trans: {
        toggleAll:{
          currentState: 'storage.page.module.dirTree.toggleOpenClose.open',
          close: 'storage.page.module.dirTree.toggleOpenClose.close',
          open: 'storage.page.module.dirTree.toggleOpenClose.open',
        },
      }
    }
  },
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
  },
  methods: {
    /**
     * @description handles node toggle - decides the toggle-all text
     */
    onNodeToggle(): void {
      let isAnyNodeCollapsed = !!document.querySelector('.node-collapsed');
      this.trans.toggleAll.currentState = isAnyNodeCollapsed ? this.trans.toggleAll.open : this.trans.toggleAll.close;
    },
    /**
     * @description handle clicking on toggle-all (close / open all nodes)
     */
    toggleAllClick(): void {
      let isAnyNodeCollapsed = !!document.querySelector('.node-collapsed');

      this.trans.toggleAll.currentState = isAnyNodeCollapsed ? this.trans.toggleAll.close : this.trans.toggleAll.open;

      this.toggleAll(isAnyNodeCollapsed);
    },
    /**
     * @description will search recursively for all the tree nodes
     */
    findTreeNodeRefs(ref, refs: Array = []): Array {

      refs.push(ref);
      if (ref.$refs?.treeNode) {
        let refNodes = Array.isArray(ref.$refs.treeNode) ? ref.$refs.treeNode : [ref.$refs.treeNode];
        for (let refNode of refNodes) {
          refs = this.findTreeNodeRefs(refNode, refs);
        }
      }

      return refs;
    },
    /**
     * @description close / open all the dir nodes
     */
    toggleAll(open: boolean): void {
      let treeNodeRefs = this.findTreeNodeRefs(this.$refs.treeNode);
      for (let treeNodeRef of treeNodeRefs) {
        // > WARNING < this is {TreeNode.vue::toggleAll}, sadly JSdoc has no way to document, and TS hinting won't work in this case
        treeNodeRef.toggleAll(open);
      }
    },
  },
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
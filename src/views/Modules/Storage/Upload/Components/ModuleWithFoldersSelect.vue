<template>
  <div class="flex flex-wrap flex-col">
    <div class="w-full self-center">
      <MultiSelect
          :label="$t('storage.modulePathsSelect.label.modules')"
          selected-label-source="selectedLabel"
          :options="moduleOptions"
          @change="onModuleOptionChanged"
          @select="onModuleOptionChanged"
          @deselect="onModuleOptionChanged"
          @clear="onModuleOptionChanged"
          @paste="onModuleOptionChanged"
          v-model="selectedModule"
          mode="single"
          :allow-show-options-list="true"
          :allow-create-options="false"
          :can-clear="false"
          :required="true"
          class="module-with-folder-select"
          ref="moduleSelect"
      />

      <MultiSelect
          :label="$t('storage.modulePathsSelect.label.folderName')"
          selected-label-source="selectedLabel"
          :options="folderPathOptions"
          @change="onFolderOptionChanged"
          @select="onFolderOptionChanged"
          @deselect="onFolderOptionChanged"
          @clear="onFolderOptionChanged"
          @paste="onFolderOptionChanged"
          v-model="selectedFolderPath"
          mode="single"
          :allow-show-options-list="true"
          :allow-create-options="false"
          :can-clear="false"
          :required="true"
          class="mt-4 module-with-folder-select"
          ref="folderSelect"
      />
    </div>
  </div>
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      // parent - child paths must be proper else the result will be invalid
      allModulesWithPaths: {
        'video': [{
          dirname: "Main folder - video",
          path: "/data",
          children: [
            {
              dirname: "folder 1",
              path: "/data/folder 1",
              children: [
                {
                  dirname: "A",
                  path: "/data/folder 1/A",
                  children: []
                },
                {
                  dirname: "B",
                  path: "/data/folder 1/B",
                  children: []
                },
                {
                  dirname: "c",
                  path: "/data/folder 1/c",
                  children: []
                }
              ]
            },
            {
              dirname: "Folder 2",
              path: "/data/Folder 2",
              children: [
                {
                  dirname: "X",
                  path: "/data/Folder 2/X",
                  children: []
                },
                {
                  dirname: "Y",
                  path: "/data/Folder 2/Y",
                  children: []
                },
                {
                  dirname: "Z",
                  path: "/data/Folder 2/Z",
                  children: [
                    {
                      dirname: "Z1",
                      path: "/data/Folder 2/Z/Z1",
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }],
        'files': [{
          dirname: "Main folder - Files",
          path: "/data",
          children: [
            {
              dirname: "FILES 1",
              path: "/data/FILES 1",
              children: [
                {
                  dirname: "A",
                  path: "/data/FILES 1/A",
                  children: []
                },
                {
                  dirname: "B",
                  path: "/data/FILES 1/B",
                  children: []
                },
                {
                  dirname: "c",
                  path: "/data/FILES 1/c",
                  children: []
                }
              ]
            },
            {
              dirname: "Folder 2",
              path: "/data/Folder 2",
              children: [
                {
                  dirname: "X",
                  path: "/data/Folder 2/X",
                  children: []
                },
                {
                  dirname: "Y",
                  path: "/data/Folder 2/Y",
                  children: []
                },
                {
                  dirname: "Z",
                  path: "/data/Folder 2/Z",
                  children: [
                    {
                      dirname: "Z1",
                      path: "/data/Folder 2/Z/Z1",
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }],
        'images': [{
          dirname: "Main folder - Images",
          path: "/data",
          children: [
            {
              dirname: "IMAGES 1",
              path: "/data/IMAGES 1",
              children: [
                {
                  dirname: "A",
                  path: "/data/IMAGES 1/A",
                  children: []
                },
                {
                  dirname: "B",
                  path: "/data/IMAGES 1/B",
                  children: []
                },
                {
                  dirname: "c",
                  path: "/data/IMAGES 1/c",
                  children: []
                }
              ]
            },
            {
              dirname: "Folder 2",
              path: "/data/Folder 2",
              children: [
                {
                  dirname: "X",
                  path: "/data/Folder 2/X",
                  children: []
                },
                {
                  dirname: "Y",
                  path: "/data/Folder 2/Y",
                  children: []
                },
                {
                  dirname: "Z",
                  path: "/data/Folder 2/Z",
                  children: [
                    {
                      dirname: "Z1",
                      path: "/data/Folder 2/Z/Z1",
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }]
      },
      folderPathOptions: [],
      categories: [],
      selectedModule: null,
      selectedFolderPath: null,
    }
  },
  emits: [
    "moduleSelectChange",
    "folderSelectChange",
  ],
  components: {
    MultiSelect
  },
  computed: {
    moduleOptions(): Array<Record> {
      let supportedModules = ['files', 'video', 'images'];
      let options = [];

      for (let module of supportedModules) {
        options.push({
          label: this.$t(`navbar.rightSidebar.menu.${module}.label`),
          selectedLabel: this.$t(`navbar.rightSidebar.menu.${module}.label`),
          value: module,
        });
      }

      return options;
    }
  },
  methods: {
    /**
     * @description returns the nesting level of the folder
     */
    getFolderLevel(checkedFullPath: string, nodeData: Record, checkedPathPart: string | null = '', level: null | number = null): number {
      if (level === null) {
        level = 1; // because root has always hardcoded 0
      }

      if (!checkedPathPart && nodeData.path === checkedFullPath) {
        return level;
      }

      let pathParts = checkedFullPath.split("/");
      pathParts     = pathParts.filter(Boolean); // first element might be empty

      checkedPathPart += `/${pathParts[level - 1]}`;

      if (checkedPathPart === checkedFullPath) {
        return level;
      }

      if (nodeData.path === checkedFullPath) {
        return level;
      }

      if (nodeData.path === checkedPathPart) {
        level++;
        return this.getFolderLevel(checkedFullPath, nodeData, checkedPathPart, level);
      }

      for (let child of nodeData.children) {
        if (child.path === checkedFullPath) {
          return level;
        }

        if (child.path === checkedPathPart) {
          level++;
          return this.getFolderLevel(checkedFullPath, child, checkedPathPart, level);
        }
      }

      throw new Error(`Could not find node with matching path: ${checkedFullPath}`);
    },
    /**
     * @description Walks over all the parent nodes and builds the select options.
     *              It works the way that options have proper indentations so that the
     *              parent-child nesting hierarchy is properly represented.
     */
    traverseTree(): void {
      if (!this.selectedModule) {
        return;
      }

      let dirsStructure = this.allModulesWithPaths[this.selectedModule];

      for (let mainNode of dirsStructure) {
        this.addOption(mainNode, 0)
        this.traverseNode(mainNode);
      }
    },
    /**
     * @description takes the root dir, and walks over the children (if there are any)
     *              until all the nodes are traversed. Each time adds children to the select options.
     */
    traverseNode(node: Record): void {
      if (!node.children) {
        return;
      }

      for (let child of node.children) {
        // prevent dupes - something wrong with recursion, but whatever, this removes dupes
        if (!this.folderPathOptions.find(option => option.value == child.path)) {
          let rootLevelNode = this.allModulesWithPaths[this.selectedModule][0];
          let level = this.getFolderLevel(child.path, rootLevelNode);
          this.addOption(child, level)
        }

        this.traverseNode(child);
      }
    },
    /**
     * @description adds option show in the folder paths select
     */
    addOption(node: Record, level: number): void {
      this.folderPathOptions.push({
        /**
         * @description this isn't a spacebar, because it gets trimmed, nbsp is not as well
         * @link https://www.compart.com/en/unicode/U+3164
         */
        label: "ㅤ".repeat(level) + node.dirname,
        selectedLabel: node.dirname,
        value: node.path,
      })
    },
    /**
     * @description will save + emit the selected country when country selection option changes
     */
    onModuleOptionChanged(value: number): void {
      this.selectedModule = value;
      this.$emit('moduleSelectChange', value);
    },
    /**
     * @description will save + emit the selected country when country selection option changes
     */
    onFolderOptionChanged(value: number): void {
      this.selectedFolderPath = value;
      this.$emit('folderSelectChange', value);
    }
  },
  mounted(): void {
    this.value = this.selected;
  },
  created(): void {
    this.traverseTree();
  },
  watch: {
    selectedModule(): void {
      this.$refs.folderSelect.clear();
      this.$nextTick(() => {
        this.folderPathOptions = [];
        this.$emit('folderSelectChange', this.selectedFolderPath);
        this.traverseTree();
      })
    }
  }
}
</script>
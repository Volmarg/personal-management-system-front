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
          v-if="isVisible"
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
          v-if="isVisible"
      />
    </div>
  </div>
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {
  StorageTypeEnum,
  StorageState,
  storageTypeToModuleName
} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import UserController   from "@/scripts/Core/Controller/UserController";
import UserModuleRights from "@/scripts/Core/Security/Rights/UserModuleRights";
import BaseError        from "@/scripts/Core/Error/BaseError";

export default {
  data(): ComponentData {
    return {
      folderPathOptions: [],
      categories: [],
      selectedModule: null,
      selectedFolderPath: null,
      isVisible: true,
      storage: null,
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
      let options = [];
      for (let storageType of Object.keys(StorageTypeEnum).filter((val) => isNaN(val))) {
        let moduleName = storageTypeToModuleName(storageType);
        let requiredRight = UserModuleRights.MODULE_ACCESS_RIGHTS[moduleName] ?? null;
        if (!requiredRight) {
          throw new BaseError(`No right was defined for module ${moduleName}`);
        }

        if (!(new UserController()).isModuleAccessGranted(requiredRight)) {
          continue;
        }

        options.push({
          label: this.$t(`navbar.rightSidebar.menu.${storageType}.label`),
          selectedLabel: this.$t(`navbar.rightSidebar.menu.${storageType}.label`),
          value: storageType,
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

      /**
       * Originally the code was prepared to work with root path being just one dir, but first storage logic was done,
       * afterward existing logic was reused, and now root path is actually 2 dirs separated with slash.
       * This logic here compensates for the problem, basically first split path will be the same as delivered root dir.
       */
      let splitPath = checkedFullPath.split("/");
      let pathParts = [`${splitPath[0]}/${splitPath[1]}`];
      for (let index in splitPath) {
        if (0 == index || 1 == index) {
          continue;
        }

        pathParts.push(splitPath[index]);
      }

      pathParts = pathParts.filter(Boolean); // first element might be empty

      // this is needed because root dir does not contain leading slash, while sub-dir must be glued with slash to parent dir
      checkedPathPart += (level != 1 ? "/" : "") + `${pathParts[level - 1]}`;

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

      let dirsStructure = this.storage.allEntries[this.selectedModule];

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
          let rootLevelNode = this.storage.allEntries[this.selectedModule][0];
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
    },
    /**
     * @description reloads the state of the module tree pickers
     */
    reload(): void {
      this.isVisible = false;
      this.selectedModule = null;
      this.selectedFolderPath = null;
      this.$nextTick(async () => {
        await this.storage.getAll();
        this.traverseTree();
        this.isVisible = true;
      })
    }
  },
  mounted(): void {
    this.value = this.selected;
  },
  async created(): Promise<void> {
    this.storage = StorageState();
    this.storage.moduleName = null;
    await this.storage.getAll();
    this.traverseTree();
  },
  watch: {
    /**
     * @description this is needed else component gets glitchy if there are multiple instances of it - only one of them would be updated.
     */
    'storage.allEntries': {
      deep: true,
      handler: function (): void {
        this.selectedModule = null;
        this.selectedFolderPath = null;
        this.$nextTick(async () => {
          this.traverseTree();
        })
      }
    },
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
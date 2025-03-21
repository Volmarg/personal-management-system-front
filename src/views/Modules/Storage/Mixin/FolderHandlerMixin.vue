<script lang="ts">
  import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
  import {StoreDefinition} from "pinia";
  import {StorageState}    from "@/scripts/Vue/Store/Module/Storage/StorageState";

  import SymfonyStorageRoutes from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";

  import ResponseHandlerMixin from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";

  export default {
    data(): ComponentData {
      return {
        store: null as StoreDefinition | StorageState,
        dirsStructure: [],
      }
    },
    mixins: [
      ResponseHandlerMixin,
    ],
    methods: {
      /**
       * @description will fetch and set the dirs structure
       */
      async getDirsStructure(moduleName: string): Promise<Array> {
        this.store.moduleName = moduleName;
        await this.store.getAll();
        this.dirsStructure = this.store.allEntries;
      },
      /**
       * @description adds new dir inside parent dir
       */
      async addFolder(parentDir: string, newDirName: string): Promise<boolean> {
        let data = {
          parentDir: parentDir,
          newDirName: newDirName,
        };

        let url = SymfonyStorageRoutes.buildUrl(SymfonyStorageRoutes.FOLDER_CREATE_URL);
        return this.$axios.post(url, data).then((response) => {
          return this.handleResponse(response);
        })
      },
      /**
       * @description renames existing folder
       */
      async renameFolder(currDirPath: string, newDirName: string): Promise<boolean> {
        let data = {
          currDirPath: currDirPath,
          newDirName: newDirName,
        };

        let url = SymfonyStorageRoutes.buildUrl(SymfonyStorageRoutes.FOLDER_RENAME_URL);
        return this.$axios.post(url, data).then((response) => {
          return this.handleResponse(response);
        })
      },
      /**
       * @description will move dir or copy its content copy dir between storages structure
       */
      async moveOrCopyDir(currDirPath: string, newDirPath: string, move: boolean, targetModuleName: string): Promise<boolean> {
        let data = {
          currDirPath: currDirPath,
          newDirParentPath: newDirPath,
          move: move,
          targetModuleName: targetModuleName,
        };

        let url = SymfonyStorageRoutes.buildUrl(SymfonyStorageRoutes.FOLDER_MOVE_OR_COPY_URL);
        return this.$axios.post(url, data).then((response) => {
          return this.handleResponse(response);
        })
      }
    },
    beforeMount() {
      this.store = StorageState();
    },
    watch: {
      'store.allEntries': {
        deep: true,
        handler: function () {
          this.dirsStructure = this.store.allEntries;
        }
      }
    }
  }
</script>
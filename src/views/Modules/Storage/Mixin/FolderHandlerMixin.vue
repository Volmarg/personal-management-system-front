<script lang="ts">
  import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
  import {StoreDefinition} from "pinia";
  import {StorageState}    from "@/scripts/Vue/Store/Module/Storage/StorageState";

  export default {
    data(): ComponentData {
      return {
        store: null as StoreDefinition | StorageState,
        dirsStructure: [],
      }
    },
    methods: {
      /**
       * @description will fetch and set the dirs structure
       */
      async getDirsStructure(moduleName: string): Promise<Array> {
        this.store = StorageState();
        this.store.moduleName = moduleName;
        await this.store.getAll();
        this.dirsStructure = this.store.allEntries;
      }
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
<script lang="ts">
  import SymfonyStorageRoutes from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";

  export default {
    methods: {
      /**
       * @description returns the given storage folder structure
       *
       * @param moduleName
       */
      async getDirsStructure(moduleName: string): Promise<Array> {
        return this.$moduleCall.getAll(SymfonyStorageRoutes.FOLDER_BASE_URL, moduleName);
      }
    }
  }
</script>
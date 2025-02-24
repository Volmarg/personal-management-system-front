<script lang="ts">
  import PublicFolderService from "@/scripts/Core/Services/PublicFolder/PublicFolderService";

  export default {
    computed: {
      /**
       * @description creates the file url (needed for GET calls - be it img/video or just download link)
       */
      fileUrl(): string {
        return PublicFolderService.buildUrl(`${this.dirNodeData.path}/${this.fileData.name}.${this.fileData.ext}`);
      }
    }
  }
</script>
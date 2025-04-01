<script lang="ts">
import PublicFolderService from "@/scripts/Core/Services/PublicFolder/PublicFolderService";

export default {
  methods: {
    /**
     * @description takes the file path, and returns the public path url for GET call behind auth
     */
    getFilePublicPath(filePath: string): string {
      return PublicFolderService.buildUrl(filePath);
    }
  }
}
</script>
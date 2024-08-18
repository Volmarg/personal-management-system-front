<script lang="ts">
import SymfonySystemRoutes                from "@/router/SymfonyRoutes/SymfonySystemRoutes";
import SymfonyRoutes                      from "@/router/SymfonyRoutes";
import GetPublicFolderAccessTokenResponse from "@/scripts/Response/System/AccessToken/GetPublicFolderAccessTokenResponse";

export default {
  methods: {
    /**
     * @description will return special jwt token used explicitly for accessing public folder data
     */
    async getPublicFolderAccessToken(): Promise<string> {

      let calledRoute = SymfonyRoutes.buildUrl(SymfonySystemRoutes.GET_PUBLIC_FOLDER_ACCESS_TOKEN);
      return await this.$axios.get(calledRoute, GetPublicFolderAccessTokenResponse).then((response: GetPublicFolderAccessTokenResponse) => {
        return response.publicFolderAccessToken;
      });

    }
  }
}
</script>

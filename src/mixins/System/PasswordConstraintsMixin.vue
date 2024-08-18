<script lang="ts">
import SymfonySystemRoutes            from "@/router/SymfonyRoutes/SymfonySystemRoutes";
import SymfonyRoutes                  from "@/router/SymfonyRoutes";
import GetPasswordConstraintsResponse from "@/scripts/Response/System/Security/GetPasswordConstraintsResponse";

export default {
  methods: {
    /**
     * @description will return response (from backend) which contains password constraints
     */
    async getPasswordConstraintsResponse(): Promise<GetPasswordConstraintsResponse> {

      let calledRoute = SymfonyRoutes.buildUrl(SymfonySystemRoutes.GET_PASSWORD_CONSTRAINTS);
      return await this.$axios.getWithCsrf(calledRoute, GetPasswordConstraintsResponse).then((response: GetPasswordConstraintsResponse) => {
        return response;
      });

    }
  }
}
</script>

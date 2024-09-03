<script lang="ts">
import VueRouter from "@/router/VueRouter";

export default {
  methods: {
    /**
     * @description will check if current path opened in browser us equal to that on the menu element
     * @note the slash in front is needed due to usage of {@see VueRouter.ROUTE_PATH_NONE}, else
     *       menu won't work properly with such paths, not that it will be used often but it just has to be working
     */
    isCurrentlyVisitedPath(currentPath: string): boolean {
      let prefix = (VueRouter.ROUTE_PATH_NONE === currentPath ? "/" : "");
      return this.$route.fullPath.trim() === prefix + currentPath.trim();
    }
  }
}
</script>
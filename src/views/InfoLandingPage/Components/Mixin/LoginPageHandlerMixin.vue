<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import VueRouter       from "@/router/VueRouter";
import UserController  from "@/scripts/Core/Controller/UserController";
import EnvReader       from "@/scripts/Core/System/EnvReader";

export default {
  data(): ComponentData {
    return {
      userController: new UserController(),
    }
  },
  methods: {
    /**
     * @description the point is that navigating between some pages breaks their layout,
     *              this helps to avoid the issue. This pretty much like happens because the
     *              info page styles are loaded without scoped content because otherwise
     *              these cause lot of layout breaking.
     *
     *              Could be solved by properly splitting the source css file but don't want to
     *              spend time on it.
     */
    async goToLoginHandler(): Promise<void> {
      // that's needed cuz maintenance won't turn the spinner off (it's just not implemented there - would collide with other views)
      if (!EnvReader.isMaintenance()) {
        this.$rootEvent.showFullPageLoader();
      }

      if (this.userController.isUserLoggedIn()) {
        await this.$router.push({path: VueRouter.ROUTE_PATH_HOME})
      } else {
        await this.$router.push({path: VueRouter.ROUTE_PATH_LOGIN})
      }

      this.$router.go(0)
    }
  },
}
</script>
import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

export default class VueRouterAchievements {

    static readonly ROUTE_PREFIX = "/achievements"
    static readonly ROUTE_GROUP = "achievements"

    static readonly ROUTE_NAME_ACHIEVEMENTS_LIST  = VueRouterAchievements.ROUTE_GROUP + "List";
    static readonly ROUTE_PATH_ACHIEVEMENTS_LIST  = VueRouterAchievements.ROUTE_PREFIX + "/list";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterAchievements.ROUTE_PATH_ACHIEVEMENTS_LIST,
            name: VueRouterAchievements.ROUTE_NAME_ACHIEVEMENTS_LIST,
            component: (): Promise<Component> => import("@/views/Modules/Achievements/List.vue"),
        },
    ]

}
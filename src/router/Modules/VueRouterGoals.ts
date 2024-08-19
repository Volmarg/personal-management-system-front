import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

export default class VueRouterGoals {

    static readonly ROUTE_PREFIX = "/goals"
    static readonly ROUTE_GROUP = "goals"

    static readonly ROUTE_NAME_GOALS_LIST  = VueRouterGoals.ROUTE_GROUP + "List";
    static readonly ROUTE_PATH_GOALS_LIST  = VueRouterGoals.ROUTE_PREFIX + "/list";

    static readonly ROUTE_NAME_GOALS_PAYMENTS  = VueRouterGoals.ROUTE_GROUP + "Payments";
    static readonly ROUTE_PATH_GOALS_PAYMENTS  = VueRouterGoals.ROUTE_PREFIX + "/payments";

    static readonly ROUTE_NAME_GOALS_SETTINGS  = VueRouterGoals.ROUTE_GROUP + "Settings";
    static readonly ROUTE_PATH_GOALS_SETTINGS  = VueRouterGoals.ROUTE_PREFIX + "/settings";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterGoals.ROUTE_PATH_GOALS_LIST,
            name: VueRouterGoals.ROUTE_NAME_GOALS_LIST,
            component: (): Promise<Component> => import("@/views/Modules/Goals/List.vue"),
        },
        {
            path: VueRouterGoals.ROUTE_PATH_GOALS_PAYMENTS,
            name: VueRouterGoals.ROUTE_NAME_GOALS_PAYMENTS,
            component: (): Promise<Component> => import("@/views/Modules/Goals/Payments.vue"),
        },
        {
            path: VueRouterGoals.ROUTE_PATH_GOALS_SETTINGS,
            name: VueRouterGoals.ROUTE_NAME_GOALS_SETTINGS,
            component: (): Promise<Component> => import("@/views/Modules/Goals/Settings.vue"),
        },
    ]

}
import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

import UserModuleRights from "@/scripts/Core/Security/Rights/UserModuleRights";

export default class VueRouterGoals {

    static readonly ROUTE_PREFIX = "/goals"
    static readonly ROUTE_GROUP = "goals"

    static readonly ROUTE_NAME_GOALS_LIST  = VueRouterGoals.ROUTE_GROUP + "List";
    static readonly ROUTE_PATH_GOALS_LIST  = VueRouterGoals.ROUTE_PREFIX + "/list";

    static readonly ROUTE_NAME_GOALS_PAYMENTS  = VueRouterGoals.ROUTE_GROUP + "Payments";
    static readonly ROUTE_PATH_GOALS_PAYMENTS  = VueRouterGoals.ROUTE_PREFIX + "/payments";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterGoals.ROUTE_PATH_GOALS_LIST,
            name: VueRouterGoals.ROUTE_NAME_GOALS_LIST,
            component: (): Promise<Component> => import("@/views/Modules/Goals/List.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_GOALS_MODULE
            }
        },
        {
            path: VueRouterGoals.ROUTE_PATH_GOALS_PAYMENTS,
            name: VueRouterGoals.ROUTE_NAME_GOALS_PAYMENTS,
            component: (): Promise<Component> => import("@/views/Modules/Goals/Payments.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_GOALS_MODULE
            }
        },
    ]

}
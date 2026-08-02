import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

import UserModuleRights from "@/scripts/Core/Security/Rights/UserModuleRights";

export default class VueRouterHealth {

    static readonly ROUTE_PREFIX = "/health"
    static readonly ROUTE_GROUP = "health"

    static readonly ROUTE_NAME_HEALTH_OVERVIEW  = VueRouterHealth.ROUTE_GROUP + "Overview";
    static readonly ROUTE_PATH_HEALTH_OVERVIEW  = VueRouterHealth.ROUTE_PREFIX + "/overview";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterHealth.ROUTE_PATH_HEALTH_OVERVIEW,
            name: VueRouterHealth.ROUTE_NAME_HEALTH_OVERVIEW,
            component: (): Promise<Component> => import("@/views/Modules/Health/Overview.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_HEALTH_MODULE
            }
        },
    ]

}
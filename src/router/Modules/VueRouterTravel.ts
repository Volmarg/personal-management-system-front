import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

import UserModuleRights from "@/scripts/Core/Security/Rights/UserModuleRights";

export default class VueRouterTravel {

    static readonly ROUTE_PREFIX = "/travel"
    static readonly ROUTE_GROUP = "travel"

    static readonly ROUTE_NAME_TRAVEL_IDEAS_LIST  = VueRouterTravel.ROUTE_GROUP + "List";
    static readonly ROUTE_PATH_TRAVEL_IDEAS_LIST  = VueRouterTravel.ROUTE_PREFIX + "/ideas/list";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterTravel.ROUTE_PATH_TRAVEL_IDEAS_LIST,
            name: VueRouterTravel.ROUTE_NAME_TRAVEL_IDEAS_LIST,
            component: (): Promise<Component> => import("@/views/Modules/Travel/Ideas.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_TRAVELS_MODULE
            }
        },
    ]

}
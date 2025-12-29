import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

import UserRights from "@/scripts/Core/Security/UserRights";

export default class VueRouterShopping {

    static readonly ROUTE_PREFIX = "/shopping"
    static readonly ROUTE_GROUP = "shopping"

    static readonly ROUTE_NAME_SHOPPING_LIST  = VueRouterShopping.ROUTE_GROUP + "Plans";
    static readonly ROUTE_PATH_SHOPPING_LIST  = VueRouterShopping.ROUTE_PREFIX + "/plans";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterShopping.ROUTE_PATH_SHOPPING_LIST,
            name: VueRouterShopping.ROUTE_NAME_SHOPPING_LIST,
            component: (): Promise<Component> => import("@/views/Modules/Shopping/PlansList.vue"),
            meta: {
                requiredRight: UserRights.CAN_ACCESS_SHOPPING_MODULE
            }
        },
    ]

}
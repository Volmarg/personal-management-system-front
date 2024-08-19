import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

export default class VueRouterShopping {

    static readonly ROUTE_PREFIX = "/shopping"
    static readonly ROUTE_GROUP = "shopping"

    static readonly ROUTE_NAME_SHOPPING_LIST  = VueRouterShopping.ROUTE_GROUP + "List";
    static readonly ROUTE_PATH_SHOPPING_LIST  = VueRouterShopping.ROUTE_PREFIX + "/list";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterShopping.ROUTE_PATH_SHOPPING_LIST,
            name: VueRouterShopping.ROUTE_NAME_SHOPPING_LIST,
            component: (): Promise<Component> => import("@/views/Modules/Shopping/List.vue"),
        },
    ]

}
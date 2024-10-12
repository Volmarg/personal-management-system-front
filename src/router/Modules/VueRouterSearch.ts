import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

export default class VueRouterSearch {

    static readonly ROUTE_PREFIX = "/search"
    static readonly ROUTE_GROUP = "Search"

    static readonly ROUTE_NAME_SEARCH_RESULTS  = VueRouterSearch.ROUTE_GROUP + "List";
    static readonly ROUTE_PATH_SEARCH_RESULTS  = VueRouterSearch.ROUTE_PREFIX + "/results";

    static readonly ROUTE_QUERY_PARAM_QUERY = "query";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterSearch.ROUTE_PATH_SEARCH_RESULTS,
            name: VueRouterSearch.ROUTE_NAME_SEARCH_RESULTS,
            component: (): Promise<Component> => import("@/views/Modules/Search/Results.vue"),
        },
    ]

}
import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

export default class VueRouterIssues {

    static readonly ROUTE_PREFIX = "/issues"
    static readonly ROUTE_GROUP = "issues"

    static readonly ROUTE_NAME_ISSUES_PENDING_LIST  = VueRouterIssues.ROUTE_GROUP + "PendingList";
    static readonly ROUTE_PATH_ISSUES_PENDING_LIST  = VueRouterIssues.ROUTE_PREFIX + "/pending/list";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterIssues.ROUTE_PATH_ISSUES_PENDING_LIST,
            name: VueRouterIssues.ROUTE_NAME_ISSUES_PENDING_LIST,
            component: (): Promise<Component> => import("@/views/Modules/Issues/Pending.vue"),
        },
    ]

}
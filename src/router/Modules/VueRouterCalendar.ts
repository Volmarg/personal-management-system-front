import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

export default class VueRouterCalendar {

    static readonly ROUTE_PREFIX = "/calendar"
    static readonly ROUTE_GROUP = "calendar"

    static readonly ROUTE_NAME_CALENDAR_VIEW  = VueRouterCalendar.ROUTE_GROUP + "View";
    static readonly ROUTE_PATH_CALENDAR_VIEW  = VueRouterCalendar.ROUTE_PREFIX + "/";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterCalendar.ROUTE_PATH_CALENDAR_VIEW,
            name: VueRouterCalendar.ROUTE_NAME_CALENDAR_VIEW,
            component: (): Promise<Component> => import("@/views/Modules/Calendar/View.vue"),
        },
    ]

}
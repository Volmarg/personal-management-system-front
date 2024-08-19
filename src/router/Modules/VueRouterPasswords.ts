import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

export default class VueRouterPasswords {

    static readonly ROUTE_PREFIX = "/passwords"
    static readonly ROUTE_GROUP = "passwords"

    static readonly ROUTE_NAME_PASSWORDS_LIST  = VueRouterPasswords.ROUTE_GROUP + "List";
    static readonly ROUTE_PATH_PASSWORDS_LIST  = VueRouterPasswords.ROUTE_PREFIX + "/list";

    static readonly ROUTE_NAME_PASSWORDS_SETTINGS = VueRouterPasswords.ROUTE_GROUP + "Settings";
    static readonly ROUTE_PATH_PASSWORDS_SETTINGS = VueRouterPasswords.ROUTE_PREFIX + "/settings";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterPasswords.ROUTE_PATH_PASSWORDS_LIST,
            name: VueRouterPasswords.ROUTE_NAME_PASSWORDS_LIST,
            component: (): Promise<Component> => import("@/views/Modules/Passwords/List.vue"),
        },
        {
            path: VueRouterPasswords.ROUTE_PATH_PASSWORDS_SETTINGS,
            name: VueRouterPasswords.ROUTE_NAME_PASSWORDS_SETTINGS,
            component: (): Promise<Component> => import("@/views/Modules/Passwords/Settings.vue"),
        },
    ]

}
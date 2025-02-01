import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

/**
 * @description logic related to user settings based routes
 */
export default class VueRouterUser {

    static readonly ROUTE_NAME_USER_SECURITY  = "UserSecurity";
    static readonly ROUTE_NAME_USER_BASE_DATA = "UserBaseData";

    public static readonly userRoutesConfiguration: Array<RouteRecordRaw> = [
        {
            path: "",
            name: VueRouterUser.ROUTE_NAME_USER_BASE_DATA,
            component: (): Promise<Component> => import("@/views/User/Settings/Views/BaseData/BaseData.vue"),
        },
        {
            path: "",
            name: VueRouterUser.ROUTE_NAME_USER_SECURITY,
            component: (): Promise<Component> => import("@/views/User/Settings/Views/Security/Security.vue"),
        },
    ]
}
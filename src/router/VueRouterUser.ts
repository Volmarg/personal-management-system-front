import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

/**
 * @description logic related to user settings based routes
 */
export default class VueRouterUser {

    static readonly ROUTE_NAME_USER_SECURITY  = "UserSecurity";
    static readonly ROUTE_NAME_USER_BASE_DATA = "UserBaseData";

    static readonly ROUTE_NAME_EMAIL_CHANGE_CONFIRMATION = "UserEmailChangeConfirmation";
    static readonly ROUTE_PATH_EMAIL_CHANGE_CONFIRMATION = "/user/email-change-confirmation/:token";

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

    public static readonly userSettingLandingPageRoutesConfiguration: Array<RouteRecordRaw> = [
        {
            path      : VueRouterUser.ROUTE_PATH_EMAIL_CHANGE_CONFIRMATION,
            name      : VueRouterUser.ROUTE_NAME_EMAIL_CHANGE_CONFIRMATION,
            component : (): Promise<Component> => import("@/views/User/EmailChangeConfirmation.vue"),
        }
    ]
}
import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

/**
 * @description logic related to system settings based routes
 */
export default class VueRouterSystem {

    static readonly ROUTE_NAME_SYSTEM_DASHBOARD = "SystemSettingsDashboard";
    static readonly ROUTE_NAME_SYSTEM_FINANCES = "SystemSettingsFinances";
    static readonly ROUTE_NAME_SYSTEM_NOTIFICATIONS = "SystemSettingsNotifications";

    public static readonly systemRoutesConfiguration: Array<RouteRecordRaw> = [
        {
            path: "",
            name: VueRouterSystem.ROUTE_NAME_SYSTEM_DASHBOARD,
            component: (): Promise<Component> => import("@/views/System/Settings/Dashboard.vue"),
        },
        {
            path: "",
            name: VueRouterSystem.ROUTE_NAME_SYSTEM_FINANCES,
            component: (): Promise<Component> => import("@/views/System/Settings/Finances.vue"),
        },
        {
            path: "",
            name: VueRouterSystem.ROUTE_NAME_SYSTEM_NOTIFICATIONS,
            component: (): Promise<Component> => import("@/views/System/Settings/Notifications.vue"),
        },
    ]

}
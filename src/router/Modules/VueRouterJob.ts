import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

import UserRights from "@/scripts/Core/Security/UserRights";

export default class VueRouterJob {

    static readonly ROUTE_PREFIX = "/job"
    static readonly ROUTE_GROUP = "job"

    static readonly ROUTE_NAME_JOB_AFTERHOURS  = VueRouterJob.ROUTE_GROUP + "Afterhours";
    static readonly ROUTE_PATH_JOB_AFTERHOURS  = VueRouterJob.ROUTE_PREFIX + "/afterhours/list";

    static readonly ROUTE_NAME_JOB_HOLIDAYS  = VueRouterJob.ROUTE_GROUP + "Holidays";
    static readonly ROUTE_PATH_JOB_HOLIDAYS  = VueRouterJob.ROUTE_PREFIX + "/holidays/list";

    static readonly ROUTE_NAME_JOB_SETTINGS  = VueRouterJob.ROUTE_GROUP + "Settings";
    static readonly ROUTE_PATH_JOB_SETTINGS  = VueRouterJob.ROUTE_PREFIX + "/settings/list";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterJob.ROUTE_PATH_JOB_AFTERHOURS,
            name: VueRouterJob.ROUTE_NAME_JOB_AFTERHOURS,
            component: (): Promise<Component> => import("@/views/Modules/Job/Afterhours.vue"),
            meta: {
                requiredRight: UserRights.CAN_ACCESS_JOB_MODULE
            }
        },
        {
            path: VueRouterJob.ROUTE_PATH_JOB_HOLIDAYS,
            name: VueRouterJob.ROUTE_NAME_JOB_HOLIDAYS,
            component: (): Promise<Component> => import("@/views/Modules/Job/Holidays.vue"),
            meta: {
                requiredRight: UserRights.CAN_ACCESS_JOB_MODULE
            }
        },
        {
            path: VueRouterJob.ROUTE_PATH_JOB_SETTINGS,
            name: VueRouterJob.ROUTE_NAME_JOB_SETTINGS,
            component: (): Promise<Component> => import("@/views/Modules/Job/Settings.vue"),
            meta: {
                requiredRight: UserRights.CAN_ACCESS_JOB_MODULE
            }
        },
    ]

}
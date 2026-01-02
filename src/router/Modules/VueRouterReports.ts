import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

import UserModuleRights from "@/scripts/Core/Security/Rights/UserModuleRights";

export default class VueRouterReports {

    static readonly ROUTE_PREFIX = "/reports"
    static readonly ROUTE_GROUP = "reports"

    static readonly ROUTE_NAME_REPORT_PAYMENT_SUMMARIES  = VueRouterReports.ROUTE_GROUP + "PaymentSummaries";
    static readonly ROUTE_PATH_REPORT_PAYMENT_SUMMARIES  = VueRouterReports.ROUTE_PREFIX + "/payment-summaries";

    static readonly ROUTE_NAME_REPORT_HISTORICALLY_MONEY_OWED  = VueRouterReports.ROUTE_GROUP + "HistoricallyMoneyOwed";
    static readonly ROUTE_PATH_REPORT_HISTORICALLY_MONEY_OWED  = VueRouterReports.ROUTE_PREFIX + "/history/money-owed";

    static readonly ROUTE_NAME_REPORT_PAYMENT_CHARTS  = VueRouterReports.ROUTE_GROUP + "PaymentCharts";
    static readonly ROUTE_PATH_REPORT_PAYMENT_CHARTS  = VueRouterReports.ROUTE_PREFIX + "/payment-charts";

    static readonly ROUTE_NAME_REPORT_SAVING_CHARTS  = VueRouterReports.ROUTE_GROUP + "SavingCharts";
    static readonly ROUTE_PATH_REPORT_SAVING_CHARTS  = VueRouterReports.ROUTE_PREFIX + "/saving-charts";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterReports.ROUTE_PATH_REPORT_PAYMENT_SUMMARIES,
            name: VueRouterReports.ROUTE_NAME_REPORT_PAYMENT_SUMMARIES,
            component: (): Promise<Component> => import("@/views/Modules/Reports/PaymentSummaries.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_REPORTS_MODULE
            }
        },
        {
            path: VueRouterReports.ROUTE_PATH_REPORT_HISTORICALLY_MONEY_OWED,
            name: VueRouterReports.ROUTE_NAME_REPORT_HISTORICALLY_MONEY_OWED,
            component: (): Promise<Component> => import("@/views/Modules/Reports/Historical/MoneyOwed.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_REPORTS_MODULE
            }
        },
        {
            path: VueRouterReports.ROUTE_PATH_REPORT_PAYMENT_CHARTS,
            name: VueRouterReports.ROUTE_NAME_REPORT_PAYMENT_CHARTS,
            component: (): Promise<Component> => import("@/views/Modules/Reports/PaymentCharts.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_REPORTS_MODULE
            }
        },
        {
            path: VueRouterReports.ROUTE_PATH_REPORT_SAVING_CHARTS,
            name: VueRouterReports.ROUTE_NAME_REPORT_SAVING_CHARTS,
            component: (): Promise<Component> => import("@/views/Modules/Reports/SavingCharts.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_REPORTS_MODULE
            }
        },
    ]

}
import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

import UserRights from "@/scripts/Core/Security/UserRights";

export default class VueRouterPayments {

    static readonly ROUTE_PREFIX = "/payments"
    static readonly ROUTE_GROUP = "payments"

    static readonly ROUTE_NAME_PAYMENTS_PRODUCT_PRICES  = VueRouterPayments.ROUTE_GROUP + "ProductPrices";
    static readonly ROUTE_PATH_PAYMENTS_PRODUCT_PRICES  = VueRouterPayments.ROUTE_PREFIX + "/product-prices/list";

    static readonly ROUTE_NAME_PAYMENTS_MONTHLY  = VueRouterPayments.ROUTE_GROUP + "MonthlyPayments";
    static readonly ROUTE_PATH_PAYMENTS_MONTHLY  = VueRouterPayments.ROUTE_PREFIX + "/monthly-payments/list";

    static readonly ROUTE_NAME_PAYMENTS_MONEY_OWED  = VueRouterPayments.ROUTE_GROUP + "MoneyOwed";
    static readonly ROUTE_PATH_PAYMENTS_MONEY_OWED  = VueRouterPayments.ROUTE_PREFIX + "/money-owed/list";

    static readonly ROUTE_NAME_PAYMENTS_INCOMES  = VueRouterPayments.ROUTE_GROUP + "Incomes";
    static readonly ROUTE_PATH_PAYMENTS_INCOMES  = VueRouterPayments.ROUTE_PREFIX + "/incomes/list";

    static readonly ROUTE_NAME_PAYMENTS_BILLS  = VueRouterPayments.ROUTE_GROUP + "Bills";
    static readonly ROUTE_PATH_PAYMENTS_BILLS  = VueRouterPayments.ROUTE_PREFIX + "/bills/list";

    static readonly ROUTE_NAME_PAYMENTS_SETTINGS  = VueRouterPayments.ROUTE_GROUP + "Settings";
    static readonly ROUTE_PATH_PAYMENTS_SETTINGS  = VueRouterPayments.ROUTE_PREFIX + "/bills/settings";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterPayments.ROUTE_PATH_PAYMENTS_PRODUCT_PRICES,
            name: VueRouterPayments.ROUTE_NAME_PAYMENTS_PRODUCT_PRICES,
            component: (): Promise<Component> => import("@/views/Modules/Payments/ProductPrices.vue"),
            meta: {
                requiredRight: UserRights.CAN_ACCESS_PAYMENTS_MODULE
            }
        },
        {
            path: VueRouterPayments.ROUTE_PATH_PAYMENTS_MONEY_OWED,
            name: VueRouterPayments.ROUTE_NAME_PAYMENTS_MONEY_OWED,
            component: (): Promise<Component> => import("@/views/Modules/Payments/MoneyOwed.vue"),
            meta: {
                requiredRight: UserRights.CAN_ACCESS_PAYMENTS_MODULE
            }
        },
        {
            path: VueRouterPayments.ROUTE_PATH_PAYMENTS_INCOMES,
            name: VueRouterPayments.ROUTE_NAME_PAYMENTS_INCOMES,
            component: (): Promise<Component> => import("@/views/Modules/Payments/Incomes.vue"),
            meta: {
                requiredRight: UserRights.CAN_ACCESS_PAYMENTS_MODULE
            }
        },
        {
            path: VueRouterPayments.ROUTE_PATH_PAYMENTS_MONTHLY,
            name: VueRouterPayments.ROUTE_NAME_PAYMENTS_MONTHLY,
            component: (): Promise<Component> => import("@/views/Modules/Payments/MonthlyPayments.vue"),
            meta: {
                requiredRight: UserRights.CAN_ACCESS_PAYMENTS_MODULE
            }
        },
        {
            path: VueRouterPayments.ROUTE_PATH_PAYMENTS_BILLS,
            name: VueRouterPayments.ROUTE_NAME_PAYMENTS_BILLS,
            component: (): Promise<Component> => import("@/views/Modules/Payments/Bills.vue"),
            meta: {
                requiredRight: UserRights.CAN_ACCESS_PAYMENTS_MODULE
            }
        },
        {
            path: VueRouterPayments.ROUTE_PATH_PAYMENTS_SETTINGS,
            name: VueRouterPayments.ROUTE_NAME_PAYMENTS_SETTINGS,
            component: (): Promise<Component> => import("@/views/Modules/Payments/Settings.vue"),
            meta: {
                requiredRight: UserRights.CAN_ACCESS_PAYMENTS_MODULE
            }
        },
    ]

}
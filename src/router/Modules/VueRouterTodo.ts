import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

import UserModuleRights from "@/scripts/Core/Security/Rights/UserModuleRights";

export default class VueRouterTodo {

    static readonly ROUTE_PREFIX = "/todo"
    static readonly ROUTE_GROUP = "todo"

    static readonly ROUTE_NAME_TODO_LIST  = VueRouterTodo.ROUTE_GROUP + "List";
    static readonly ROUTE_PATH_TODO_LIST  = VueRouterTodo.ROUTE_PREFIX + "/list";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterTodo.ROUTE_PATH_TODO_LIST,
            name: VueRouterTodo.ROUTE_NAME_TODO_LIST,
            component: (): Promise<Component> => import("@/views/Modules/Todo/List.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_TODO_MODULE
            }
        },
    ]

}
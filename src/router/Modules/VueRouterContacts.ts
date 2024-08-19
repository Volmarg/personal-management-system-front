import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

export default class VueRouterContacts {

    static readonly ROUTE_PREFIX = "/contacts"
    static readonly ROUTE_GROUP = "contacts"

    static readonly ROUTE_NAME_CONTACTS_LIST  = VueRouterContacts.ROUTE_GROUP + "List";
    static readonly ROUTE_PATH_CONTACTS_LIST  = VueRouterContacts.ROUTE_PREFIX + "/list";

    static readonly ROUTE_NAME_CONTACTS_SETTINGS  = VueRouterContacts.ROUTE_GROUP + "Settings";
    static readonly ROUTE_PATH_CONTACTS_SETTINGS  = VueRouterContacts.ROUTE_PREFIX + "/settings";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterContacts.ROUTE_PATH_CONTACTS_LIST,
            name: VueRouterContacts.ROUTE_NAME_CONTACTS_LIST,
            component: (): Promise<Component> => import("@/views/Modules/Contacts/List.vue"),
        },
        {
            path: VueRouterContacts.ROUTE_PATH_CONTACTS_SETTINGS,
            name: VueRouterContacts.ROUTE_NAME_CONTACTS_SETTINGS,
            component: (): Promise<Component> => import("@/views/Modules/Contacts/Settings.vue"),
        },
    ]

}
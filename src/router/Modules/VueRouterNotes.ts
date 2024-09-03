import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

export default class VueRouterNotes {

    static readonly ROUTE_PREFIX = "/notes"
    static readonly ROUTE_GROUP = "notes"

    static readonly ROUTE_NAME_NOTES_NEW  = VueRouterNotes.ROUTE_GROUP + "New";
    static readonly ROUTE_PATH_NOTES_NEW  = VueRouterNotes.ROUTE_PREFIX + "/new";

    static readonly ROUTE_NAME_NOTES_SETTINGS  = VueRouterNotes.ROUTE_GROUP + "Settings";
    static readonly ROUTE_PATH_NOTES_SETTINGS  = VueRouterNotes.ROUTE_PREFIX + "/settings";

    static readonly ROUTE_NAME_NOTES_CATEGORY = VueRouterNotes.ROUTE_GROUP + "Category";
    static readonly ROUTE_PATH_NOTES_CATEGORY  = VueRouterNotes.ROUTE_PREFIX + "/category/:id";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterNotes.ROUTE_PATH_NOTES_NEW,
            name: VueRouterNotes.ROUTE_NAME_NOTES_NEW,
            component: (): Promise<Component> => import("@/views/Modules/Notes/New.vue"),
        },
        {
            path: VueRouterNotes.ROUTE_PATH_NOTES_SETTINGS,
            name: VueRouterNotes.ROUTE_NAME_NOTES_SETTINGS,
            component: (): Promise<Component> => import("@/views/Modules/Notes/Settings.vue"),
        },
        {
            path: VueRouterNotes.ROUTE_PATH_NOTES_CATEGORY,
            name: VueRouterNotes.ROUTE_NAME_NOTES_CATEGORY,
            component: (): Promise<Component> => import("@/views/Modules/Notes/Category.vue"),
        },
    ]

}
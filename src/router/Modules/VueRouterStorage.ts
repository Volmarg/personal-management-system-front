import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

export default class VueRouterStorage {

    static readonly ROUTE_PREFIX = "/storage"
    static readonly ROUTE_GROUP = "storage"

    static readonly ROUTE_NAME_STORAGE_IMAGES_SETTINGS  = VueRouterStorage.ROUTE_GROUP + "ImagesSettings";
    static readonly ROUTE_PATH_STORAGE_IMAGES_SETTINGS  = VueRouterStorage.ROUTE_PREFIX + "/images/settings";

    static readonly ROUTE_NAME_STORAGE_IMAGES_FOLDER  = VueRouterStorage.ROUTE_GROUP + "ImagesFolder";
    static readonly ROUTE_PATH_STORAGE_IMAGES_FOLDER  = VueRouterStorage.ROUTE_PREFIX + "/images/folder/:path";

    static readonly ROUTE_NAME_STORAGE_VIDEO_SETTINGS  = VueRouterStorage.ROUTE_GROUP + "VideoSettings";
    static readonly ROUTE_PATH_STORAGE_VIDEO_SETTINGS  = VueRouterStorage.ROUTE_PREFIX + "/video/settings";

    static readonly ROUTE_NAME_STORAGE_VIDEO_FOLDER  = VueRouterStorage.ROUTE_GROUP + "VideoFolder";
    static readonly ROUTE_PATH_STORAGE_VIDEO_FOLDER  = VueRouterStorage.ROUTE_PREFIX + "/video/folder/:path";

    static readonly ROUTE_NAME_STORAGE_FILES_SETTINGS  = VueRouterStorage.ROUTE_GROUP + "FilesSettings";
    static readonly ROUTE_PATH_STORAGE_FILES_SETTINGS  = VueRouterStorage.ROUTE_PREFIX + "/files/settings";

    static readonly ROUTE_NAME_STORAGE_FILES_FOLDER  = VueRouterStorage.ROUTE_GROUP + "FilesFolder";
    static readonly ROUTE_PATH_STORAGE_FILES_FOLDER  = VueRouterStorage.ROUTE_PREFIX + "/files/folder/:path";

    static readonly ROUTE_NAME_STORAGE_UPLOAD_ADD  = VueRouterStorage.ROUTE_GROUP + "UploadAdd";
    static readonly ROUTE_PATH_STORAGE_UPLOAD_ADD  = VueRouterStorage.ROUTE_PREFIX + "/upload/add";

    static readonly ROUTE_NAME_STORAGE_UPLOAD_MANAGE  = VueRouterStorage.ROUTE_GROUP + "UploadManage";
    static readonly ROUTE_PATH_STORAGE_UPLOAD_MANAGE  = VueRouterStorage.ROUTE_PREFIX + "/upload/manage";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_IMAGES_SETTINGS,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_IMAGES_SETTINGS,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Images/Settings.vue"),
        },
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_IMAGES_FOLDER,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_IMAGES_FOLDER,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Images/Folder.vue"),
        },
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_VIDEO_SETTINGS,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_VIDEO_SETTINGS,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Video/Settings.vue"),
        },
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_VIDEO_FOLDER,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_VIDEO_FOLDER,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Video/Folder.vue"),
        },
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_FILES_FOLDER,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_FILES_FOLDER,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Files/Settings.vue"),
        },
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_FILES_SETTINGS,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_FILES_SETTINGS,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Files/Folder.vue"),
        },
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_UPLOAD_ADD,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_UPLOAD_ADD,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Upload/Add.vue"),
        },
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_UPLOAD_MANAGE,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_UPLOAD_MANAGE,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Upload/Manage.vue"),
        },
    ]

}
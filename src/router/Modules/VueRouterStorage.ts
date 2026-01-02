import {RouteRecordRaw} from "vue-router";
import {Component}      from "vue";

import UserModuleRights from "@/scripts/Core/Security/Rights/UserModuleRights";

export default class VueRouterStorage {

    static readonly ROUTE_PREFIX = "/storage"
    static readonly ROUTE_GROUP = "storage"

    static readonly ROUTE_NAME_STORAGE_IMAGES_FOLDER  = VueRouterStorage.ROUTE_GROUP + "ImagesFolder";
    static readonly ROUTE_PATH_STORAGE_IMAGES_FOLDER  = VueRouterStorage.ROUTE_PREFIX + "/images/folder";

    static readonly ROUTE_NAME_STORAGE_VIDEO_FOLDER  = VueRouterStorage.ROUTE_GROUP + "VideoFolder";
    static readonly ROUTE_PATH_STORAGE_VIDEO_FOLDER  = VueRouterStorage.ROUTE_PREFIX + "/video/folder";

    static readonly ROUTE_NAME_STORAGE_FILES_FOLDER  = VueRouterStorage.ROUTE_GROUP + "FilesFolder";
    static readonly ROUTE_PATH_STORAGE_FILES_FOLDER  = VueRouterStorage.ROUTE_PREFIX + "/files/folder";

    static readonly ROUTE_NAME_STORAGE_UPLOAD_MANAGE  = VueRouterStorage.ROUTE_GROUP + "Manage";
    static readonly ROUTE_PATH_STORAGE_UPLOAD_MANAGE  = VueRouterStorage.ROUTE_PREFIX + "/storage/manage";

    public static readonly routesConfiguration: Array<RouteRecordRaw> = [
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_IMAGES_FOLDER,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_IMAGES_FOLDER,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Images/Folder.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_IMAGES_MODULE
            }
        },
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_VIDEO_FOLDER,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_VIDEO_FOLDER,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Video/Folder.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_VIDEOS_MODULE
            }
        },
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_FILES_FOLDER,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_FILES_FOLDER,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Files/Folder.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_FILES_MODULE
            }
        },
        {
            path: VueRouterStorage.ROUTE_PATH_STORAGE_UPLOAD_MANAGE,
            name: VueRouterStorage.ROUTE_NAME_STORAGE_UPLOAD_MANAGE,
            component: (): Promise<Component> => import("@/views/Modules/Storage/Upload/Manage.vue"),
            meta: {
                requiredRight: UserModuleRights.CAN_ACCESS_STORAGE_MODULE
            }
        },
    ]

}
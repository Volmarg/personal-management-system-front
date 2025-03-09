import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the storage module
 */
export default class SymfonyStorageRoutes extends SymfonyRoutes
{
    public static readonly FOLDER_BASE_URL = "/module/storage/folder";
    public static readonly FOLDER_CREATE_URL = SymfonyStorageRoutes.FOLDER_BASE_URL + "/create";
    public static readonly FOLDER_TOGGLE_LOCK_URL = SymfonyStorageRoutes.FOLDER_BASE_URL + "/toggle-lock";
    public static readonly FOLDER_UPDATE_META_DATA = SymfonyStorageRoutes.FOLDER_BASE_URL + "/folder-meta-data";

    public static readonly FILE_BASE_URL = "/module/storage/file";
    public static readonly FILE_UPDATE_URL = SymfonyStorageRoutes.FILE_BASE_URL + "/update";
    public static readonly FILE_REMOVE_URL = SymfonyStorageRoutes.FILE_BASE_URL + "/remove";
    public static readonly FILE_MOVE_URL = SymfonyStorageRoutes.FILE_BASE_URL + "/move";
}
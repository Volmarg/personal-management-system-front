import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import UserController      from "@/scripts/Core/Controller/UserController";
import {userStateStore}    from "@/scripts/Vue/Store/UserState";

/**
 * @description handles the logic of local storage
 */
export default class LocalStorageService {

    /**
     * @description dashboard widget size
     */
    static readonly DASHBOARD_WIDGET_SIZE = "conf.dashboard.widgetSize";

    /**
     * @description JWT authentication token
     */
    static readonly AUTHENTICATION_TOKEN = "token";

    /**
     * @description JWT authentication token
     */
    static readonly PUBLIC_FOLDER_AUTHENTICATION_TOKEN = "publicFolderToken";

    /**
     * @description Special flag to enforce logging
     */
    static readonly FORCE_LOG = "forceLog";

    /**
     * @description Token used for backend debugging
     */
    static readonly XDEBUG_TOKEN = "xdebugToken";

    /**
     * @description Timestamp which indicates when user was active last time on page
     */
    static readonly LAST_ACTIVITY_TIMESTAMP = "lat";

    /**
     * @description defines if given modal is maximised or not
     */
    private static readonly MODAL_MAXIMISED_PREFIX = "modalMaximised_";


    /**
     * @description marks given tour as done
     */
    public static setTourDone(tourName: string): void {
        let userController = new UserController();
        if (!userController.isUserLoggedIn()) {
            return;
        }

        let key = tourName + userController.getLoggedInUserData().userId;
        LocalStorageService.set(key, "1");
    }

    /**
     * @description check if given tour is done
     */
    public static isTourDone(tourName: string): boolean {
        let userController = new UserController();
        if (!userController.isUserLoggedIn()) {
            return false;
        }

        let key = tourName + userController.getLoggedInUserData().userId;
        return LocalStorageService.isSet(key);
    }

    /**
     * @description check if modal is maximised
     */
    public static isModalMaximised(modalId: string): boolean {
        let value = LocalStorageService.get(`${LocalStorageService.MODAL_MAXIMISED_PREFIX}_${modalId}`, true);
        if (StringTypeProcessor.isEmptyString(value, false, false)) {
            return false;
        }

        return Boolean(Number(value));
    }

    /**
     * @description set the modal maximise state
     */
    public static setModalMaximised(modalId: string, isMaximised: boolean): void {
        LocalStorageService.set(`${LocalStorageService.MODAL_MAXIMISED_PREFIX}_${modalId}`, String(Number(isMaximised)));
    }

    /**
     * @description refreshing time left is handled for every jwt token only once so the storage key has to be dynamic
     */
    public static getTimeRefreshStorageKey(): string {
        return `tl-${LocalStorageService.getAuthToken()}`;
    }

    /**
     * @description returns authentication token
     */
    public static getAuthToken(): string {
        return LocalStorageService.get(LocalStorageService.AUTHENTICATION_TOKEN);
    }

    /**
     * @description sets the authentication token
     */
    public static setAuthToken(token: string): void {
        LocalStorageService.set(LocalStorageService.AUTHENTICATION_TOKEN, token);
        userStateStore().token = token;
    }

    /**
     * @description check if auth token is set
     */
    public static isAuthTokenSet(): boolean {
        return LocalStorageService.isSet(LocalStorageService.AUTHENTICATION_TOKEN)
    }

    /**
     * @description will set the value under given key in local storage
     */
    public static set(key: string, value: string): void
    {
        localStorage.setItem(key, value);
    }

    /**
     * @description will return value stored under given key, or empty string if no such key exists
     */
    public static get(key: string, useZeroAsNonEmpty: boolean = false): string
    {
        let value = localStorage.getItem(key);
        if(
                useZeroAsNonEmpty
            &&  (value == "0")
        ){
            return value;
        }

        if (StringTypeProcessor.isEmptyString(value)) {
            return "";
        }
        return value as string;
    }

    /**
     * @description check if given key is set in local storage
     */
    public static isSet(key: string, useZeroAsNonEmpty: boolean = false): boolean
    {
        let value = localStorage.getItem(key);
        if(
                useZeroAsNonEmpty
            &&  (value == "0")
        ){
            return true;
        }

        return !StringTypeProcessor.isEmptyString(value);
    }

    /**
     * @description will remove entry under given key in local storage
     */
    public static remove(key: string): void
    {
        localStorage.removeItem(key);
    }

}
import BaseError           from "@/scripts/Core/Error/BaseError";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import {v4 as uuidv4}      from "uuid";

/**
 * @description handles the logic of session storage
 */
export default class SessionStorageService {

    static readonly TAB_ID = "tabId";

    /**
     * @description will set the value under given key in local storage
     */
    public static set(key: string, value: string): void
    {
        sessionStorage.setItem(key, value);
    }

    /**
     * @description will return value stored under given key, or empty string if no such key exists
     */
    public static get(key: string, useZeroAsNonEmpty: boolean = false): string
    {
        let value = sessionStorage.getItem(key);
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
        let value = sessionStorage.getItem(key);
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
        sessionStorage.removeItem(key);
    }

    /**
     * @description sets the current tab id (refers to the browser tab - in most cases)
     */
    public static setActiveTabId(): void {
        if (SessionStorageService.isSet(SessionStorageService.TAB_ID)) {
            return;
        }

        SessionStorageService.set(SessionStorageService.TAB_ID, uuidv4())
    }

    /**
     * @description get current active tab id
     */
    public static getActiveTabId() {
        if (!SessionStorageService.isSet(SessionStorageService.TAB_ID)) {
            throw new BaseError("Something wen severely wrong! Tab has no tabId set in session!");
        }

        return SessionStorageService.get(SessionStorageService.TAB_ID);
    }
}
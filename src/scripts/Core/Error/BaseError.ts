import Logger from "@/scripts/Core/Logger";

/**
 * @description this is a base error class to extend from
 *              The `data` is not handled right now - no idea how to stack all bubbled calls to one data string
 */
export default class BaseError extends Error {

    /**
     * @param message
     * @param data
     */
    public constructor(message: string, data: Record<string, string | Error | number | null | boolean | unknown> | Array<string | number | null | boolean> = {}) { // eslint-disable-line @typescript-eslint/no-unused-vars
        Logger.error(message, data);
        super(message);
    }

}
import EnvReader           from "@/scripts/Core/System/EnvReader";
import LocalStorageService from "@/scripts/Core/Services/Storage/LocalStorageService";

/**
 * @description will handle logging, but only if the conditions for showing logs are meet
 *              these logs are never shown in production mode.
 */
export default class Logger
{

    /**
     * @description log error in console
     *
     * @param message
     * @param data
     */
    public static error(message: string, data: Record<string | number, string | number | null | boolean | unknown> = {}): void
    {
        if( Logger.isAllowedToLog() ){
            console.error({
                message : message,
                data    : data
            });
        }

    }

    /**
     * @description log error in console
     *
     * @param message
     * @param data
     */
    public static warn(message: string, data: Record<string | number, unknown> = {}): void
    {
        if( Logger.isAllowedToLog() ){
            console.warn({
                message : message,
                data    : data
            });
        }
    }

    /**
     * @description log info in console
     *
     * @param message
     * @param data
     */
    public static info(message: string, data: Record<string | number, string | number | null | boolean | unknown> = {}): void
    {
        if( Logger.isAllowedToLog() ){
            console.info({
                message : message,
                data    : data
            });
        }
    }

    /**
     * @description check if logger is allowed to log anything
     */
    private static isAllowedToLog(): boolean
    {
        return ( EnvReader.isDev() || LocalStorageService.isSet(LocalStorageService.FORCE_LOG) );
    }

}
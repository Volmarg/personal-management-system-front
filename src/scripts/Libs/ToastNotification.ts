import Toastr from 'toastr2';
import 'toastr2/dist/toastr.min.css';

import ObjectTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ObjectTypeProcessor";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import Logger from "@/scripts/Core/Logger";

enum ToastTypeEnum {
    warning = "warning",
    error   = "error",
    info    = "info",
    success = "success",
}

/**
 * @description handles showing alerts / notifications
 * @link https://www.npmjs.com/package/toastr
 * @link https://www.npmjs.com/package/toastr2 (because this one is not using jquery which breaks prod build process)
 */
export default class ToastNotification {

    private static readonly NO_AUTO_CLOSE_NOTIFICATION_MAX_TIME = 60000; // in milliseconds
    private static readonly AUTO_CLOSE_NOTIFICATION_BASE_TIME = 3000; // in milliseconds

    private static readonly GLOBAL_OPTIONS = {
        preventDuplicates: true,
    }

    private static readonly NO_AUTO_CLOSE_OPTIONS = {
        closeButton : true,
        timeOut     : ToastNotification.NO_AUTO_CLOSE_NOTIFICATION_MAX_TIME,
    };

    /**
     * @description will show alert based on the provided type
     */
    public static showAlert(alertType: string, message: string | null, autoClose = true): void {
        if(
                StringTypeProcessor.isEmptyString(message)
            ||  null === message
        ){
            return;
        }

        if( !ObjectTypeProcessor.hasKey(ToastTypeEnum, alertType) ){
            ToastNotification.showErrorAlert("Internal server error! Try again later.");
            Logger.error("This ToastNotification alert type is not supported: " + alertType);
            return;
        }
        let alertTypeString = ToastTypeEnum[alertType];

        let autoCloseOptions = (
            autoClose ? ToastNotification.getAutoCloseOptions(message) : ToastNotification.NO_AUTO_CLOSE_OPTIONS
        );

        let allOptions       = {
            ...autoCloseOptions,
            ...ToastNotification.GLOBAL_OPTIONS
        };

        let toast = new Toastr();
        toast[alertTypeString](message, "", allOptions);
    }

    /**
     * @description will show red alert popup with given message
     * @param message
     */
    public static showErrorAlert(message: string): void
    {
        let toast = new Toastr();
        toast.error(message);
    }

    /**
     * @description get the {@see ToastTypeEnum} based on the provided server code
     */
    public static getTypeFromCode(code: number): string {
        if (code >= 200 && code < 300) {
            return ToastTypeEnum.success;
        }

        if (code >= 400 && code < 500) {
            return ToastTypeEnum.warning;
        }

        if (code >= 500) {
            return ToastTypeEnum.error;
        }

        return ToastTypeEnum.info;
    }

    /**
     * @description builds set of options used for "AutoClose mode
     *              - calculating the auto-close time based on message length,
     */
    private static getAutoCloseOptions(message: string): Record<string, string | number> {
        let closeTime                        = ToastNotification.AUTO_CLOSE_NOTIFICATION_BASE_TIME;
        let closeTimeIncrement               = 500; // milliseconds
        let incrementerPerEachLength         = 12;
        let minMessageLengthToUseIncrementer = 25;

        if (message.length > minMessageLengthToUseIncrementer) {
            let incrementerMultiplier = Math.round(message.length / incrementerPerEachLength);
            closeTime += incrementerMultiplier * closeTimeIncrement;
        }

        return {
            timeOut: closeTime,
        }
    }
}

export {ToastTypeEnum};
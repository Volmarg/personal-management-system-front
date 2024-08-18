import BaseError         from "@/scripts/Core/Error/BaseError";
import BoolTypeProcessor from "@/scripts/Core/Services/TypesProcessors/BoolTypeProcessor";
import {AlertTypesEnums} from "@/components/Notification/Alert.vue"

/**
 * @description handles reading of env data
 */
export default class EnvReader {

    static readonly SYSTEM_MODE_SHORT_PRODUCTION  = "prod";
    static readonly SYSTEM_MODE_SHORT_DEVELOPMENT = "dev";

    static readonly ENV_KEY_VUE_APP_BACKEND_BASE_URL           = "VITE_BACKEND_BASE_URL";
    static readonly ENV_KEY_VUE_APP_DEFAULT_LANGUAGE           = "VITE_DEFAULT_LANGUAGE";
    static readonly ENV_KEY_VUE_APP_IS_MAINTENANCE             = "VITE_IS_MAINTENANCE";
    static readonly ENV_KEY_VITE_MAINTENANCE_MESSAGE_HEADLINE  = "VITE_MAINTENANCE_MESSAGE_HEADLINE";
    static readonly ENV_KEY_VITE_MAINTENANCE_MESSAGE_TEXT      = "VITE_MAINTENANCE_MESSAGE_TEXT";
    static readonly ENV_KEY_VITE_IS_MESSAGE_BAR_ON             = "VITE_IS_MESSAGE_BAR_ON";
    static readonly ENV_KEY_VITE_MESSAGE_BAR_TEXT              = "VITE_MESSAGE_BAR_TEXT";
    static readonly ENV_KEY_VITE_MESSAGE_BAR_TYPE              = "VITE_MESSAGE_BAR_TYPE";
    static readonly ENV_KEY_VITE_IS_DEMO                       = "VITE_IS_DEMO";

    static readonly VITE_PREFILLED_LOGIN_CREDENTIALS_EMAIL    = "VITE_PREFILLED_LOGIN_CREDENTIALS_EMAIL";
    static readonly VITE_PREFILLED_LOGIN_CREDENTIALS_PASSWORD = "VITE_PREFILLED_LOGIN_CREDENTIALS_PASSWORD";

    /**
     * @description return information if system is in production mode
     *              this variable is always defined - no need to check if exists
     */
    public static isProduction(): boolean
    {
        return import.meta.env.PROD;
    }

    /**
     * @description return info if project is in demo mode
     */
    public static isDemo(): boolean
    {
        let isDemoString = import.meta.env[EnvReader.ENV_KEY_VITE_IS_DEMO];
        return BoolTypeProcessor.boolStringToRealBool(isDemoString);
    }

    /**
     * @description return information if system is in development mode
     *              this variable is always defined - no need to check if exists
     */
    public static isDev(): boolean
    {
        return import.meta.env.DEV;
    }

    /**
     * @description get backend base url
     */
    public static getBackendBaseUrl(): string
    {
        EnvReader.validateEnvVariableExistence(EnvReader.ENV_KEY_VUE_APP_BACKEND_BASE_URL);
        return import.meta.env[EnvReader.ENV_KEY_VUE_APP_BACKEND_BASE_URL] as string;
    }

    /**
     * @description will return the default language of the app
     */
    public static getAppDefaultLanguage(): string
    {
        EnvReader.validateEnvVariableExistence(EnvReader.ENV_KEY_VUE_APP_DEFAULT_LANGUAGE);
        return import.meta.env[EnvReader.ENV_KEY_VUE_APP_DEFAULT_LANGUAGE] as string;
    }

    /**
     * @description will return information if system is currently in maintenance mode or not
     */
    public static isMaintenance(): boolean
    {
        EnvReader.validateEnvVariableExistence(EnvReader.ENV_KEY_VUE_APP_IS_MAINTENANCE);
        let isMaintenanceAsString = import.meta.env[EnvReader.ENV_KEY_VUE_APP_IS_MAINTENANCE] as string;
        let isMaintenance         = BoolTypeProcessor.boolStringToRealBool(isMaintenanceAsString);
        return isMaintenance;
    }

    /**
     * @description will return maintenance headline message
     */
    public static getMaintenanceHeadlineMessage(): string
    {
        EnvReader.validateEnvVariableExistence(EnvReader.ENV_KEY_VITE_MAINTENANCE_MESSAGE_HEADLINE);
        return import.meta.env[EnvReader.ENV_KEY_VITE_MAINTENANCE_MESSAGE_HEADLINE] as string;
    }

    /**
     * @description will return maintenance text (below headline)
     */
    public static getMaintenanceText(): string
    {
        EnvReader.validateEnvVariableExistence(EnvReader.ENV_KEY_VITE_MAINTENANCE_MESSAGE_TEXT);
        return import.meta.env[EnvReader.ENV_KEY_VITE_MAINTENANCE_MESSAGE_TEXT] as string;
    }

    /**
     * @description will return information if the "project wide" message bar is on
     */
    public static isMessageBarOn(): boolean
    {
        if (EnvReader.isDemo()) {
            return true;
        }

        EnvReader.validateEnvVariableExistence(EnvReader.ENV_KEY_VITE_IS_MESSAGE_BAR_ON);
        let isMessageBarOnAsString = import.meta.env[EnvReader.ENV_KEY_VITE_IS_MESSAGE_BAR_ON] as string;
        let isMessageBarOn         = BoolTypeProcessor.boolStringToRealBool(isMessageBarOnAsString);
        return isMessageBarOn;
    }

    /**
     * @description returns the message bar type
     */
    public static messageBarType(): string
    {
        if (EnvReader.isDemo()) {
            return 'info';
        }

        EnvReader.validateEnvVariableExistence(EnvReader.ENV_KEY_VITE_MESSAGE_BAR_TYPE);
        let type = import.meta.env[EnvReader.ENV_KEY_VITE_MESSAGE_BAR_TYPE] as string;

        if (!AlertTypesEnums[type]) {
            type = "info";
        }

        return type;
    }

    /**
     * @description returns the text shown in message bar
     */
    public static messageBarText(): string
    {
        if (EnvReader.isDemo()) {
            return 'This is a demo version - some functionality is limited, or disabled.';
        }

        EnvReader.validateEnvVariableExistence(EnvReader.ENV_KEY_VITE_MESSAGE_BAR_TEXT);
        return import.meta.env[EnvReader.ENV_KEY_VITE_MESSAGE_BAR_TEXT] as string;
    }

    /**
     * @description returns the login page form prefilled login email
     */
    public static getPrefilledLoginEmail(): string {
        EnvReader.validateEnvVariableExistence(EnvReader.VITE_PREFILLED_LOGIN_CREDENTIALS_EMAIL);
        return import.meta.env[EnvReader.VITE_PREFILLED_LOGIN_CREDENTIALS_EMAIL] ?? "" as string;
    }

    /**
     * @description returns the login page form prefilled password
     */
    public static getPrefilledLoginPassword(): string {
        EnvReader.validateEnvVariableExistence(EnvReader.VITE_PREFILLED_LOGIN_CREDENTIALS_PASSWORD);
        return import.meta.env[EnvReader.VITE_PREFILLED_LOGIN_CREDENTIALS_PASSWORD] ?? "" as string;
    }

    /**
     * @description will check if given env key exists at all, if not - error is thrown
     */
    private static validateEnvVariableExistence(variableName: string): void {
        if( "undefined" === typeof import.meta.env[variableName] ){
            throw new BaseError("Env variable with given name is not defined: " + variableName)
        }
    }
}
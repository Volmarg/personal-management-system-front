import {ConfigLoaderEncryption, ConfigLoaderGeneral, ConfigLoaderJwt} from "@/scripts/Core/Types/ConfigLoader";

/**
 * @description loads the project configuration
 */
export default class ConfigLoader
{
    static readonly jwt: ConfigLoaderJwt;
    static readonly encryption: ConfigLoaderEncryption;
    static readonly general: ConfigLoaderGeneral;
}
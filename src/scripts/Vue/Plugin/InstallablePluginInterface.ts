import {App} from "@vue/runtime-core";

/**
 * @description interface marking installable Vue.js plugins
 */
export default interface InstallablePluginInterface
{
    /**
     * @description will install the plugin
     */
    install(app: App): void;
}
import {App}                      from "@vue/runtime-core";
import InstallablePluginInterface from "@/scripts/Vue/Plugin/InstallablePluginInterface";
import {BackendModuleCaller}      from "@/scripts/Core/Services/Request/BackendModuleCaller";

/**
 * @description handles installing the
 * @see BackendModuleCaller {as the plugin for Vue}
 */
export default class BackendModuleCallerPlugin implements InstallablePluginInterface
{
    /**
     * @description will install the plugin
     */
    public install(app: App): void
    {
        app.config.globalProperties.$moduleCall = new BackendModuleCaller();
    }

}
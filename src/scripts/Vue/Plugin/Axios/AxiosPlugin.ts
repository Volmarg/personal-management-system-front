import {App}                      from "@vue/runtime-core";
import AppAxios                   from "@/scripts/Core/Services/Request/AppAxios";
import InstallablePluginInterface from "@/scripts/Vue/Plugin/InstallablePluginInterface";

/**
 * @description handles installing the
 * @see AppAxios {as the plugin for Vue}
 */
export default class AxiosPlugin implements InstallablePluginInterface
{

    /**
     * @description will install the plugin
     */
    public install(app: App): void
    {
        app.config.globalProperties.$axios = new AppAxios();
    }

}
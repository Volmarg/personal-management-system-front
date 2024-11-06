import {App}                        from "@vue/runtime-core";
import InstallablePluginInterface   from "@/scripts/Vue/Plugin/InstallablePluginInterface";
import AxiosPlugin                  from "@/scripts/Vue/Plugin/Axios/AxiosPlugin";
import RootEvent                    from "@/scripts/Vue/Plugin/Events/RootEvent";
import ViewPlugin                   from "@/scripts/Vue/Plugin/View/ViewPlugin";
import BackendModuleCallerPlugin    from "@/scripts/Vue/Plugin/Backend/ModuleRest/BackendModuleCallerPlugin";

/**
 * @description handles installing all vue Plugins
 */
export default class PluginsInstaller
{
    /**
     * @description will install the plugins on app and afterwards return the app
     */
    public installPlugins(app: App): App
    {
        let plugins: Array<InstallablePluginInterface> = [
            new AxiosPlugin(),
            new RootEvent(),
            new ViewPlugin(),
            new BackendModuleCallerPlugin(),
        ];

        for(let plugin of plugins){
            app.use(plugin);
        }

        return app;
    }
}
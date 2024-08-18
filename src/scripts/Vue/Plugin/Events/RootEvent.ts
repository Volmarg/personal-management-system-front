import InstallablePluginInterface from "@/scripts/Vue/Plugin/InstallablePluginInterface";
import {App}                      from "@vue/runtime-core";
import EventDispatcherService     from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";

/**
 * @description provides logic for calling events on the root element
 * @note Vue3.x does not allow directly calling events from grandchildren to root etc,
 */
export default class RootEvent implements InstallablePluginInterface
{
    /**
     * @inheritDoc
     */
    public install(app: App): void {
        app.config.globalProperties.$rootEvent = {
            showNotification   : EventDispatcherService.emitShowNotification,
            showFullPageLoader : EventDispatcherService.emitShowFullPageLoader,
            hideFullPageLoader : EventDispatcherService.emitHideFullPageLoader,
            showBarPageLoader  : EventDispatcherService.emitShowBarPageLoader,
            hideBarPageLoader  : EventDispatcherService.emitHideBarPageLoader,
        };
    }

}
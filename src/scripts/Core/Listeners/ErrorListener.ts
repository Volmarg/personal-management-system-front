import ListenerInterface          from "@/scripts/Core/Listeners/Interfaces/ListenerInterface";
import EventDispatcherService     from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";
import {ToastTypeEnum}            from "@/scripts/Libs/ToastNotification";

/**
 * @description global error listener
 */
export default class ErrorListener implements ListenerInterface
{
    /**
     * @description start listening for the event
     */
    public startListening(): void
    {
        this.bindListener();
    }

    /**
     * @description bind the listener to the page / window etc.
     */
    private bindListener(): void
    {
        window.onerror = (message) => {
            EventDispatcherService.emitShowNotification(ToastTypeEnum.error, message);
        }
    }
}
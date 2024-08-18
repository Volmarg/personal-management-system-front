import {ToastTypeEnum}                  from "@/scripts/Libs/ToastNotification";
import EventDispatcherLoggedUserService from "@/scripts/Core/Services/Dispatcher/EventDispatcherLoggedUserService";
import EventEmitterService              from "@/scripts/Core/Services/Dispatcher/EventEmitterService";

/**
 * @description this service handles dispatching events,
 *              can be used to dispatch events in vue components and can be used to dispatch events from within TS onto the VUE elements
 *              (this is not recommended for small components etc. but can works just fine)
 *
 *              Event's cannot be emitted directly on `router-view` as this element is sometimes gone from DOM
 *              These events in here are globally available around the project
 */
export default class EventDispatcherService extends EventEmitterService
{
    static readonly EVENT_NAME_USER_INVALIDATED               = "user-invalidated";
    static readonly EVENT_NAME_SHOW_LOADER                    = "show-full-page-loader";
    static readonly EVENT_NAME_HIDE_LOADER                    = "hide-full-page-loader";
    static readonly EVENT_NAME_SHOW_BAR_LOADER                = "show-bar-loader";
    static readonly EVENT_NAME_HIDE_BAR_LOADER                = "hide-bar-loader";
    static readonly EVENT_NAME_SHOW_NOTIFICATION              = "show-notification"
    static readonly EVENT_NAME_REFRESH_USER_STORE             = "refresh-user-store"
    static readonly EVENT_NAME_SYSTEM_IS_DISABLED             = "system-is-disabled"
    static readonly TYPESCRIPT_APP_DISPATCHER_LISTENER_DOM_ID = "dispatcherListener"

    static readonly ALL_SUPPORTED_EVENTS_APP_DISPATCHER = [
        EventDispatcherService.EVENT_NAME_USER_INVALIDATED,
        EventDispatcherService.EVENT_NAME_SHOW_LOADER,
        EventDispatcherService.EVENT_NAME_HIDE_LOADER,
        EventDispatcherService.EVENT_NAME_SHOW_BAR_LOADER,
        EventDispatcherService.EVENT_NAME_HIDE_BAR_LOADER,
        EventDispatcherService.EVENT_NAME_SHOW_NOTIFICATION,
        EventDispatcherService.EVENT_NAME_SYSTEM_IS_DISABLED,
    ]

    static readonly ALL_EVENTS = [
        ...EventDispatcherService.ALL_SUPPORTED_EVENTS_APP_DISPATCHER,
        ...EventDispatcherLoggedUserService.ALL_SUPPORTED_EVENTS,
    ]

    /**
     * @description will show notification
     *
     * @param alertType         - notification type (styling of the popup depends on this)
     * @param message           - direct message to be shown
     * @param stringToTranslate - string to be translated
     * @param autoClose         - should the notification be automatically closed
     */
    public static emitShowNotification(alertType: string = ToastTypeEnum.info, message: string | null, stringToTranslate: string | null = null, autoClose = true): void
    {
        EventDispatcherService.emitEventOnElementWithId(
            EventDispatcherService.EVENT_NAME_SHOW_NOTIFICATION,
            EventDispatcherService.TYPESCRIPT_APP_DISPATCHER_LISTENER_DOM_ID,
            {
                alertType         : alertType,
                message           : message,
                stringToTranslate : stringToTranslate,
                autoClose         : autoClose,
            }
        )
    }

    /**
     * @description will show loader
     */
    public static emitShowFullPageLoader(): void
    {
        EventDispatcherService.emitEventOnElementWithId(
            EventDispatcherService.EVENT_NAME_SHOW_LOADER,
            EventDispatcherService.TYPESCRIPT_APP_DISPATCHER_LISTENER_DOM_ID
        );
    }

    /**
     * @description will show loader
     */
    public static emitHideFullPageLoader(): void
    {
        EventDispatcherService.emitEventOnElementWithId(
            EventDispatcherService.EVENT_NAME_HIDE_LOADER,
            EventDispatcherService.TYPESCRIPT_APP_DISPATCHER_LISTENER_DOM_ID
        );
    }

    /**
     * @description will show loader
     */
    public static emitShowBarPageLoader(): void
    {
        EventDispatcherService.emitEventOnElementWithId(
            EventDispatcherService.EVENT_NAME_SHOW_BAR_LOADER,
            EventDispatcherService.TYPESCRIPT_APP_DISPATCHER_LISTENER_DOM_ID
        );
    }

    /**
     * @description will show loader
     */
    public static emitHideBarPageLoader(): void
    {
        EventDispatcherService.emitEventOnElementWithId(
            EventDispatcherService.EVENT_NAME_HIDE_BAR_LOADER,
            EventDispatcherService.TYPESCRIPT_APP_DISPATCHER_LISTENER_DOM_ID
        );
    }

    /**
     * @description will send event regarding user invalidation
     */
    public static emitUserInvalidated(): void
    {
        EventDispatcherService.emitEventOnElementWithId(
            EventDispatcherService.EVENT_NAME_USER_INVALIDATED,
            EventDispatcherService.TYPESCRIPT_APP_DISPATCHER_LISTENER_DOM_ID
        );
    }

    /**
     * @description forces store to refresh user data
     */
    public static emitRefreshUserStore(): void
    {
        EventDispatcherService.emitEventOnElementWithId(
            EventDispatcherService.EVENT_NAME_REFRESH_USER_STORE,
            EventDispatcherService.TYPESCRIPT_APP_DISPATCHER_LISTENER_DOM_ID
        );
    }

    /**
     * @description will emit information that system is disabled and will update the systemStateStore
     *             that's needed because pinia cannot be used in typescript - well it can but won't share it's
     *              state with what's in vue files.
     */
    public static emitSystemDisabled(message: string): void
    {
        EventDispatcherService.emitEventOnElementWithId(
            EventDispatcherService.EVENT_NAME_SYSTEM_IS_DISABLED,
            EventDispatcherService.TYPESCRIPT_APP_DISPATCHER_LISTENER_DOM_ID,
            {
                message: message
            }
        );
    }

}
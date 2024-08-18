import EventEmitterService from "@/scripts/Core/Services/Dispatcher/EventEmitterService";

/**
 * @description this service handles dispatching events.
 *              can be used to dispatch events in vue components and can be used to dispatch events from within TS onto the VUE elements
 *              (this is not recommended for small components etc. but can works just fine)
 *
 *              Event's cannot be emitted directly on `router-view` as this element is sometimes gone from DOM
 *              These events in here are available only for logged-in users
 */
export default class EventDispatcherLoggedUserService extends EventEmitterService
{
    static readonly TYPESCRIPT_LOGGED_USER_DISPATCHER_LISTENER_DOM_ID = "loggedUserDispatcherListener"

    static readonly ALL_SUPPORTED_EVENTS = []
}
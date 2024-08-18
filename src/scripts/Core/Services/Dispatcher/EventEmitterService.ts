/**
 * @description this class handles emitting events from the EventDispatcher classes
 *              this separation was also added due to the issues where dispatcher `A` includes some
 *              static variables from dispatcher `B` yet `B` relies on methods in `A`.
 *
 *              This ends up with circular reference causing exception and `undefined` import
 */
export default class EventEmitterService
{

    /**
     * @description will dispatch the event directly on given dom element
     */
    protected static emitEventOnElementWithId(eventName: string, id: string, eventDataBag: Record<string|number, unknown> = {}): void
    {
        let event = new CustomEvent(eventName, {
            detail: eventDataBag
        });
        let targetDomElement = document.getElementById(id);

        /**
         * @description this check is necessary as the element might be not present in case of when app was not yet
         *              fully initialized
         */
        if(null !== targetDomElement){
            targetDomElement.dispatchEvent(event);
        }

    }

}
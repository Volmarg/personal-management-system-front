import UserActivityListener         from "@/scripts/Core/Listeners/UserActivityListener";
import ErrorListener                from "@/scripts/Core/Listeners/ErrorListener";
import RejectedPromiseErrorListener from "@/scripts/Core/Listeners/RejectedPromiseErrorListener";

import ListenerInterface    from "@/scripts/Core/Listeners/Interfaces/ListenerInterface";

/**
 * @description handles the event listeners logic
 */
export default class EventListenerService
{
    /**
     * @description will register all event listeners
     */
   public registerListeners(): void
    {
        let listeners = [
            new ErrorListener(),
            new RejectedPromiseErrorListener(),
            new UserActivityListener()
        ] as Array<ListenerInterface>;

        for(let listener of listeners){
            listener.startListening();
        }
    }
}
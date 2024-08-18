import ListenerInterface                  from "@/scripts/Core/Listeners/Interfaces/ListenerInterface";
import LocalStorageService                from "@/scripts/Core/Services/Storage/LocalStorageService";
import JwtService                         from "@/scripts/Core/Services/Security/JwtService";
import StringTypeProcessor                from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

/**
 * @description global listener for any user activity on page - be it click / key press etc.
 * @warning     avoid any heavy logic in here, as this is called literally for every single click and key press on page
 */
export default class UserActivityListener implements ListenerInterface
{
    private static readonly INTERVAL_SECONDS_JWT_TOKEN_REFRESH = 60;

    private jwtService: JwtService = new JwtService();

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
        let activityCallback = () => {
            this.storeUserActivityTimestamp();
        };

        window.removeEventListener('click', activityCallback);
        window.addEventListener('click', activityCallback);

        /**
         * Using on "keypress" as it's only happening when user inserts something into the form etc.
         * With that, it at least limits the listened executed logic to only "really necessary user action" performed via keystroke
         */
        window.removeEventListener('keypress', activityCallback);
        window.addEventListener('keypress', activityCallback);
    }

    /**
     * @description handles saving user's last activity timestamp in {@see LocalStorageService}
     */
    public storeUserActivityTimestamp(): void
    {
        let jwtToken                = LocalStorageService.get(LocalStorageService.AUTHENTICATION_TOKEN);
        let currentTimestamp        = new Date().getTime();
        let lastActivityTimestamp   = parseInt(LocalStorageService.get(LocalStorageService.LAST_ACTIVITY_TIMESTAMP));
        let diffSecondsBeforeClicks = (currentTimestamp - lastActivityTimestamp) / 1000;

        if (
                !StringTypeProcessor.isEmptyString(jwtToken)
            &&  !this.jwtService.isTokenExpired(jwtToken)
        ) {
            LocalStorageService.set(LocalStorageService.LAST_ACTIVITY_TIMESTAMP, new Date().getTime().toString());

            if (
                    LocalStorageService.isSet(LocalStorageService.LAST_ACTIVITY_TIMESTAMP)
                &&  (diffSecondsBeforeClicks > UserActivityListener.INTERVAL_SECONDS_JWT_TOKEN_REFRESH)
            ) {
                // todo: replace this
                // AuthenticatedUserWebsocketCallable.requestJwtToken();
            }
        }
    }
}
import LocalStorageService                  from "@/scripts/Core/Services/Storage/LocalStorageService";
import EventDispatcherService               from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";
import PromiseService                       from "@/scripts/Core/Services/Promise/PromiseService";

/**
 * @description handles the jwt token security based logic
 */
export default class JwtTokenHandler
{

    /**
     * @description invalidates the authentication token
     */
    public invalidateToken(): void {
        LocalStorageService.remove(LocalStorageService.AUTHENTICATION_TOKEN);
        LocalStorageService.remove(LocalStorageService.LAST_ACTIVITY_TIMESTAMP);
    }

    /**
     * @description will invalidate the token and redirect user
     */
    public invalidateTokenAndRedirectUser(): void
    {
        this.invalidateToken();
        EventDispatcherService.emitShowFullPageLoader()
        EventDispatcherService.emitUserInvalidated();

        /**
         * @description dirty solution to force user to login page as it's impossible to manually change
         *              view page content outside of vue component
         */
        setTimeout(() => {
            location.reload()
        }, 500);
    }

    /**
     * @description will request the websocket update and will wait for it to change by using {@see Promise}
     *              this is necessary because the websocket calls are Async ones
     */
    public static requestJwtTokenAndWaitForIt(): Promise<unknown> {
        /**
         * @description this was added because sometimes, on very rare occasions the websocket is not delivering the jwt
         *              token. This is so rare that it's not a problem that token itself is missing, rather the issue is
         *              that there are some `await` in few places waiting for the call to be done, so this would block
         *              the logic endlessly.
         *
         *              The token gets refreshed around the project a lot, so it shouldn't matter
         */
        let maxWaitTmeMs = 2000;

        let oldToken = LocalStorageService.getAuthToken();

        EventDispatcherService.emitShowFullPageLoader();
        let startTime = Date.now();
        return PromiseService.buildPeriodicallyCheckedPromise(() => {
            let currentToken = LocalStorageService.getAuthToken();
            if (oldToken !== currentToken) {
                EventDispatcherService.emitHideFullPageLoader();
                return true;
            }

            let endTime = Date.now();
            return ((endTime - startTime) >= maxWaitTmeMs);
        })
    }

}
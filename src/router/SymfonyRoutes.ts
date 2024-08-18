import EnvReader            from "@/scripts/Core/System/EnvReader";
import LocalStorageService  from "@/scripts/Core/Services/Storage/LocalStorageService";

/**
 * @description This class contains definitions of Symfony (backend) api routes
 *              there is no way to pass this via templates etc so whenever a route is being changed in the symfony
 *              it also has to be updated here.
 *
 *              This solution was added to avoid for example calling routing api, or having string hardcoded in
 *              all the places.
 */
export default class SymfonyRoutes {

    /**
     * @description login authentication (form submission)
     */
    static readonly URL_LOGIN = "/login";

    /**
     * @description will return csrf token for form submission
     */
    static readonly URL_GET_CSRF_TOKEN                = "/system/security/get-csrf-token/:tokenId";
    static readonly URL_GET_CSRF_TOKEN_PARAM_TOKEN_ID = "tokenId";

    /**
     * @description will store any kind of error data in the backend storage db
     */
    static readonly URL_INSERT_FRONTEND_ERROR_STORAGE_DATA = "/storage/insert-frontend-error-storage-data";

    /**
     * @description will register user
     */
    static readonly URL_REGISTER_USER = "/register-user";

    /**
     * @description handles requesting sending password reset link
     */
    static readonly URL_REQUEST_PASSWORD_RESET_LINK_USER = "/request-password-reset-link"

    /**
     * @description handles requesting sending user activation link
     */
    static readonly URL_REQUEST_USER_ACTIVATION_LINK = "/request-user-activation-link"

    /**
     * @description once this url is called the user will be removed.
     *              This is NOT a confirmation url rather the real url for removal.
     */
    static readonly URL_REMOVE_USER = "/remove-user/";

    /**
     * @description once this url is called the user will be activated
     *              This is NOT a confirmation url rather the real url for activation.
     */
    static readonly URL_ACTIVATE_USER             = "/activate-user/:token";
    static readonly URL_ACTIVATE_USER_PARAM_TOKEN = "token"

    /**
     * @description once this url is called the user will be activated
     *              This is NOT a confirmation url rather the real url for activation.
     */
    static readonly URL_RESET_PASSWORD_USER             = "/reset-password/:token";
    static readonly URL_RESET_PASSWORD_USER_PARAM_TOKEN = "token"

    /**
     * @description will build url for provided baseUrl(can consist of parameters in url) and parameters to be set
     *              the output url consist of no parameters in url
     *
     * @param url           - name of called url
     * @param urlParameters - array of parameters that need to be replaced in the route
     *                          if not matching parameter is found then warning log is thrown and next
     *                          parameter will be processed
     */
    public static buildUrl(url: string, urlParameters: Record<string, string|number> = {}): string
    {
        let keys                      = Object.keys(urlParameters);
        let urlWithReplacedParameters = url;
        keys.forEach( (parameter) => {

            if( !url.includes(":" + parameter) ){
                console.warn({
                    "info"      : "Provided url does not contain given parameter",
                    "parameter" : parameter,
                    "url"       : url,
                })
            }else{
                let value                 = urlParameters[parameter] as string;
                urlWithReplacedParameters = urlWithReplacedParameters.replace(":" + parameter, value);
            }

        })

        if(
                urlWithReplacedParameters.includes(":")
            &&  EnvReader.isDev()
        ){
            console.warn({
                "info"                      : "Url with replaced parameters still seems to contain some not-replaced parameters",
                "url"                       : url,
                "urlWithReplacedParameters" : urlWithReplacedParameters,
            })
        }

        /**
         * @description cannot use the statics from VueRouter, as this leads to circular reference issue
         * @see VueRouter.ROUTE_PATH_LOGIN
         */
        let xdebugExcludedStrings = [
            "/login", // Symfony throws exceptions when login page contains xdebug session key
        ]
        let returnedUrl = EnvReader.getBackendBaseUrl() + urlWithReplacedParameters;

        if(
                LocalStorageService.isSet(LocalStorageService.XDEBUG_TOKEN)
            &&  !xdebugExcludedStrings.includes(url)
        ){
            returnedUrl += "?XDEBUG_SESSION_START=" + LocalStorageService.get(LocalStorageService.XDEBUG_TOKEN);
        }

        return returnedUrl;
    }

}

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

    public static readonly PARAM_ID = "id";

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

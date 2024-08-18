import axios, {AxiosResponse} from "axios";
import { v4 as uuidv4 } from 'uuid';
import SymfonyRoutes    from "@/router/SymfonyRoutes";

import BaseApiResponse          from "@/scripts/Response/BaseApiResponse";
import CsrfTokenResponse        from "@/scripts/Response/CsrfTokenResponse";
import BaseError                from "@/scripts/Core/Error/BaseError";
import Logger                   from "@/scripts/Core/Logger";
import LocalStorageService      from "@/scripts/Core/Services/Storage/LocalStorageService";
import StringTypeProcessor      from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import {RequestMethodType}      from "@/scripts/Core/Types/Request/RequestMethodType";
import {AppAxiosInterface}      from "@/scripts/Core/Interfaces/AppAxiosInterface";
import JwtTokenHandler          from "@/scripts/Core/Security/JwtTokenHandler";
import {
    AxiosMethodCallParameters,
    AxiosPostDataBag,
    BaseApiResponsePromise
} from "@/scripts/Core/Types/Request/AxiosTypes";

import VueRouterGuards               from "@/router/VueRouterGuards";
import VueRouter                     from "@/router/VueRouter";
import EventDispatcherService        from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";
import UserController                from "@/scripts/Core/Controller/UserController";
import {systemDisabledStore}         from "@/scripts/Vue/Store/SystemDisabledState";
import BoolTypeProcessor             from "@/scripts/Core/Services/TypesProcessors/BoolTypeProcessor";

/**
 * @description this is a modified version of axios, which is used around the project to handle the ajax calls
 *
 *              Supports:
 *              - post (standard call),
 *              - get (standard call)
 *              - postCsrf (special call for backend, will obtain csrf token first before calling url)
 *
 *              The goal of such solution is to have one, common, reusable and separated logic to handle ajax calls
 *
 *              >[WARNING]<
 *                  Be careful when using `this` in context of Promise, as it becomes lost
 *                  @link https://stackoverflow.com/questions/34930771/why-is-this-undefined-inside-class-method-when-using-promises
 *              >[WARNING]<
 */
export default class AppAxios implements AppAxiosInterface
{
    /**
     * @description key that contains csrf token in normal form submission in symfony
     *              this must be synchronized with backend and both MUST be lower case
     */
    static readonly KEY_CSRF_TOKEN    = "token";
    static readonly KEY_CSRF_TOKEN_ID = "csrftokenid";
    static readonly KEY_AUTHORIZATION = "Authorization";
    static readonly KEY_CALLER        = "Caller";

    static readonly CALLER_FRONT = "Front";

    static readonly METHOD_NAME_GET  = "get";
    static readonly METHOD_NAME_POST = "post";

    static readonly HEADER_IS_SYSTEM_DISABLED      = "is-system-disabled";
    static readonly HEADER_IS_SYSTEM_SOON_DISABLED = "is-system-soon-disabled";

    /**
     * @inheritDoc
     */
    public async postWithCsrf(calledUrl: string, dataBag: AxiosPostDataBag = {}, castedDto?): BaseApiResponsePromise
    {
        return this.callWithCsrf(calledUrl, AppAxios.METHOD_NAME_POST, dataBag, castedDto);
    }

    /**
     * @inheritDoc
     */
    public async getWithCsrf(calledUrl: string, castedDto?): BaseApiResponsePromise
    {
        return this.callWithCsrf(calledUrl, AppAxios.METHOD_NAME_GET, castedDto);
    }

    /**
     * @description makes the call but first fetches the csrf for further submission
     */
    public async callWithCsrf(calledUrl: string, method: RequestMethodType, dataBag: AxiosPostDataBag = undefined, castedDto): BaseApiResponsePromise
    {
        try{
            let csrfTokenId         = uuidv4();
            let authenticationToken = LocalStorageService.get(LocalStorageService.AUTHENTICATION_TOKEN);

            /**
             * @description sends id to generate token for it
             */
            axios.defaults.headers.common[AppAxios.KEY_CSRF_TOKEN_ID] = csrfTokenId.toString();
            axios.defaults.headers.common[AppAxios.KEY_AUTHORIZATION] = `Bearer ${authenticationToken}`;

            let csrfToken             = await this.callForCsrf(csrfTokenId);
            let handlePostCallPromise = new Promise( (resolve) => {
                axios.defaults.headers.common[AppAxios.KEY_CSRF_TOKEN_ID] = csrfTokenId.toString();
                axios.defaults.headers.common[AppAxios.KEY_CALLER]        = AppAxios.CALLER_FRONT;

                axios.defaults.headers.common[AppAxios.KEY_CSRF_TOKEN] = csrfToken;
                let axiosMethodParameters: AxiosMethodCallParameters   = [];
                switch(method)
                {
                    /** @see AppAxios.get */
                    case AppAxios.METHOD_NAME_GET:
                    {
                        axiosMethodParameters = [
                            calledUrl,
                            castedDto
                        ];
                    }
                    break;

                    /** @see AppAxios.post */
                    case AppAxios.METHOD_NAME_POST:
                    {
                        axiosMethodParameters = [
                            calledUrl,
                            dataBag,
                            castedDto
                        ];
                    }
                    break

                    default:
                    {
                        let message = `Not supported method: ${method}`;

                        Logger.error(message, {});
                        throw new BaseError(message);
                    }

                }

                /**
                 * @description dynamically select axios method and passed parameters
                 */
                let calledMethod = this[method] as CallableFunction;
                return calledMethod(...axiosMethodParameters).then( (baseResponse) => {

                    if (systemDisabledStore().isDisabled) {
                        return;
                    }

                    AppAxios.handleAccessDenied(baseResponse);
                    resolve(baseResponse);
                }).catch(  (result) => {
                    let message = "Call with csrf failed";
                    Logger.error(message, {
                        result: result
                    });
                    throw new BaseError(message);
                });
            }) as BaseApiResponsePromise;

            return handlePostCallPromise;
        }catch(Exception){
            throw new BaseError(`There were issues with '${method.toUpperCase()}' request with CSRF token fetch`, Exception.message);
        }
    }

    /**
     * @inheritDoc
     */
    async getRaw(calledUrl: string): Promise<unknown> {
        let response = await axios.get(calledUrl).then((response) => {
            return response;
        })

        return response;
    }

    /**
     * @inheritDoc
     */
    public callForCsrf(csrfTokenId: string | number): Promise<string | null>
    {

        let calledUrl = SymfonyRoutes.buildUrl(SymfonyRoutes.URL_GET_CSRF_TOKEN, {
            [SymfonyRoutes.URL_GET_CSRF_TOKEN_PARAM_TOKEN_ID] : csrfTokenId,
        });

        axios.defaults.headers.common[AppAxios.KEY_CALLER] = AppAxios.CALLER_FRONT;
        let promise = axios.get(calledUrl).then( async (result ) => {

            let csrfTokenResponse = CsrfTokenResponse.fromAxiosResponse(result);
            if(!csrfTokenResponse.success){

                Logger.error("Got unsuccessful response when calling for csrf token", {
                    'csrfTokenResponse' : csrfTokenResponse
                });

                AppAxios.handleAccessDenied(csrfTokenResponse);
                throw new BaseError("There were some issues with obtaining the csrf token");
            }

            return csrfTokenResponse.csrfToken;
        }).catch(  (result) => {
            Logger.error("Error occurred while trying to fetch csrf token for postCsrf call", {
                result: result
            });
            throw new BaseError("There were some issues with obtaining the csrf token", result);
        });

        return promise;
    }

    /**
     * @inheritDoc
     */
    private async post(
        url: string,
        dataBag?: AxiosPostDataBag,
        castedDto = BaseApiResponse
    ): Promise<BaseApiResponse>
    {
        let usedDataBag: AxiosPostDataBag = dataBag;

        return axios.post(url, usedDataBag).then( async (response) => {
            let responseDto = castedDto.fromAxiosResponse(response);
            responseDto     = AppAxios.handleSystemDisabledState(responseDto, response);

            if( !StringTypeProcessor.isEmptyString(responseDto.token) ){
                LocalStorageService.set(LocalStorageService.AUTHENTICATION_TOKEN, responseDto.token);
            }

            AppAxios.handleAccessDenied(responseDto);
            return responseDto;
        } ).catch( (error) => {
            // this is required, because if user is banned then it might lead to unwanted exceptions on front
            if (!LocalStorageService.isSet(LocalStorageService.AUTHENTICATION_TOKEN)) {
                return new Promise(() => {
                    EventDispatcherService.emitHideFullPageLoader();
                });
            }

            Logger.warn("Axios `post` call failed", {
                error: error
            });
            throw new BaseError("Issue happened while performing `post` call.", error.message);
        })
    }

    /**
     * @inheritDoc
     */
    private async get(url: string, castedDto = BaseApiResponse): Promise<BaseApiResponse>
    {
        return axios.get(url).then( async (response) => {
            let responseDto = castedDto.fromAxiosResponse(response);
            responseDto     = AppAxios.handleSystemDisabledState(responseDto, response);

            if( !StringTypeProcessor.isEmptyString(responseDto.token) ){
                LocalStorageService.set(LocalStorageService.AUTHENTICATION_TOKEN, responseDto.token);
            }

            AppAxios.handleAccessDenied(responseDto);
            return responseDto;
        } ).catch( (error) => {

            // this is required, because if user is banned then it might lead to unwanted exceptions on front
            if (!LocalStorageService.isSet(LocalStorageService.AUTHENTICATION_TOKEN)) {
                return new Promise(() => {
                    EventDispatcherService.emitHideFullPageLoader();
                });
            }

            Logger.warn("Axios `get` call failed", {
                error: error
            });
            throw new BaseError("Issue happened while performing `get call.", {
                "errorDetails": error.message,
            });
        });
    }

    /**
     * @description will handle logic for `access denied` case
     *              must remain static due to loosing context of `this` in nested async calls
     */
    private static handleAccessDenied(baseApiResponse: BaseApiResponse): void
    {
        let jwtTokenHandler = new JwtTokenHandler();
        let userController = new UserController();

        if( baseApiResponse.isAccessDeniedCode() ){
            Logger.error("Access denied!", {
                baseApiResponse: baseApiResponse
            });

            /**
             * @description do not redirect on login page, instead other handler will show the backend response to user
             */
            if(
                    window[VueRouterGuards.KEY_VUE_ROUTER_TO_PATH] !== VueRouter.ROUTE_PATH_LOGIN
                &&  userController.isUserLoggedIn()
            ){
                jwtTokenHandler.invalidateTokenAndRedirectUser();
            }
        }

    }

    /**
     * @description check if response contains `disabled system` header, and if yes then update the store
     *              and log out user
     *
     * >WARNING< calling the websocket based ping after the response is received because the ping will also fetch the
     *           message necessary to show to user, it can also trigger some extra logic.
     *           The axios call is only added because websocket will not always call backend (like, not with each click etc).
     *           so sometimes it's better to fetch small information from axios response and then react to it.
     *           This also allows to reduce the code duplication.
     */
    private static handleSystemDisabledState(responseDto: BaseApiResponse, response: AxiosResponse): BaseApiResponse
    {
        responseDto.isSystemDisabled = BoolTypeProcessor.boolStringToRealBool(response.headers[AppAxios.HEADER_IS_SYSTEM_DISABLED] ?? false)
        if (responseDto.isSystemDisabled) {
            return responseDto;
        }

        responseDto.isSystemSoonDisabled = BoolTypeProcessor.boolStringToRealBool(response.headers[AppAxios.HEADER_IS_SYSTEM_SOON_DISABLED] ?? false)

        return responseDto;
    }

}

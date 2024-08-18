import axios, {AxiosResponse} from "axios";

import BaseApiResponse          from "@/scripts/Response/BaseApiResponse";
import BaseError                from "@/scripts/Core/Error/BaseError";
import Logger                   from "@/scripts/Core/Logger";
import LocalStorageService      from "@/scripts/Core/Services/Storage/LocalStorageService";
import StringTypeProcessor      from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import {AppAxiosInterface}      from "@/scripts/Core/Interfaces/AppAxiosInterface";
import JwtTokenHandler          from "@/scripts/Core/Security/JwtTokenHandler";
import {AxiosPostDataBag}       from "@/scripts/Core/Types/Request/AxiosTypes";

import VueRouterGuards               from "@/router/VueRouterGuards";
import VueRouter                     from "@/router/VueRouter";
import EventDispatcherService        from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";
import UserController                from "@/scripts/Core/Controller/UserController";
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
    static readonly HEADER_IS_SYSTEM_DISABLED      = "is-system-disabled";
    static readonly HEADER_IS_SYSTEM_SOON_DISABLED = "is-system-soon-disabled";

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
    private async post(url: string, dataBag?: AxiosPostDataBag, castedDto = BaseApiResponse): Promise<BaseApiResponse>
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
    public async get(url: string, castedDto = BaseApiResponse): Promise<BaseApiResponse>
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

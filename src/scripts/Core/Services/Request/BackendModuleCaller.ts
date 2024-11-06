import BaseApiResponse      from "@/scripts/Response/BaseApiResponse";
import {AxiosPostDataBag}   from "@/scripts/Core/Types/Request/AxiosTypes";
import AppAxios             from "@/scripts/Core/Services/Request/AppAxios";
import UrlService           from "@/scripts/Core/Services/Url/UrlService";
import SymfonyRoutes        from "@/router/SymfonyRoutes";
import TranslationsProvider from "@/scripts/Vue/Provider/TranslationsProvider";
import WindowService        from "@/scripts/Core/Services/WindowService";

import ToastNotification, {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";

/**
 * @description service used for calling the backed rest endpoint of modules, a simple wrapper
 *              of axios calls, reduces the bloat / repeating of code.
 */
export class BackendModuleCaller {

    private static readonly KEY_ALL_RECORDS = 'allRecords';
    private static readonly KEY_SINGLE_RECORD = 'singleRecord';

    /**
     * @description handles creating module record
     */
    public async new(baseUrl: string, dataBag: AxiosPostDataBag, castedDto = BaseApiResponse, parentId?: number): Promise<BaseApiResponse> {
        let successMsg = await new TranslationsProvider().getTranslation('module.action.text.recordCreated');
        let failMsg    = await new TranslationsProvider().getTranslation('module.action.text.couldNotCreateRecord');

        let calledUrl = (parentId ? (UrlService.addTrailingSlash(baseUrl) + parentId) : baseUrl);
        return await new AppAxios().post(SymfonyRoutes.buildUrl(calledUrl), dataBag, castedDto).then((response) => {
            return this.handleResponse(response, successMsg, failMsg);
        });
    }

    /**
     * @description handles updating module record
     */
    public async update(baseUrl: string,  id: number, dataBag: AxiosPostDataBag, castedDto = BaseApiResponse): Promise<BaseApiResponse> {
        let successMsg = await new TranslationsProvider().getTranslation('module.action.text.recordUpdated');
        let failMsg    = await new TranslationsProvider().getTranslation('module.action.text.recordCouldNotBeUpdated');

        return await new AppAxios().patch(SymfonyRoutes.buildUrl(UrlService.addTrailingSlash(baseUrl) + id), dataBag, castedDto).then((response) => {
            return this.handleResponse(response, successMsg, failMsg);
        });
    }

    /**
     * @description handles removing module record
     */
    public async remove(baseUrl: string, id: number): Promise<BaseApiResponse> {
        let successMsg = await new TranslationsProvider().getTranslation('module.action.text.recordHasBeenRemoved');
        let failMsg    = await new TranslationsProvider().getTranslation('module.action.text.recordCouldNotBeRemoved');

        let calledUrl = UrlService.addTrailingSlash(baseUrl) + id;
        return await new AppAxios().delete(SymfonyRoutes.buildUrl(calledUrl)).then((response) => {
            return this.handleResponse(response, successMsg, failMsg);
        });
    }

    /**
     * @description returns response which contains single module record
     */
    public async get(baseUrl: string, id: number): Promise<Record> {
        let calledUrl = SymfonyRoutes.buildUrl(UrlService.addTrailingSlash(baseUrl) + id);
        let response = await new AppAxios().get(calledUrl, BaseApiResponse);
        let singleRecord = response.data[BackendModuleCaller.KEY_SINGLE_RECORD];
        if (undefined === singleRecord) {
            throw new BaseApiResponse(`Called 'get', but the expected key is not present in response. Expected: ${BackendModuleCaller.KEY_SINGLE_RECORD}`);
        }

        return singleRecord;
    }

    /**
     * @description returns all accessible module records
     */
    public async getAll(baseUrl: string): Promise<Array> {
        let url = SymfonyRoutes.buildUrl(`${baseUrl}/all`);
        let response = await new AppAxios().get(url, BaseApiResponse);
        let allRecords = response.data[BackendModuleCaller.KEY_ALL_RECORDS];
        if (undefined === allRecords) {
            throw new BaseApiResponse(`Called 'getAll', but the expected key is not present in response. Expected: ${BackendModuleCaller.KEY_ALL_RECORDS}`);
        }

        return allRecords;
    }

    /**
     * @description handles the response before passing it further:
     *              - show the popup message
     *
     *              This logic relies on {@see WindowService.reloadHistory}, which is just reloading the page.
     *              Tried using the `$router.push`, `$router.replace` etc. but it won't reload the view if path
     *              for given url is the same. This isn't nice but don't want to spend much time trying to make it work better.
     *              Yes there is prettier solution, like emitting the event, then re-fetch data etc., but just trying
     *              to make some simple code that will cover as many cases as possible.
     *
     *              The order of used messages is proper:
     *              - show front success message because backend returns "OK" etc.
     *              - show backend fail message because it can contain validation errors etc.
     */
    private handleResponse(response: BaseApiResponse, successMessage: string | null = null, failMsg: string | null = null): void {

        let type: string;
        let msg: string;
        if (!response.success) {
            type = ToastNotification.getTypeFromCode(response.code)
            msg = (response.message ? response.message : failMsg);
        } else {
            type = ToastTypeEnum.success;
            msg = (successMessage ? successMessage : response.message);
        }

        ToastNotification.showAlert(type, msg);
        WindowService.reloadHistory();
        return response;
    }
}
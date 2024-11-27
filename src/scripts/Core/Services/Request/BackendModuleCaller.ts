import BaseApiResponse      from "@/scripts/Response/BaseApiResponse";
import AppAxios             from "@/scripts/Core/Services/Request/AppAxios";
import UrlService           from "@/scripts/Core/Services/Url/UrlService";
import SymfonyRoutes        from "@/router/SymfonyRoutes";
import TranslationsProvider from "@/scripts/Vue/Provider/TranslationsProvider";
import WindowService        from "@/scripts/Core/Services/WindowService";

import ToastNotification, {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";
import BackendModuleCallConfig            from "@/scripts/Dto/BackendModuleCallConfig";
import EventDispatcherService             from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";
import BaseError                          from "@/scripts/Core/Error/BaseError";

/**
 * @description service used for calling the backed rest endpoint of modules, a simple wrapper
 *              of axios calls, reduces the bloat / repeating of code.
 */
export class BackendModuleCaller {

    private static readonly KEY_ALL_RECORDS = 'allRecords';
    private static readonly KEY_SINGLE_RECORD = 'singleRecord';
    private static readonly KEY_IS_LOCKED = 'isLocked';

    /**
     * @description handles creating module record
     */
    public async new(config: BackendModuleCallConfig): Promise<BaseApiResponse> {
        let successMsg = await new TranslationsProvider().getTranslation('module.action.text.recordCreated');
        let failMsg    = await new TranslationsProvider().getTranslation('module.action.text.couldNotCreateRecord');

        let calledUrl = SymfonyRoutes.buildUrl((config.parentId ? (UrlService.addTrailingSlash(config.baseUrl) + config.parentId) : config.baseUrl));

        EventDispatcherService.emitShowFullPageLoader();
        return await new AppAxios().post(calledUrl, config.dataBag, config.castedDto).then((response) => {
            EventDispatcherService.emitHideFullPageLoader();
            return this.handleResponse(response, successMsg, failMsg, config.reload);
        }).catch((error) => {
            EventDispatcherService.emitHideFullPageLoader();
            throw error;
        })
    }

    /**
     * @description handles updating module record
     */
    public async update(config: BackendModuleCallConfig): Promise<BaseApiResponse> {
        let successMsg = await new TranslationsProvider().getTranslation('module.action.text.recordUpdated');
        let failMsg    = await new TranslationsProvider().getTranslation('module.action.text.recordCouldNotBeUpdated');

        let url = UrlService.addTrailingSlash(SymfonyRoutes.buildUrl(config.baseUrl)) + config.id;
        if (config.parentId) {
            url += `/${config.parentId}`;
        }

        EventDispatcherService.emitShowFullPageLoader();
        return await new AppAxios().patch(url, config.dataBag, config.castedDto).then((response) => {
            EventDispatcherService.emitHideFullPageLoader();
            return this.handleResponse(response, successMsg, failMsg, config.reload);
        }).catch((error) => {
            EventDispatcherService.emitHideFullPageLoader();
            throw error;
        });
    }

    /**
     * @description handles removing module record
     */
    public async remove(baseUrl: string, id: number, reload: boolean = true): Promise<BaseApiResponse> {
        let successMsg = await new TranslationsProvider().getTranslation('module.action.text.recordHasBeenRemoved');
        let failMsg    = await new TranslationsProvider().getTranslation('module.action.text.recordCouldNotBeRemoved');

        let calledUrl = SymfonyRoutes.buildUrl(UrlService.addTrailingSlash(baseUrl) + id);

        EventDispatcherService.emitShowFullPageLoader();
        return await new AppAxios().delete(calledUrl).then((response) => {
            EventDispatcherService.emitHideFullPageLoader();
            return this.handleResponse(response, successMsg, failMsg, reload);
        }).catch((error) => {
            EventDispatcherService.emitHideFullPageLoader();
            throw error;
        });
    }

    /**
     * @description returns response which contains single module record
     */
    public async get(baseUrl: string, id: number): Promise<Record> {
        let calledUrl = SymfonyRoutes.buildUrl(UrlService.addTrailingSlash(baseUrl) + id);

        EventDispatcherService.emitShowFullPageLoader();
        let response = await new AppAxios().get(calledUrl, BaseApiResponse).then((response) => {
            EventDispatcherService.emitHideFullPageLoader();
            return response;
        }).catch((error) => {
            EventDispatcherService.emitHideFullPageLoader();
            throw error;
        });

        let singleRecord = response.data[BackendModuleCaller.KEY_SINGLE_RECORD];
        if (undefined === singleRecord) {
            throw new BaseError(`Called 'get', but the expected key is not present in response. Expected: ${BackendModuleCaller.KEY_SINGLE_RECORD}`);
        }

        return singleRecord;
    }

    /**
     * @description Toggles the lock state on module resource / entry.
     *              Returns boolean, indicating:
     *              - true  = is locked
     *              - false = is unlocked
     */
    public async toggleLock(baseUrl: string, id: number): Promise<boolean> {
        let calledUrl = SymfonyRoutes.buildUrl(UrlService.addTrailingSlash(baseUrl) + `toggle-lock/${id}`);

        EventDispatcherService.emitShowFullPageLoader();
        let response = await new AppAxios().patch(calledUrl, BaseApiResponse).then((response) => {
            EventDispatcherService.emitHideFullPageLoader();
            return response;
        }).catch((error) => {
            EventDispatcherService.emitHideFullPageLoader();
            throw error;
        });

        let isLocked = response.data[BackendModuleCaller.KEY_IS_LOCKED];
        if (undefined === isLocked) {
            throw new BaseError(`Called 'toggleLock', but the expected key is not present in response. Expected: ${BackendModuleCaller.KEY_IS_LOCKED}`);
        }

        return isLocked;
    }

    /**
     * @description returns all accessible module records
     */
    public async getAll(baseUrl: string, id: number | null = null): Promise<Array> {
        let url = SymfonyRoutes.buildUrl(`${baseUrl}/all`);
        if (id) {
            url += `/${id}`
        }

        let response = await new AppAxios().get(url, BaseApiResponse);
        let allRecords = response.data[BackendModuleCaller.KEY_ALL_RECORDS];
        if (undefined === allRecords) {
            throw new BaseError(`Called 'getAll', but the expected key is not present in response. Expected: ${BackendModuleCaller.KEY_ALL_RECORDS}`);
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
    private handleResponse(
        response: BaseApiResponse,
        successMessage: string | null = null,
        failMsg: string | null = null,
        reload: boolean = true
    ): void {

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
        if (reload) {
            WindowService.reloadHistory();
        }

        return response;
    }
}
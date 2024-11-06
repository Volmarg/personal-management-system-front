import {
    AxiosPostDataBag,
    BaseApiResponsePromise
} from "@/scripts/Core/Types/Request/AxiosTypes";

/**
 * @description axios app plugin interface
 */
export interface AppAxiosInterface
{
    /**
     * @description makes the backend POST
     */
    post(calledUrl: string, dataBag?: AxiosPostDataBag, castedDto?): BaseApiResponsePromise;

    /**
     * @description makes the backend PATCH
     */
    patch(calledUrl: string, dataBag?: AxiosPostDataBag, castedDto?): BaseApiResponsePromise;

    /**
     * @description makes the backed GET call
     */
    get(calledUrl: string, castedDto?): BaseApiResponsePromise;

    /**
     * @description makes the backed DELETE call
     */
    delete(calledUrl: string): BaseApiResponsePromise;

    /**
     * @description makes call for data but without any dto casting, this is just plain `get` method
     */
    getRaw(calledUrl: string): Promise<unknown>;
}
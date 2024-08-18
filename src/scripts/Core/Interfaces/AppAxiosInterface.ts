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
     * @description makes the backend post call but first fetches the csrf for further submission
     */
    post(calledUrl: string, dataBag?: AxiosPostDataBag, castedDto?): BaseApiResponsePromise;

    /**
     * @description makes the backed get call but first fetches the csrf for further submission
     */
    get(calledUrl: string, castedDto?): BaseApiResponsePromise;

    /**
     * @description makes call for data but without any dto casting, csrf fetching, this is just plain `get` method
     */
    getRaw(calledUrl: string): Promise<unknown>;
}
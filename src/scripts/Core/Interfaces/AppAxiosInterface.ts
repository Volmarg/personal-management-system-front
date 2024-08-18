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
    postWithCsrf(calledUrl: string, dataBag?: AxiosPostDataBag, castedDto?): BaseApiResponsePromise;

    /**
     * @description makes the backed get call but first fetches the csrf for further submission
     */
    getWithCsrf(calledUrl: string, castedDto?): BaseApiResponsePromise;

    /**
     * @description makes backend axios call for CSRF token
     */
    callForCsrf(csrfTokenId: string | number): Promise<string | null>;

    /**
     * @description makes call for data but without any dto casting, csrf fetching, this is just plain `get` method
     */
    getRaw(calledUrl: string): Promise<unknown>;
}
import BaseApiResponse from "@/scripts/Response/BaseApiResponse";

type BaseApiResponsePromise = Promise<BaseApiResponse>

/**
 * @description extractable array of parameters need in axios base calls for post, get etc.
 */
type AxiosMethodCallParameters = Array<string | AxiosPostDataBag | null | boolean>;

type AxiosPostDataBag = Record<string, string | number | null> | undefined;

export {
    BaseApiResponsePromise, AxiosMethodCallParameters, AxiosPostDataBag
}

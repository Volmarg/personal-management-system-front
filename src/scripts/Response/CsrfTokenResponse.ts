import BaseError       from "@/scripts/Core/Error/BaseError";
import BaseApiResponse from "@/scripts/Response/BaseApiResponse";
import ErrorHandler    from "@/scripts/Response/ErrorHandler";

/**
 * @description response used to fetch the csrf token for form submission
 */
export default class CsrfTokenResponse extends BaseApiResponse
{
    private _csrfToken: string;

    get csrfToken(): string {
        return this._csrfToken;
    }

    set csrfToken(value: string) {
        this._csrfToken = value;
    }

    /**
     * @description Create CsrfTokenResponse from json
     */
    public static fromJson(json: string): CsrfTokenResponse
    {
        let apiResponse = new CsrfTokenResponse();
        apiResponse.prefillBaseFields(json);

        try{
            var object = JSON.parse(json);
        }catch(Exception){
            ErrorHandler.throwJsonParsingError('CsrfTokenResponse', Exception, json);
        }

        apiResponse.csrfToken = object.csrfToken;
        return apiResponse;
    }

    /**
     * @description build api response from axios response object
     */
    public static fromAxiosResponse(axiosResponse: unknown): CsrfTokenResponse
    {
        if(
                "object" === typeof axiosResponse
            &&  null !== axiosResponse
        ){
                let json = JSON.stringify(axiosResponse['data']);
                let apiResponse  = this.fromJson(json);
                return apiResponse;
        }

        throw new BaseError("Axios response is not an object");
    }
}
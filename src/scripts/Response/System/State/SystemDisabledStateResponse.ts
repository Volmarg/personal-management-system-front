import BaseApiResponse from "@/scripts/Response/BaseApiResponse";
import ErrorHandler    from "@/scripts/Response/ErrorHandler";

/**
 * @description return response which contain information if the system is currently disabled
 */
export default class SystemDisabledStateResponse extends BaseApiResponse
{
    private _disabled: boolean;

    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    /**
     * @description Create SystemDisabledStateResponse from json
     */
    public static fromJson(json: string): SystemDisabledStateResponse
    {
        let apiResponse = new SystemDisabledStateResponse();
        apiResponse.prefillBaseFields(json);

        try{
            var object = JSON.parse(json);
        }catch(Exception){
            ErrorHandler.throwJsonParsingError('SystemDisabledStateResponse', Exception, json);
        }

        apiResponse.disabled = object.disabled;

        return apiResponse;
    }

}


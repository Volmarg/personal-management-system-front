import BaseApiResponse from "@/scripts/Response/BaseApiResponse";
import ErrorHandler    from "@/scripts/Response/ErrorHandler";

/**
 * Response which contains information if given user regulation was accepted or not
 */
export default class IsUserRegulationAcceptedResponse extends BaseApiResponse
{
    private _accepted: boolean;

    get accepted(): boolean {
        return this._accepted;
    }

    set accepted(value: boolean) {
        this._accepted = value;
    }

    /**
     * @description Create IsUserRegulationAcceptedResponse from json
     */
    public static fromJson(json: string): IsUserRegulationAcceptedResponse
    {
        let apiResponse = new IsUserRegulationAcceptedResponse();
        apiResponse.prefillBaseFields(json);

        try {
            var object = JSON.parse(json);
        } catch (Exception) {
            ErrorHandler.throwJsonParsingError('IsUserRegulationAcceptedResponse', Exception, json);
        }

        apiResponse.accepted = object.accepted;

        return apiResponse;
    }

}

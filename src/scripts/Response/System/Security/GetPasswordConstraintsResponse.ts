import BaseApiResponse from "@/scripts/Response/BaseApiResponse";
import ErrorHandler    from "@/scripts/Response/ErrorHandler";

/**
 * @description return response which contain the password constraints
 */
export default class GetPasswordConstraintsResponse extends BaseApiResponse
{
    private _constraints: boolean;

    get constraints(): boolean {
        return this._constraints;
    }

    set constraints(value: boolean) {
        this._constraints = value;
    }

    /**
     * @description Create GetPasswordConstraintsResponse from json
     */
    public static fromJson(json: string): GetPasswordConstraintsResponse
    {
        let response = new GetPasswordConstraintsResponse();
        response.prefillBaseFields(json);

        try{
            var object = JSON.parse(json);
        }catch(Exception){
            ErrorHandler.throwJsonParsingError('GetPasswordConstraintsResponse', Exception, json);
        }

        response.constraints = object.constraints;

        return response;
    }

}


import BaseApiResponse from "@/scripts/Response/BaseApiResponse";
import ErrorHandler    from "@/scripts/Response/ErrorHandler";

/**
 * @description return response which contains the jwt token used explicitly for accessing the public folder data
 */
export default class GetPublicFolderAccessTokenResponse extends BaseApiResponse
{
    private _publicFolderAccessToken: string;

    get publicFolderAccessToken(): string {
        return this._publicFolderAccessToken;
    }

    set publicFolderAccessToken(value: string) {
        this._publicFolderAccessToken = value;
    }

    /**
     * @description Create GetPublicFolderAccessTokenResponse from json
     */
    public static fromJson(json: string): GetPublicFolderAccessTokenResponse
    {
        let apiResponse = new GetPublicFolderAccessTokenResponse();
        apiResponse.prefillBaseFields(json);

        try{
            var object = JSON.parse(json);
        }catch(Exception){
            ErrorHandler.throwJsonParsingError('GetPublicFolderAccessTokenResponse', Exception, json);
        }

        apiResponse.publicFolderAccessToken = object.publicFolderAccessToken;

        return apiResponse;
    }

}


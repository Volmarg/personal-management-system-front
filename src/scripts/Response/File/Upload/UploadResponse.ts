import BaseApiResponse from "@/scripts/Response/BaseApiResponse";
import ErrorHandler    from "@/scripts/Response/ErrorHandler";

/**
 * Response containing information about the file upload
 */
export default class UploadResponse extends BaseApiResponse
{
    private _status: string;
    private _publicPath: string;
    private _localFileName: string;
    private _uploadId: string | null;

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get publicPath(): string {
        return this._publicPath;
    }

    set publicPath(value: string) {
        this._publicPath = value;
    }

    get localFileName(): string {
        return this._localFileName;
    }

    set localFileName(value: string) {
        this._localFileName = value;
    }

    get uploadId(): string | null {
        return this._uploadId;
    }

    set uploadId(value: string | null) {
        this._uploadId = value;
    }

    /**
     * @description Create UploadResponse from json
     */
    public static fromJson(json: string): UploadResponse
    {
        let apiResponse = new UploadResponse();
        apiResponse.prefillBaseFields(json);

        try{
            var object = JSON.parse(json);
        }catch(Exception){
            ErrorHandler.throwJsonParsingError('UploadResponse', Exception, json);
        }

        apiResponse.status        = object.status;
        apiResponse.publicPath    = object.publicPath;
        apiResponse.localFileName = object.localFileName;
        apiResponse.uploadId      = object.uploadId;
        return apiResponse;
    }

}
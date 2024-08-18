import BaseApiResponse from "@/scripts/Response/BaseApiResponse";
import ErrorHandler    from "@/scripts/Response/ErrorHandler";
import UploadedFileDTO from "@/scripts/Dto/File/UploadedFileDTO";

/**
 * Contains list of user uploaded cv files
 */
export default class GetUserCvList extends BaseApiResponse
{
    private _filesData: Array<UploadedFileDTO> = [];

    get filesData(): Array<UploadedFileDTO> {
        return this._filesData;
    }

    set filesData(value: Array<UploadedFileDTO>) {
        this._filesData = value;
    }

    /**
     * @description Create GetUserCvList from json
     */
    public static fromJson(json: string): GetUserCvList
    {
        let apiResponse = new GetUserCvList();
        apiResponse.prefillBaseFields(json);

        try{
            var object = JSON.parse(json);
        }catch(Exception){
            ErrorHandler.throwJsonParsingError('GetUserCvList', Exception, json);
        }

        for (let uploadedFileObject of object.cvListData) {
            let uploadConfiguration = new UploadedFileDTO();
            uploadConfiguration.id            = uploadedFileObject.id;
            uploadConfiguration.userBasedName = uploadedFileObject.userBasedName;
            uploadConfiguration.originalName  = uploadedFileObject.originalName;
            uploadConfiguration.publicPath    = uploadedFileObject.publicPath;
            uploadConfiguration.localFileName = uploadedFileObject.localFileName;

            apiResponse._filesData.push(uploadConfiguration);
        }

        return apiResponse;
    }

}
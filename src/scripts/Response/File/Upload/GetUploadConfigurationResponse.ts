import BaseApiResponse        from "@/scripts/Response/BaseApiResponse";
import ErrorHandler           from "@/scripts/Response/ErrorHandler";
import UploadConfigurationDTO from "@/scripts/Dto/File/UploadConfigurationDTO";

/**
 * Response containing information about upload configuration
 */
export default class GetUploadConfigurationResponse extends BaseApiResponse
{
    private _configuration: UploadConfigurationDTO;

    get configuration(): UploadConfigurationDTO{
        return this._configuration;
    }
    set configuration(value: UploadConfigurationDTO) {
        this._configuration = value;
    }

    /**
     * @description Create GetUploadConfigurationResponse from json
     */
    public static fromJson(json: string): GetUploadConfigurationResponse
    {
        let apiResponse = new GetUploadConfigurationResponse();
        apiResponse.prefillBaseFields(json);

        try{
            var object = JSON.parse(json);
        }catch(Exception){
            ErrorHandler.throwJsonParsingError('GetUploadConfigurationResponse', Exception, json);
        }

        let uploadConfiguration = new UploadConfigurationDTO();
        uploadConfiguration.isMultiUpload             = object.configuration.multiUpload;
        uploadConfiguration.allowedExtensions         = object.configuration.allowedExtensions;
        uploadConfiguration.allowedMimeTypes          = object.configuration.allowedMimeTypes;
        uploadConfiguration.fileNameValidationRegexps = object.configuration.fileNameValidationRegexps;
        uploadConfiguration.identifier                = object.configuration.identifier;
        uploadConfiguration.maxFileSizeMb             = object.configuration.maxFileSizeMb;
        uploadConfiguration.allowNaming               = object.configuration.allowNaming;

        apiResponse._configuration = uploadConfiguration;
        return apiResponse;
    }

}
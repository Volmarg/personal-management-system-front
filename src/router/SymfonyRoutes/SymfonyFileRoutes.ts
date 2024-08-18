/**
 * @description Contains logic related to File routes
 */
export default class SymfonyFileRoutes
{
    /**
     * @description Handles file upload
     */
    static readonly UPLOAD_FILES = "/upload/";

    /**
     * @description returns the upload configuration rules
     */
    static readonly GET_UPLOAD_CONFIGURATION          = "/upload/get-configuration/:id"
    static readonly GET_UPLOAD_CONFIGURATION_PARAM_ID = "id";

}
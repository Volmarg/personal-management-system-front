import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains logic related to File routes
 */
export default class SymfonyFileRoutes extends SymfonyRoutes {
    /**
     * @description Handles file upload
     */
    static readonly UPLOAD_FILES = "/upload/send/";

    /**
     * @description returns url used for getting public files - this way user is validated before accessing the data
     */
    static readonly GET_FILE = '/public/get-file/:path'
    static readonly GET_FILE_PARAM_PATH = "path";

    /**
     * @description returns the upload configuration rules
     */
    static readonly GET_UPLOAD_CONFIGURATION          = "/upload/get-configuration/:id"
    static readonly GET_UPLOAD_CONFIGURATION_PARAM_ID = "id";

}
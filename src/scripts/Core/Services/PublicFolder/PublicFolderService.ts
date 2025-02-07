import SymfonyFileRoutes from "@/router/SymfonyRoutes/SymfonyFileRoutes";

/**
 * @description handles logic related to public folder data access
 */
export default class PublicFolderService {

    /**
     * @description creates url for getting the file under public path
     */
    public static buildUrl(filePath: string): string
    {
        // linux
        if (filePath.startsWith("/")) {
            filePath = filePath.replace("/", "")
        }

        // theoretically windows
        if (filePath.startsWith("\\")) {
            filePath = filePath.replace("\\", "")
        }

        return SymfonyFileRoutes.buildUrl(SymfonyFileRoutes.GET_FILE, {
            [SymfonyFileRoutes.GET_FILE_PARAM_PATH]: filePath
        });
    }

}
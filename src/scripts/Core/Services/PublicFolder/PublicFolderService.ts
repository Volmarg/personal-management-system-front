import SymfonyFileRoutes   from "@/router/SymfonyRoutes/SymfonyFileRoutes";
import LocalStorageService from "@/scripts/Core/Services/Storage/LocalStorageService";
import UrlService          from "@/scripts/Core/Services/Url/UrlService";

/**
 * @description handles logic related to public folder data access
 */
export default class PublicFolderService {

    /**
     * @description creates url for getting the file under public path
     */
    public static buildUrl(filePath: string, withAuthToken: boolean = true): string
    {
        // turns out someone decided to pass in full url for whatever reason
        if (UrlService.isUrl(filePath)) {
            return filePath;
        }

        // linux
        if (filePath.startsWith("/")) {
            filePath = filePath.replace("/", "")
        }

        // theoretically windows
        if (filePath.startsWith("\\")) {
            filePath = filePath.replace("\\", "")
        }

        if (withAuthToken) {
            filePath += `?${LocalStorageService.AUTHENTICATION_TOKEN}=${LocalStorageService.getAuthToken()}`;
        }

        return SymfonyFileRoutes.buildUrl(SymfonyFileRoutes.GET_FILE, {
            [SymfonyFileRoutes.GET_FILE_PARAM_PATH]: filePath
        });
    }

}
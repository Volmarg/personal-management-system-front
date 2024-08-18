import LocalStorageService from "@/scripts/Core/Services/Storage/LocalStorageService";

/**
 * @description handles logic related to public folder data access
 */
export default class PublicFolderService {

    private static readonly TOKEN = "token";

    /**
     * @description Will add the jwt token to the public file path, these require the token to be present in query because the files
     *              such should be handled natively by browser, otherwise would make the ajax calls and then handle a bunch of rules,
     *              like for example saving binary file etc.
     */
    public static buildPathWithToken(filePath: string): string
    {
        return `${filePath}?${PublicFolderService.TOKEN}=${LocalStorageService.get(LocalStorageService.PUBLIC_FOLDER_AUTHENTICATION_TOKEN)}`;
    }

}
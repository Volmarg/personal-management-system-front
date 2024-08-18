/**
 * @description Contains logic related to System routes
 */
export default class SymfonySystemRoutes
{
    /**
     * @description will return special jwt token which can be used explicitly for accessing public folder data, nothing else
     */
    static readonly GET_PUBLIC_FOLDER_ACCESS_TOKEN = "/system/access-token/get-for-public-folder";

    /**
     * @description will return response that contains array of current password constraints
     */
    static readonly GET_PASSWORD_CONSTRAINTS = "/system/get-password-constraints";

    /**
     * @description converts the html into pdf and returns base64 of the pdf content,
     *              this solution relies on "wkhtmltopdf",
     */
    static readonly HTML_TO_PDF_PAGES = "/system-file/converter/html-to-pdf-pages";

    /**
     * @description converts the html into pdf and returns base64 of the pdf content,
     *              this solution relies on "html to image" conversion and imagick (image -> pdf),
     */
    static readonly HTML_TO_SINGLE_PDF = "/system-file/converter/html-to-single-pdf";

}
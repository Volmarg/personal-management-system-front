import UniqidService from "@/scripts/Core/Services/Generator/UniqidService";

/**
 * @description handles downloading base64 content as files etc.
 */
export default class Base64DownloadService {

    /**
     * @description force download the base64 content
     */
    public static downloadPdfFile(
        base64string : string,
        fileName     : string | null = null,
        extension    : string | null = null,
        mimeType     : string | null = null,
        charsetEncoding = '',
        encodeUri = false
    ): void {
        if (!mimeType) {
            mimeType = "application/pdf";
        }

        if (!extension) {
            extension = "pdf";
        }

        if (!fileName) {
            fileName = UniqidService.generate();
        }

        if (charsetEncoding) {
            charsetEncoding = `charset=${charsetEncoding},`;
        }

        let usedFileName   = `${fileName}.${extension}`;
        let linkSource     = `data:${mimeType};${charsetEncoding}${base64string}`;
        const downloadLink = document.createElement("a");

        if (encodeUri) {
            linkSource = encodeURI(linkSource);
        }

        downloadLink.href     = linkSource;
        downloadLink.download = usedFileName;
        downloadLink.click();
    }
}

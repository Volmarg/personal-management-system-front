export default class FileService {
    private static readonly IMAGE_EXTENSIONS = [
        "jpg", "jpeg", "jfif", "pjpeg", "pjp", "png", "gif", "svg", "webp",
        "bmp", "tif", "tiff", "ico", "cur", "apng", "avif", "heic", "heif",
        "svgz", "psd", "ai", "eps", "indd", "raw", "arw", "cr2", "nrw",
        "k25", "dib", "jpe", "jxr", "hdp", "wdp", "jng", "mng", "pcx",
        "tga", "jp2", "j2k", "jpf", "jpx", "jpm", "mj2"
    ];

    /**
     * @description check if this is an image extension
     */
    public static isImageExtension(extension: string): boolean {
        return FileService.IMAGE_EXTENSIONS.includes(extension);
    }
}
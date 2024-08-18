import BrowserDetection       from "@/scripts/Core/Services/View/BrowserDetection";
import EventDispatcherService from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";

/**
 * @description handles variety of methods for downloading / allowing download of pdf in form of base64
 */
export default class Base64PdfDownloadService {

    /**
     * @description this does not cause download but will open new tab with preview and user can click there
     *              "download" or "print" (that's native for most of the browsers if not all),
     */
    public static openDownloadableNewWindow(base64String: string, zoom: number = 100): void {
        let pdfWindow = window.open("")

        // It doesn't necessarily mean that it's popups issues, had the problem on firefox only
        if (!pdfWindow) {
            EventDispatcherService.emitShowNotification('info', null, 'messages.permission.popup');
            return;
        }

        //@ts-ignore
        pdfWindow.document.write(
            "<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(base64String) + "#zoom=" + zoom + "%'></iframe>"
        )

        // the stop logic cannot be used on mobile, else content won't load at all, yet the tab stops loading properly without the "stop"
        if (BrowserDetection.isMobileBrowser()) {
            return;
        }

        setTimeout(function () {
            //@ts-ignore - solves endless page loading issue, without it the loading of tab takes forever
            pdfWindow.stop()
        }, 1000);
    }
}
import BaseError from "@/scripts/Core/Error/BaseError";

import {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";

import EventDispatcherService from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";

export default class ClipboardService
{
    /**
     * @description copies to clipboard. Using solution with insert / copy from DOM, because navigator requires
     *              the page to run on SSL.
     */
    public static async copyToClipboard(dataToCopy: string): Promise<void> {
        let textarea: HTMLTextAreaElement | undefined = document.getElementById('clipboardDataHolder');
        if (!textarea) {
            throw new BaseError("#clipboardDataHolder does not exist!");
        }

        this.copyFromTextArea(dataToCopy, textarea);
        textarea.textContent = '';

        EventDispatcherService.emitShowNotification(ToastTypeEnum.info, null, 'generic.text.copiedToClipboard');
    }

    /**
     * @description copies the provided content into the textarea and then into clipboard.
     *
     *              Element must be visible for copy to work, thus making it visible for a tiny moment before copy is executed,
     *              and then hiding it back.
     *
     *              Already tried using this solution for cleaning up the clipboard after X seconds, but it didn't work
     *              when I was doing something in the dev-console, so I assume the same is valid when user is away from page.
     */
    private static copyFromTextArea(content: string, textarea: HTMLTextAreaElement): void {
        textarea.textContent = content;
        textarea.classList.remove('hidden');
        textarea.select();
        document.execCommand("copy");
        textarea.classList.add('hidden');
    }
}
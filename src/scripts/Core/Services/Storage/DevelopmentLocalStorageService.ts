import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import LocalStorageService from "@/scripts/Core/Services/Storage/LocalStorageService";

/**
 * Same as {@see LocalStorageService} but development related things
 */
export default class DevelopmentLocalStorageService {
    /**
     * @description check if the developer footer bar is pinned or not
     */
    static readonly IS_DEVELOPER_FOOTER_BAR_PINNED = "isDeveloperFooterBarPinned";

    /**
     * @description check if developer footer bar is visible or not
     */
    public static isDeveloperFooterBarPinned(): boolean {
        let visibilityState = LocalStorageService.get(DevelopmentLocalStorageService.IS_DEVELOPER_FOOTER_BAR_PINNED);
        if (StringTypeProcessor.isEmptyString(visibilityState)) {
            return false;
        }

        let isVisible = (visibilityState === "1");

        return isVisible;
    }

}

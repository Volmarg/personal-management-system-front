import InstallablePluginInterface from "@/scripts/Vue/Plugin/InstallablePluginInterface";
import {App}                      from "@vue/runtime-core";
import BaseError                  from "@/scripts/Core/Error/BaseError";

/**
 * @description provides logic for view manipulation
 */
export default class ViewPlugin implements InstallablePluginInterface
{
    /**
     * @inheritDoc
     */
    public install(app: App): void {
        app.config.globalProperties.$view = {
            scrollToElement        : this.scrollToElement,
            scrollContentOfElement : this.scrollContentOfElement,
        };
    }

    /**
     * @description will scroll the window to the element
     */
    private scrollToElement(domElement: HTMLElement | undefined | null): void {
        if (undefined == domElement) {
            throw new BaseError("Tried to scroll to non existing domElement");
        }
        window.scrollTo({top: domElement.offsetTop, behavior: 'smooth'});
    }

    /**
     * @description will scroll inside the scroll-able dom element
     *              [WARNING] It has to be EXACTLY the element that has the scroll-y, not parent wrapper etc.!
     */
    private scrollContentOfElement(scrollTarget: HTMLElement | undefined | null | Window, offsetFromTop: number = 0, behavior: ScrollBehavior = "smooth"): void {
        let scrollOptions = {top: offsetFromTop, behavior: behavior};
        if (undefined == scrollTarget) {
            throw new BaseError("Tried to scroll content of non existing target");
        }

        if (scrollTarget instanceof Window) {
            window.scrollTo(scrollOptions);
            return;
        }


        scrollTarget.scroll(scrollOptions);
    }

}


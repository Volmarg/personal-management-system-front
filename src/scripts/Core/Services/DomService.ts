import WindowService from "@/scripts/Core/Services/WindowService";

/**
 * @description provides dom related logic
 */
export default class DomService {

    /**
     * @description will go to target section
     */
    public static goToSection(clickedElement: HTMLElement | null, scrollOffset = 0): void {
        if (!clickedElement) {
            throw Error("Clicked element does not exist?!");
        }

        if (!clickedElement.hasAttribute('data-target-selector')) {
            throw Error("This element has no data-target-selector defined");
        }

        let targetSelector = clickedElement.getAttribute('data-target-selector') as string;
        let targetElement = document.querySelector(targetSelector) as HTMLElement | null;
        if (!targetElement) {
            new Error("No element was found for selector: " + targetSelector)
        }

        WindowService.scrollTo(targetSelector, scrollOffset)
    }

}
import EventDispatcherService from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";

/**
 * @description provides variety of window related logic
 */
export default class WindowService {

    /**
     * @description scrolls window to the top
     */
    public static scrollToTop(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    /**
     * @description check if window is scrolled behind certain amount of pixels
     */
    public static isScrolledBehindPx(px: number): boolean {
        return (window.scrollY >= px);
    }

    /**
     * @description will scroll to target selector, and includes the y offset
     */
    public static scrollTo(selector, yOffset = 0) {
        const targetElement = document.querySelector(selector);
        if (!targetElement) {
            throw new Error("No element was found for selector: " + selector)
        }

        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({top: y, behavior: 'smooth'});
    }

    /**
     * @description equivalent of $router.go
     *              Added page loader + timeout to make it look better + to give some time for reading
     *              the popup message.
     *
     * @link https://stackoverflow.com/questions/41301099/do-we-have-router-reload-in-vue-router
     */
    public static reloadHistory(waitTimeMs: number = 500): void {
        EventDispatcherService.emitShowFullPageLoader();
        setTimeout(() => {
            history.go();
        }, waitTimeMs)
    }
}
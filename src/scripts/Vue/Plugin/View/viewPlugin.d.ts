import '@vue/runtime-core';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        readonly $view: ViewPluginType
    }
}

type ViewPluginType = {
    scrollToElement        : (domElement: HTMLElement | undefined | null) => void;
    scrollContentOfElement : (scrollTarget: HTMLElement | undefined | null | Window, offsetFromTop: number, behavior: ScrollBehavior = "smooth") => void;
}

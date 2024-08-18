import '@vue/runtime-core';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        readonly $rootEvent: RootEventMethodsType
    }
}

type RootEventMethodsType = {
    showNotification   : (alertType: string, message: string | null = null, stringToTranslate: string | null = null, autoClose = true) => void;
    showFullPageLoader : () => void;
    hideFullPageLoader : () => void;
    showBarPageLoader  : () => void;
    hideBarPageLoader  : () => void;
}

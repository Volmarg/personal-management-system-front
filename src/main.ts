/**
 * @description vue main initialization file
 */

/**
 * @description this small block solves the problem with Vite not being able to resolve the `global` during build process
 *              It MUST always be first, even before imports
 * @link https://stackoverflow.com/a/73208485/9668115
 */
window.global ||= window;

import { createApp }   from 'vue'
import App             from './App.vue'
import { createPinia } from 'pinia'

import VueClickAway from "vue3-click-away";

import VueRouter                  from "@/router/VueRouter";
import TranslationsProvider       from "@/scripts/Vue/Provider/TranslationsProvider";
import EventListenerService       from "@/scripts/Core/Services/EventListenerService";
import PluginsInstaller           from "@/scripts/Vue/Plugin/PluginsInstaller";
import BootLoader                 from "@/scripts/BootLoader";
import BaseError                  from "@/scripts/Core/Error/BaseError";
import SessionStorageService      from "@/scripts/Core/Services/Storage/SessionStorageService";
import BuildService               from "@/scripts/Core/BuildService";

import EnvReader                 from "@/scripts/Core/System/EnvReader";
import Logger                    from "@/scripts/Core/Logger";
import Tippy                     from "@/scripts/Vue/Plugin/Libs/Tippy";
import UnicodeArrow              from "@/components/Ui/Icons/UnicodeArrow.vue";
import FontawesomeComponent      from "@/components/Libs/Fontawesome.vue";
import LineAwesomeComponent      from "@/components/Ui/Icons/LineAwesome.vue";
import TransitionedComponent     from "@/components/Global/TransitionedComponent.vue";

const pinia = createPinia();

import VueLoadingOverlay from "vue-loading-overlay";
import './assets/tailwind.css'

import Vue3Tour from 'vue3-tour'
import 'vue3-tour/dist/vue3-tour.css'

import VueGtag from "vue-gtag";

let eventListenerService = new EventListenerService();
let translationsProvider = new TranslationsProvider();
let pluginsInstaller     = new PluginsInstaller();
let bootLoader           = new BootLoader();

startApplication().catch(result => {
    let message = "Could not start the application";
    Logger.error(message, result);
    throw new BaseError(message);
});

/**
 * @description will start the application - wrapped into standalone function
 *              to provide the "await" to perform booting and loading any necessary services
 */
async function startApplication(): Promise<void> {

    /**
     * @description at this moment app can live without sockets in case these fail
     *              thus not breaking whole app when sockets will crash
     *              this must be called before booting as otherwise sockets won't be registered
     *              - reason: unknown
     *
     *              However any further socket calls can be only done after booting since
     *              booting is loading configurations etc.
     */
    SessionStorageService.setActiveTabId();
    BuildService.registerGlobals()

    await bootLoader.boot();
    let vueI18nInstance = await translationsProvider.buildVueI18nInstance();

    let vueApp = createApp(App);
    let router = (new VueRouter).getPreconfiguredRouter();

    vueApp = pluginsInstaller.installPlugins(vueApp);

    eventListenerService.registerListeners();

    vueApp.use(router)
        .use(vueI18nInstance)
        .use(VueLoadingOverlay)
        .use(VueClickAway)
        .use(Vue3Tour)
        .use(pinia)
        .use(Tippy.getTippyPlugin(), Tippy.getTippyVueConfiguration())
        .component('fa', FontawesomeComponent)
        .component('la', LineAwesomeComponent)
        .component('ua', UnicodeArrow)
        .component('transitioned-component', TransitionedComponent);

        if (!EnvReader.isDev()) {
            vueApp.use(VueGtag, {
                config: {id: "tag-value-here"}
            })
        }

        vueApp.mount('#app');
}
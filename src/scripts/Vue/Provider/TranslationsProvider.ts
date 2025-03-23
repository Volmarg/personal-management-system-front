import {createI18n, I18n}  from "vue-i18n";
import EnvReader           from "@/scripts/Core/System/EnvReader";

/**
 * @description will handle the translations loading / providing
 */
export default class TranslationsProvider
{
    /**
     * @description fallback message in case of something being wrong with translations handling
     */
    static readonly FALLBACK_SAFETY_MESSAGE = "Internal server error";

    /**
     * @description will build and return the VueI18n instance which is then being mounted into the vue
     *              to use the translations globally
     */
    public buildVueI18nInstance(): Promise<I18n<Record<string, unknown>>>
    {
        let handledLanguage = EnvReader.getAppDefaultLanguage();

        let vueI18n  = createI18n({
            fallbackLocale : handledLanguage,
        });

        return this.loadTranslationsForLanguage(handledLanguage, vueI18n);
    }

    /**
     * @description will set translations messages for the VueI18n
     */
    private async loadTranslationsForLanguage(handledLanguage: string, vueI18n: I18n<Record<string, unknown>>): Promise<I18n<Record<string, unknown>>>
    {
        /**
         * - adding so many `**` in path to support possibility that structure will become deeper,
         * - globEager must have hardcoded path, cannot use variables here, this is needed due Vite limitation
         *   of dynamic import
         */
        let modules   = import.meta.globEager('/src/translations/**/**/**/**/**/**/*.json');
        let fileNames = Object.keys(modules);
        for(let fileName of fileNames){
            let module = modules[fileName];
            vueI18n.global.mergeLocaleMessage(handledLanguage, module.default);
        }

        return vueI18n;
    }

}
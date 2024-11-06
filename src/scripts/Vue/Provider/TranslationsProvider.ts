import {createI18n, I18n}  from "vue-i18n";
import EnvReader           from "@/scripts/Core/System/EnvReader";
import TypeChecker         from "@/scripts/Core/Services/Types/TypeChecker";

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
     * @description this method exists explicitly for getting the translations directly in typescript.
     *              Suspecting that this logic might have heavy performance impact.
     */
    public async getTranslation(key: string): Promise<string> {
        let searchedElements = key.split('.');
        let translator = await this.buildVueI18nInstance();
        let allMessages = translator.global.messages[EnvReader.getAppDefaultLanguage()];

        let treeMatch = [];
        let isTreeSet = false;
        for (let element of searchedElements) {
            if (treeMatch.length === 0) {
                if (isTreeSet) {
                    return key;
                }

                treeMatch = allMessages[element]
                isTreeSet = true;
                continue;
            }

            treeMatch = treeMatch[element]
            if (!treeMatch) {
                return key;
            }

            if (TypeChecker.isString(treeMatch)) {
                return treeMatch;
            }

            if (TypeChecker.isScalar(treeMatch)) {
                return key;
            }
        }

        return key;
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
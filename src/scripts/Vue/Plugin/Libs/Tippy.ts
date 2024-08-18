import VueTippy                 from 'vue-tippy'
import {ComponentPluginOptions} from "@/scripts/Vue/Types/Components/types";
import BrowserDetection         from "@/scripts/Core/Services/View/BrowserDetection";

/**
 * @description this class will handle the popups when hovering over the elements
 * @example of hwo to use the tippy
     <template>
        <button v-tippy="{ content: 'Hi!' }">Tippy!</button>
        <button v-tippy="'Hello!'">Tippy!</button>
     </template>
 *
 * @link @link https://vue-tippy.netlify.app/
 *
 * @description changing tippy popup theme
 *
 *  - go to assets/scss and search for tippy stylesheet,
 *  - import desired theme file in it like that `@import '~tippy.js/themes/translucent.css'`
 *  - change the theme in `getTippyVueConfiguration`
 *
 * @link https://vue-tippy.netlify.app/themes
 */
export default class Tippy
{

    /**
     * @description will return configured plugin, ready to be use within vue app
     */
    public static getTippyPlugin(): typeof VueTippy
    {
        return VueTippy;
    }

    /**
     * @description will return default plugin configuration that can be used in vue
     */
    public static getTippyVueConfiguration(): ComponentPluginOptions
    {
        return {
            directive: 'tippy',
            component: 'tippy',
            defaultProps: {
                placement : 'auto-end',
                theme     : "light-border",
                allowHTML : true,
                /**
                 *  Disables activating tippy on touch event on mobile device, else the popups are shown almost everywhere,
                 *  Example of active touch is: "QuestionMarkAbout" component
                 */
                touch: false,
            },
        }
    }
}
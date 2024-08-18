import "@vue/runtime-core";
import {AppAxiosInterface} from "@/scripts/Core/Interfaces/AppAxiosInterface";

/**
 * @description extend Vue with axios property so that vue knows that $axios property exists for it when calling this.$axios
 *              - this is only a definition, the property itself must be provided separately
 */
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        readonly $axios: AppAxiosInterface;
    }
}

import "@vue/runtime-core";
import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

/**
 * @description extend Vue with logic that helps with calls to modules
 */
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        readonly $moduleCall: BackendModuleCaller;
    }
}


/**
 * @description defines the store for "illnesses" of health module
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";
import SymfonyHealthRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyHealthRoutes";

const IllnessStore = defineStore('healthIllnessStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the illnesses
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyHealthRoutes.HEALTH_ILLNESS_BASE_URL);
        },
    }
});

export {IllnessStore};
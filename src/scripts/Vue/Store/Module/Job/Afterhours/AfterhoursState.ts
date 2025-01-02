/**
 * @description defines the store for job afterhours
 */
import {defineStore} from 'pinia'

import SymfonyJobRoutes from "@/router/SymfonyRoutes/Modules/SymfonyJobRoutes";

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

const AfterhoursState = defineStore('jobAfterhoursState', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the afterhours
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyJobRoutes.AFTERHOURS_BASE_URL);
        },
    }
});

export {AfterhoursState};
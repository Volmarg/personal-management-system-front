/**
 * @description defines the store for job holidays pools
 */
import {defineStore} from 'pinia'

import SymfonyJobRoutes from "@/router/SymfonyRoutes/Modules/SymfonyJobRoutes";

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

const PoolsState = defineStore('jobHolidaysPoolsState', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the holidays pools
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyJobRoutes.HOLIDAYS_POOL_BASE_URL);
        },
    }
});

export {PoolsState};
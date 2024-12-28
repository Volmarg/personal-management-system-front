/**
 * @description defines the store for spent job holidays
 */
import {defineStore} from 'pinia'

import SymfonyJobRoutes from "@/router/SymfonyRoutes/Modules/SymfonyJobRoutes";

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

const DaysSpentState = defineStore('jobHolidaysDaysSpentState', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the spent job holidays
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyJobRoutes.HOLIDAYS_SPENT_BASE_URL);
        },
    }
});

export {DaysSpentState};
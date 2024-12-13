/**
 * @description defines the store for system finances settings - currencies part
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonySystemRoutes from "@/router/SymfonyRoutes/Modules/SymfonySystemRoutes";

const FinancesCurrenciesState = defineStore('financesCurrenciesState', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the defined currencies
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonySystemRoutes.SETTINGS_FINANCES_BASE_URL);
        },
    }
});

export {FinancesCurrenciesState};
/**
 * @description defines the store for payments settings - currency multiplier part
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

const CurrencyMultiplierState = defineStore('paymentsSettingsCurrencyMultiplierStateState', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the products data
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyPaymentsRoutes.SETTINGS_CURRENCY_MULTIPLIER_BASE_URL);
        },
    }
});

export {CurrencyMultiplierState};
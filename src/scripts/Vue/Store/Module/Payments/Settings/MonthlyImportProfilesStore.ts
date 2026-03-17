/**
 * @description defines the store for payments settings - monthly import profiles
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

const MonthlyImportProfilesStore = defineStore('monthlyImportProfilesStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the data
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyPaymentsRoutes.SETTINGS_PAYMENT_MONTHLY_IMPORT_PROFILES);
        },
    }
});

export {MonthlyImportProfilesStore};
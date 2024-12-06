/**
 * @description defines the store for payments settings - recurring payment part
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

const RecurringPaymentState = defineStore('paymentsSettingsRecurringPaymentState', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the products data
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyPaymentsRoutes.SETTINGS_RECURRING_PAYMENT_BASE_URL);
        },
    }
});

export {RecurringPaymentState};
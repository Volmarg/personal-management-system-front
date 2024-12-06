/**
 * @description defines the store for payments settings - types part
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

const PaymentTypesState = defineStore('paymentsSettingsTypeState', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the products data
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyPaymentsRoutes.SETTINGS_PAYMENT_TYPE_BASE_URL);
        },
    }
});

export {PaymentTypesState};
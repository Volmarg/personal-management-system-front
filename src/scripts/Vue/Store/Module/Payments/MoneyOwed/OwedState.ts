/**
 * @description defines the store for payments money owed module
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

const OwedState = defineStore('paymentMoneyOwedState', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the data
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyPaymentsRoutes.MONEY_OWED_BASE_URL);
        },
    }
});

export {OwedState};
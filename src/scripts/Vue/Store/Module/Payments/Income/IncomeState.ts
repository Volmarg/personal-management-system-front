/**
 * @description defines the store for payment income module
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

const IncomeState = defineStore('paymentIncomeState', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the incomes data
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyPaymentsRoutes.INCOMES_BASE_URL);
        },
    }
});

export {IncomeState};
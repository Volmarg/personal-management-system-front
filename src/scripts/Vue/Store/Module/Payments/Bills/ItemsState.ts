/**
 * @description defines the store for payment bills module
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

const ItemsState = defineStore('paymentBillsItemsState', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the products data
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyPaymentsRoutes.BILLS_ITEMS_BASE_URL);
        },
    }
});

export {ItemsState};
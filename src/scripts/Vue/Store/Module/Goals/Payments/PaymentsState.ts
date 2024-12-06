/**
 * @description defines the store for goal payments module
 */
import {defineStore} from 'pinia'

import SymfonyGoalsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyGoalsRoutes";

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

const PaymentsState = defineStore('goalPaymentsState', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the goal payments
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyGoalsRoutes.GOAL_PAYMENTS_BASE_URL);
        },
    }
});

export {PaymentsState};
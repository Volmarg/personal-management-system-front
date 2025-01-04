/**
 * @description defines the store for shopping plans module
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyShoppingRoutes from "@/router/SymfonyRoutes/Modules/SymfonyShoppingRoutes";

const ShoppingPlansStore = defineStore('shoppingPlansStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the shopping plans
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyShoppingRoutes.PLANS_BASE_URL);
        },
    }
});

export {ShoppingPlansStore};
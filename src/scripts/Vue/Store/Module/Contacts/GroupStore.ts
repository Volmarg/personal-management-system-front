/**
 * @description defines the store for contacts groups
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyContactsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyContactsRoutes";

const GroupStore = defineStore('contactsGroupStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the contact groups
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyContactsRoutes.GROUPS_BASE_URL);
        },
    }
});

export {GroupStore};
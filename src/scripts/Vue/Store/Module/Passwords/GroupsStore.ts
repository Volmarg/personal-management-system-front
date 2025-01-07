/**
 * @description defines the store for passwords module
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyPasswordsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPasswordsRoutes";

const GroupsStore = defineStore('passwordsGroupsStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the password groups
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyPasswordsRoutes.PASSWORDS_GROUPS_BASE_URL);
        },
    }
});

export {GroupsStore};
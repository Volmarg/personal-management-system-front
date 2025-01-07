/**
 * @description defines the store for passwords module
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyPasswordsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPasswordsRoutes";

const PasswordsStore = defineStore('passwordsStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the passwords
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyPasswordsRoutes.PASSWORDS_BASE_URL);
        },
    }
});

export {PasswordsStore};
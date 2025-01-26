/**
 * @description defines the store for contacts
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyContactsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyContactsRoutes";

const ContactsStore = defineStore('contactsStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the contacts
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyContactsRoutes.CONTACTS_BASE_URL);
        },
    }
});

export {ContactsStore};
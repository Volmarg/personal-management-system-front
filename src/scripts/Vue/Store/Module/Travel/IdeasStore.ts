/**
 * @description defines the store for travel ideas
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyTravelsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyTravelsRoutes";

const TravelIdeasStore = defineStore('travelIdeasStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the travel ideas
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyTravelsRoutes.IDEAS_BASE_URL);
        },
    }
});

export {TravelIdeasStore};
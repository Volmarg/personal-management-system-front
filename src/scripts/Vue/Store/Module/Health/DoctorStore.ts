
/**
 * @description defines the store for "doctors" of health module
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";
import SymfonyHealthRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyHealthRoutes";

const DoctorStore = defineStore('healthDoctorStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the doctors data
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyHealthRoutes.HEALTH_DOCTOR_BASE_URL);
        },
    }
});

export {DoctorStore};
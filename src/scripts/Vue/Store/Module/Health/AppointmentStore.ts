
/**
 * @description defines the store for "doctors appointments" of health module
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";
import SymfonyHealthRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyHealthRoutes";

const DoctorAppointmentStore = defineStore('healthDoctorAppointmentStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the doctors appointments data
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyHealthRoutes.HEALTH_DOCTOR_APPOINTMENT_BASE_URL);
        },
    }
});

export {DoctorAppointmentStore};
/**
 * @description defines the store for calendars module
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyCalendarRoutes from "@/router/SymfonyRoutes/Modules/SymfonyCalendarRoutes";

const CalendarStore = defineStore('calendarStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the calendars
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyCalendarRoutes.CALENDAR_MANAGE_BASE_URL);
        },
    }
});

export {CalendarStore};
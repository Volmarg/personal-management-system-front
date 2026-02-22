/**
 * @description defines the store for navigation (sidebar etc.)
 */
import {defineStore} from 'pinia'

const navigationStore = defineStore('navigationStore', {
    state: () => ({
        isSidebarCollapsed: false,
    }),
});

type NavigationStore = {
    isSidebarCollapsed: boolean,
}

export {navigationStore, NavigationStore};
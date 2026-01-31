/**
 * @description this is a special store for handling all the storage modules states when necessary
 *              In 99% of cases the {@see StorageState} should be used, but for cases where information
 *              about all storage modules is needed this store should be used (like for example dirs trees structures).
 */
import {defineStore}         from 'pinia'
import SymfonyStorageRoutes  from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";
import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

const StorageModulesStates = defineStore('storageModulesStates', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description returns all modules dirs structures
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyStorageRoutes.FOLDER_BASE_URL);
        },
    }
});

export {StorageModulesStates};
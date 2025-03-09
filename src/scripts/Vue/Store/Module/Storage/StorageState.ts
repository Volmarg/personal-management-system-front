/**
 * @description defines the store for storage module
 */
import {defineStore}         from 'pinia'
import SymfonyStorageRoutes  from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";
import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import BaseError from "@/scripts/Core/Error/BaseError";

enum StorageTypeEnum {
    "files",
    "videos",
    "images"
}

const StorageState = defineStore('storageModuleState', {
    state: () => ({
        activeNodeData: {},
        selectedFilesData: [],
        allEntries: [],
        moduleName: null,
        uploadConfigId: null,
    }),
    actions: {
        /**
         * @description returns the given storage folder structure
         */
        async getAll(): Promise<void> {
            if (!this.moduleName) {
                throw new BaseError("moduleName is not set!")
            }

            this.allEntries = await new BackendModuleCaller().getAll(SymfonyStorageRoutes.FOLDER_BASE_URL, this.moduleName);
        },
        /**
         * @description clears the selected files
         */
        async clearSelectedFiles(): void {
            this.selectedFilesData = [];
        },
        /**
         * @description add file to selection list
         */
        async selectFile(fileData: Record): void {
            this.selectedFilesData.push(fileData);
        },
        /**
         * @description remove file from  selection list
         */
        async deselectFile(fileData: Record): void {
            let filteredSelection = [];
            for (let file of this.selectedFilesData) {
                if (JSON.stringify(file) === JSON.stringify(fileData)) {
                    continue;
                }

                filteredSelection.push(file);
            }

            this.selectedFilesData = filteredSelection;
        },
    }
});

export {StorageState, StorageTypeEnum};
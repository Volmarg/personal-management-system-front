/**
 * @description defines the store for storage module
 */
import {defineStore}           from 'pinia'
import SymfonyStorageRoutes    from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";
import {BackendModuleCaller}   from "@/scripts/Core/Services/Request/BackendModuleCaller";
import {BackendModuleNameEnum} from "@/scripts/Core/Enum/Modules";

import BaseError from "@/scripts/Core/Error/BaseError";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

enum StorageTypeEnum {
    "files",
    "videos",
    "images"
}

const StorageState = defineStore('storageModuleState', {
    state: () => ({
        openTreeNodes: [],
        activeNodeData: {},
        selectedFilesData: [],
        allEntries: [],
        moduleName: null,
        uploadConfigId: null,
    }),
    actions: {
        /**
         * @description clears the open tree nodes array
         */
        clearOpenTreeNodes(): void {
          this.openTreeNodes = [];
        },
        /**
         * @description will check if given tree node is open
         */
        isTreeNodeOpen(dirPath: string | undefined | null): boolean {
            if (StringTypeProcessor.isEmptyString(dirPath)) {
                throw new BaseError("Provided string is empty!")
            }

            return this.openTreeNodes.includes(dirPath);
        },
        /**
         * @description add given path to the list of open tree nodes
         */
        addOpenTreeNode(dirPath: string | undefined | null): void {
            if (StringTypeProcessor.isEmptyString(dirPath)) {
                throw new BaseError("Provided string is empty!")
            }

            if (!this.openTreeNodes.includes(dirPath)) {
                this.openTreeNodes.push(dirPath);
            }
        },
        /**
         * @description remove given path from list of open tree nodes
         */
        removeOpenTreeNode(dirPath: string | undefined | null): void {
            if (StringTypeProcessor.isEmptyString(dirPath)) {
                throw new BaseError("Provided string is empty!")
            }

            if (!this.openTreeNodes.includes(dirPath)) {
                return;
            }

            let index = this.openTreeNodes.findIndex((element) => element === dirPath);
            delete this.openTreeNodes[index];
            this.openTreeNodes = this.openTreeNodes.filter(Boolean);
        },
        /**
         * @description if module name is set: returns the given storage folder structure, otherwise: returns all modules dirs structures
         */
        async getAll(): Promise<void> {
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

/**
 * @description gets the module name for a storage type
 */
let storageTypeToModuleName = (storageType: string): BackendModuleNameEnum => {
    switch (storageType) {
        case StorageTypeEnum[StorageTypeEnum.files]:
            return BackendModuleNameEnum.files;
        case StorageTypeEnum[StorageTypeEnum.videos]:
            return BackendModuleNameEnum.videos;
        case StorageTypeEnum[StorageTypeEnum.images]:
            return BackendModuleNameEnum.images;
        default:
            throw new BaseError(`Unsupported storage type: ${storageType}`);
    }
}

export {StorageState, StorageTypeEnum, storageTypeToModuleName};
/**
 * @description defines the store for storage module
 */
import {defineStore} from 'pinia'

const storageModuleState = defineStore('storageModuleState', {
    state: () => ({
        activeNodeData: {},
        selectedFilesData: []
    }),
    actions: {
        /**
         * @description clears the selected files
         */
        async clearSelectedFiles(): void {
            this.selectedFilesData = [];
        },
        /**
         * @description add file to selection list
         */
        async addSelectedFiles(fileData: Record): void {
            this.selectedFilesData.push(fileData);
        },
        /**
         * @description add file to selection list
         */
        async removeSelectedFile(fileData: Record): void {
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

export {storageModuleState};
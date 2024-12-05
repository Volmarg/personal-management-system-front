/**
 * @description defines the store for todo module
 */
import {defineStore} from 'pinia'

import SymfonyTodoRoutes from "@/router/SymfonyRoutes/Modules/SymfonyTodoRoutes";
import BaseApiResponse   from "@/scripts/Response/BaseApiResponse";

import AppAxios from "@/scripts/Core/Services/Request/AppAxios";

const TodoState = defineStore('todoModuleState', {
    state: () => ({
        modulesWithRecordsData: null,
    }),
    actions: {
        /**
         * @description fetches the modules with records data and saves them to state for reuse
         */
        async fetchModulesWithRecordsData(includedIds: Array<number> = []): Promise<void> {
            let url = SymfonyTodoRoutes.buildUrl(SymfonyTodoRoutes.GET_RELATION_ENTRIES);
            await new AppAxios().post(url, {includedIds}, BaseApiResponse).then((response: BaseApiResponse) => {
                this.modulesWithRecordsData = response.data?.allRecords?.modules ?? [];
            })
        },
    }
});

export {TodoState};
/**
 * @description defines the store common logic / data shared between multiple modules
 */
import {defineStore} from 'pinia'

import SymfonyCommonModuleRoutes from "@/router/SymfonyRoutes/SymfonyCommonModuleRoutes";
import {BackendModuleCaller}     from "@/scripts/Core/Services/Request/BackendModuleCaller";

import BaseError from "@/scripts/Core/Error/BaseError";

const moduleCommonState = defineStore('moduleCommonState', {
    state: () => ({
        allRelationModules: [],
    }),
    actions: {
        /**
         * @description fetches the modules with records data and saves them to state for reuse
         */
        async fetchAllRelationModules(): Promise<void> {
            this.allRelationModules = await new BackendModuleCaller().getAll(SymfonyCommonModuleRoutes.RELATION_BASE_URL);
        },
        /**
         * @description returns the relation module id for module name
         */
        async getRelationModuleId(moduleName: string): Promise<number> {
            if(Object.keys(this.allRelationModules).length === 0){
                await this.fetchAllRelationModules();
            }

            let match = this.allRelationModules.find((element: Record) => element.name === moduleName);
            if (!match) {
                throw new BaseError(`Could not get module id for module named: ${moduleName}`);
            }

            return new Promise((resolve) => {
                resolve(match.id);
            })
        }
    }
});

export {moduleCommonState};
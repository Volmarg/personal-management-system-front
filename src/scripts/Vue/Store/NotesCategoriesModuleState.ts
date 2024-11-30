/**
 * @description defines the store for notes module
 */
import {defineStore} from 'pinia'

import Logger    from "@/scripts/Core/Logger";
import BaseError from "@/scripts/Core/Error/BaseError";

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyNotesRoutes from "@/router/SymfonyRoutes/Modules/SymfonyNotesRoutes";

const notesCategoriesModuleStateStore = defineStore('notesCategoriesModuleStateStore', {
    state: () => ({
        allEntries: [],
    }),
    actions: {
        /**
         * @description fetches all the goal payments
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyNotesRoutes.NOTES_CATEGORIES_BASE_URL);
        },
        /**
         * @description returns data for given category id, or throws exception if no category for this id was found
         */
        findCategory(id: number): Record<string, string> {
            let category = this.allEntries.find((category) => category.id == id);
            if (!category) {
                throw new BaseError(`No category found for id: ${id}`);
            }

            return category;
        },
        /**
         * @description this is probably going to be one of the ugliest part of this project, nested menu with
         *              parent-child structure is always an issue. Tried to make approach here of first sorting
         *              everything out, and the going one by one, packing each child into their parent.
         *
         *              Sorting is very important with this approach as it allows skipping recursive walk,
         *              and just goes category-after category.
         *
         *              Once everything is handled, the "moved" categories are removed from main trees since these
         *              are now present in parents.
         */
        getNestedCategories(): Array {
            // sorting out first to make it easier to create nested group
            let nestedStructure = [...this.allEntries];
            nestedStructure.sort((prevCategory, nextCategory) => {
                let prevParentId = prevCategory.parentId ?? 0;
                let nextParentId = nextCategory.parentId ?? 0;

                return (prevParentId - nextParentId);
            });

            for (let idx in nestedStructure) {
                let handledCategory = nestedStructure[idx];

                // no parent - don't move, this will be root category
                if (!handledCategory.parentId) {
                    continue;
                }

                // find index of parent category for currently iterated category
                let parentCatIdx = nestedStructure.findIndex((nestedCat) => nestedCat.id === handledCategory.parentId);

                /**
                 * @description can happen when child category got parent category deleted. Can't do anything here.
                 */
                if (-1 === parentCatIdx) {
                    continue;
                }

                let parentCategory = nestedStructure[parentCatIdx];
                if (!parentCategory.children) {
                    parentCategory.children = [];
                }

                handledCategory.isMovedToParent = true;
                if (parentCategory.children.find((child: Record) => child.id === handledCategory.id)) {
                    continue;
                }

                parentCategory.children.push(handledCategory);
            }

            // now go over the tree, and remove categories moved from root
            for (let idx in nestedStructure) {
                let category = nestedStructure[idx];
                if (category.isMovedToParent) {
                    delete nestedStructure[idx];
                }
            }

            return nestedStructure.filter(Boolean);
        },
        /**
         * @description doing it the easy way (probably not the most efficient). Taking the category parentId,
         *              checking if parent exists, then for parents of parents, until root is reached.
         *              Incrementing level all the time.
         */
        getCategoryNestingLevel(parentId: number, nestingLevel: number | null = null): number {
            if (null === nestingLevel) {
                nestingLevel = 0;
            }

            let parentCategory = this.getParentCategory(parentId);
            if (parentCategory) {
                nestingLevel++;
                nestingLevel = this.getCategoryNestingLevel(parentCategory.parentId, nestingLevel)
            }

            return nestingLevel;
        },
        /**
         * @description returns parent category if such exists for given parentId, if not then null is returned
         */
        getParentCategory(parentId: number): Record<string, any> | null {
            return this.allEntries.find((category) => category.id == parentId) ?? null
        }
    }
});

export {notesCategoriesModuleStateStore};
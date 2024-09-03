/**
 * @description defines the store for notes module
 */
import {defineStore} from 'pinia'

import Logger    from "@/scripts/Core/Logger";
import BaseError from "@/scripts/Core/Error/BaseError";

const notesModuleStateStore = defineStore('notesModuleState', {
    state: () => ({
        categories: [
            {
                id: 1,
                name: 'Icecream',
                parentId: 4,
            },
            {
                id: 2,
                name: 'Cars',
                parentId: null,
            },
            {
                id: 3,
                name: 'Sport cars',
                parentId: 2,
            },
            {
                id: 4,
                name: 'Cold-sweets',
                parentId: 6,
            },
            {
                id: 5,
                name: 'Recipies',
                parentId: null,
            },
            {
                id: 6,
                name: 'Sweets',
                parentId: 5,
            },
            {
                id: 7,
                name: 'Veggie',
                parentId: 1,
            }
        ]
    }),
    actions: {
        /**
         * @description pulls the array of categories from backend
         */
        async refreshCategories(): Promise<void> {
            // todo
        },
        /**
         * @description returns data for given category id, or throws exception if no category for this id was found
         */
        findCategory(id: number): Record<string, string> {
            let category = this.categories.find((category) => category.id == id);
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
            let nestedStructure = [...this.categories];
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
                 * @description this should not happen, but let's print an error and let user use the navigation in its current form,
                 *              else it can't be fixed with gui. Exception would mean = GUI dies.
                 */
                if (-1 === parentCatIdx) {
                    Logger.error(`There is a category with parent id which does not exist! Category name: ${handledCategory.name}`);
                    continue;
                }

                let parentCategory = nestedStructure[parentCatIdx];
                if (!parentCategory.children) {
                    parentCategory.children = [];
                }

                handledCategory.isMovedToParent = true;
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
        }
    }
});

export {notesModuleStateStore};
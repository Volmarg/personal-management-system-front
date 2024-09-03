/**
 * @description defines the store for the open page
 */
import {defineStore} from 'pinia'

const pageStateStore = defineStore('pageState', {
    state: () => ({
        pageTitlePostfix: ''
    }),
});

export {pageStateStore};
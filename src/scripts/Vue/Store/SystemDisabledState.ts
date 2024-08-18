/**
 * @description defines the store for system disabling
 */
import {defineStore} from 'pinia'

const systemDisabledStore = defineStore('systemDisabledState', {
    state: () => ({
        isDisabled: false,
        isSoonDisabled: false,
        message: "",
        soonDisabledMessage: "",
    }),
});

type SystemDisabledState = {
    isDisabled: boolean,
    isSoonDisabled: boolean,
    message: string,
    soonDisabledMessage: string,
    checkIsDisabled: () => Promise<void>,
}

export {systemDisabledStore, SystemDisabledState};
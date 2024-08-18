/**
 * @description defines the store for user state (data)
 */
import {defineStore} from 'pinia'

import {UserData}          from "@/scripts/Core/Types/UserData";
import UserController      from "@/scripts/Core/Controller/UserController";
import LocalStorageService from "@/scripts/Core/Services/Storage/LocalStorageService";
import PromiseService      from "@/scripts/Core/Services/Promise/PromiseService";

const userStateStore = defineStore('userState', {
    state: () => ({
        user: null as null | UserData,
    }),
    actions: {
        /**
         * @description check if user is logged in
         */
        isLoggedIn(): boolean {
            return (new UserController()).isUserLoggedIn();
        },
        /**
         * @description refreshes user data from the jwt token once the jwt token changes,
         *              - relies on {@see PromiseService} because even tho this method is called it's unknown when
         *                backend will actually send the token since it's async due to websocket
         */
        async refreshUserData(): Promise<void> {
            let currentJwt = LocalStorageService.get(LocalStorageService.AUTHENTICATION_TOKEN);
            await PromiseService.buildPeriodicallyCheckedPromise(() => {
                if (currentJwt !== LocalStorageService.get(LocalStorageService.AUTHENTICATION_TOKEN)) {
                    this.user = new UserController().getLoggedInUserData();
                    return true;
                }

                return false;
            })
        },
        /**
         * @description loads the user data from jwt token
         */
        loadUserData(): void {
            this.user = new UserController().getLoggedInUserData();
        }
    }
});

type UserStateStore = {
    user: UserData,
    refreshUserData: () => void,
    loadUserData: () => void,
    isLoggedIn: () => boolean,
}

export {userStateStore, UserStateStore};
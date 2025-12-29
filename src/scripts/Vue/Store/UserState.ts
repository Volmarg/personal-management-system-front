/**
 * @description defines the store for user state (data)
 */
import {defineStore} from 'pinia'

import {UserData}          from "@/scripts/Core/Types/UserData";
import UserController      from "@/scripts/Core/Controller/UserController";
import AppAxios            from "@/scripts/Core/Services/Request/AppAxios";

import SymfonySecurityRoutes from "@/router/SymfonyRoutes/SymfonySecurityRoutes";

const userStateStore = defineStore('userState', {
    state: () => ({
        user: null as null | UserData,
        token: null as null | string,
    }),
    actions: {
        /**
         * @description check if user is logged in
         */
        isLoggedIn(): boolean {
            return (new UserController()).isUserLoggedIn();
        },
        /**
         * @description fetches new jwt token and loads updated user data into store,
         */
        async refreshUserData(): Promise<void> {
            await new AppAxios().get(SymfonySecurityRoutes.buildUrl(SymfonySecurityRoutes.URL_REFRESH_TOKEN));
            this.loadUserData();
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
    token: null | string,
    refreshUserData: () => void,
    loadUserData: () => void,
    isLoggedIn: () => boolean,
}

export {userStateStore, UserStateStore};
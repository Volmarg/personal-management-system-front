import LocalStorageService from "@/scripts/Core/Services/Storage/LocalStorageService";
import JwtService          from "@/scripts/Core/Services/Security/JwtService";

import {UserData}   from "@/scripts/Core/Types/UserData";
import BaseError    from "@/scripts/Core/Error/BaseError";
import Logger       from "@/scripts/Core/Logger";
import UserRoles    from "@/scripts/Core/Security/UserRoles";

import DevelopmentLocalStorageService from "@/scripts/Core/Services/Storage/DevelopmentLocalStorageService";

/**
 * @description this class contains logic related to controlling user page access
 */
export default class UserController
{
    private jwtService = new JwtService();

    /**
     * @description will return information if user is logged in or not
     */
    public isUserLoggedIn(): boolean
    {
        return LocalStorageService.isSet(LocalStorageService.AUTHENTICATION_TOKEN);
    }

    /**
     * Returns the data of logged in user or null if not logged in
     */
    public getLoggedInUserData(): UserData
    {
        if( !LocalStorageService.isSet(LocalStorageService.AUTHENTICATION_TOKEN) ){
            let message = "Could not obtain logged in user data";
            Logger.error(message);
            throw new BaseError(message);
        }

        let payload        = this.jwtService.decodeUsingSignature(LocalStorageService.get(LocalStorageService.AUTHENTICATION_TOKEN));
        let username       = payload?.username;
        let email          = payload?.email;
        let userId         = payload?.userId;
        let isSystemLocked = payload?.isSystemLocked;

        if(undefined === email){
            throw new BaseError("Could not obtain email from jwt payload")
        }

        if(undefined === username){
            throw new BaseError("Could not obtain username from jwt payload")
        }

        if(undefined === userId){
            throw new BaseError("Could not obtain userId from jwt payload")
        }

        if(undefined === isSystemLocked){
            throw new BaseError("Could not obtain isSystemLocked from jwt payload")
        }

        this.initDeveloperUserSystemSettings();

        return {
            username           : username,
            nickname           : payload?.nickname,
            email              : email,
            userId             : userId,
            isSystemLocked     : isSystemLocked,
            profilePicturePath : payload.profilePicturePath,
        };
    }

    /**
     * @description will check if user has role granted
     */
    public isRoleGranted(requiredRoleName:string): boolean
    {
        if( !LocalStorageService.isSet(LocalStorageService.AUTHENTICATION_TOKEN) ){
            return false;
        }

        let jwtService = new JwtService();
        let jwt        = LocalStorageService.get(LocalStorageService.AUTHENTICATION_TOKEN);
        let payload    = jwtService.decodeUsingSignature(jwt);

        if(
                null !== payload
            &&  payload.roles.includes(requiredRoleName)
        ){
            return true;
        }

        return false;
    }

    /**
     * @description check if user right is granted
     */
    public isRightGranted(rightName: string): boolean {
        if (!LocalStorageService.isSet(LocalStorageService.AUTHENTICATION_TOKEN)) {
            return false;
        }

        let jwtService = new JwtService();
        let jwt        = LocalStorageService.get(LocalStorageService.AUTHENTICATION_TOKEN);
        let payload    = jwtService.decodeUsingSignature(jwt);

        return (null !== payload && payload.userRights.includes(rightName));
    }

    /**
     * @description will check if user is marked as active
     */
    public isUserActive(): boolean
    {
        if( !LocalStorageService.isSet(LocalStorageService.AUTHENTICATION_TOKEN) ){
            return false;
        }

        let jwtService = new JwtService();
        let jwt        = LocalStorageService.get(LocalStorageService.AUTHENTICATION_TOKEN);
        let payload    = jwtService.decodeUsingSignature(jwt);

        if(
                null !== payload
            &&  Boolean(payload.isUserActive)
        ){
            return true;
        }

        return false;
    }

    /**
     * @description will check if user is developer
     */
    public isDeveloper(): boolean {
        return this.isRoleGranted(UserRoles.ROLE_DEVELOPER);
    }

    /**
     * @description will set some initial system configurations for user
     */
    private initDeveloperUserSystemSettings(): void {
        if (!this.isDeveloper()) {
            return;
        }

        if (!LocalStorageService.isSet(DevelopmentLocalStorageService.IS_DEVELOPER_FOOTER_BAR_PINNED, true)) {
            LocalStorageService.set(DevelopmentLocalStorageService.IS_DEVELOPER_FOOTER_BAR_PINNED, "1");
        }
    }
}

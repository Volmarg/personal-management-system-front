import {Account} from "@/scripts/Core/Types/Account";

export type UserData = {
    username           : string,
    email              : string,
    userId             : string,
    firstname          : string,
    lastname           : string,
    zip                : string,
    street             : string,
    city               : string,
    countryCode        : string,
    homeNumber         : string,
    profilePicturePath : string | null,
    points             : number,
    pendingPoints      : number,
    isUserActive       : boolean,
    account            : Account
}
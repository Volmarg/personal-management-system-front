export type UserData = {
    username           : string,
    nickname           : string | null,
    email              : string,
    isSystemLocked     : boolean,
    userId             : string,
    profilePicturePath : string | null
    roles              : Array<string>,
    rights             : Array<string>,
}
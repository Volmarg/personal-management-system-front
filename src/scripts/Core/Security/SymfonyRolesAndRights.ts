/**
 * @description this class contains the symfony based roles / rights (these are provided in the jwt tokens)
 */
export default class SymfonyRolesAndRights {
    public static readonly ROLE_ADMIN     :string = "ROLE_ADMIN";
    public static readonly ROLE_USER      :string = "ROLE_USER";
    public static readonly ROLE_DEVELOPER :string = "ROLE_DEVELOPER";
    public static readonly ROLE_DEBUGGER  :string = "ROLE_DEBUGGER";

    public static readonly RIGHT_PUBLIC_FOLDER_ACCESS :string = "RIGHT_PUBLIC_FOLDER_ACCESS";
}
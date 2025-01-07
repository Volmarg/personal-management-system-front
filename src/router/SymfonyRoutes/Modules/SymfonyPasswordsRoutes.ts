import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the passwords module
 */
export default class SymfonyPasswordsRoutes extends SymfonyRoutes
{
    public static readonly PASSWORDS_BASE_URL = "/module/passwords";
    public static readonly PASSWORDS_GROUPS_BASE_URL = "/module/passwords/settings/group";
}
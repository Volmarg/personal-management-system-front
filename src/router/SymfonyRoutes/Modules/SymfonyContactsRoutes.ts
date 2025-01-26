import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the contacts module
 */
export default class SymfonyContactsRoutes extends SymfonyRoutes
{
    //settings
    public static readonly GROUPS_BASE_URL = "/module/contacts/group";
    public static readonly TYPES_BASE_URL = "/module/contacts/type";

    // contacts
    public static readonly CONTACTS_BASE_URL = "/module/contacts";
    public static readonly CONTACT_TYPES_BASE_URL = "/module/contact/types";
}
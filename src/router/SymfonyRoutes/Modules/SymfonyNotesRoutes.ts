import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the notes module
 */
export default class SymfonyNotesRoutes extends SymfonyRoutes
{
    public static readonly NOTES_CATEGORIES_BASE_URL = "/module/my-notes-categories";
    public static readonly NOTES_BASE_URL = "/module/my-notes";
}
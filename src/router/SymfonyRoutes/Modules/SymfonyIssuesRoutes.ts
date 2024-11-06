import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the issues module
 */
export default class SymfonyIssuesRoutes extends SymfonyRoutes
{
    public static readonly ISSUE_PROGRESS_BASE_URL = "/module/my-issues/progress";
    public static readonly ISSUE_CONTACT_BASE_URL = "/module/my-issues/contact";
    public static readonly ISSUE_BASE_URL = "/module/my-issues";
}
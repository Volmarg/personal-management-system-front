import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the goals module
 */
export default class SymfonyGoalsRoutes extends SymfonyRoutes
{
    public static readonly GOALS_BASE_URL = "/module/my-goals";
    public static readonly GOAL_PAYMENTS_BASE_URL = "/module/my-goals-payments";
}
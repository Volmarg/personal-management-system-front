import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the job module
 */
export default class SymfonyJobRoutes extends SymfonyRoutes
{
    public static readonly SETTINGS_HOLIDAYS_POOL_BASE_URL = "/module/job/settings/holidays/pool";
    public static readonly HOLIDAYS_SPENT_BASE_URL = "/module/job/holidays/days-spent";
    public static readonly AFTERHOURS_BASE_URL = "/module/job/afterhours";
}
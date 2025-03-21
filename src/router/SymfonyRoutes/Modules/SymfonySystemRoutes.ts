import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to system module
 */
export default class SymfonySystemRoutes extends SymfonyRoutes {

    private static readonly SETTINGS_FINANCES_BASE = "/module/system/settings/finances"
    public static readonly SETTINGS_FINANCES_BASE_URL = SymfonySystemRoutes.SETTINGS_FINANCES_BASE + "/currencies";

    private static readonly SETTINGS_DASHBOARD_BASE = "/module/system/settings/dashboard"
    public static readonly SETTINGS_DASHBOARD_WIDGET_VISIBILITY_BASE = SymfonySystemRoutes.SETTINGS_DASHBOARD_BASE + "/widgets/visibility";

    public static readonly SEARCH_BASE = "/module/system/search";
    public static readonly NOTIFICATION_BASE = "/module/system/notification";
}
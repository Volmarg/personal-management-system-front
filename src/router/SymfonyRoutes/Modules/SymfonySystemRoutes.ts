import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to system module
 */
export default class SymfonySystemRoutes extends SymfonyRoutes {

    private static readonly SETTINGS_FINANCES_BASE = "/module/system/settings/finances"
    public static readonly SETTINGS_FINANCES_BASE_URL = SymfonySystemRoutes.SETTINGS_FINANCES_BASE + "/currencies";

}
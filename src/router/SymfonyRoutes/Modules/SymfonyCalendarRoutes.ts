import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the calendar module
 */
export default class SymfonyCalendarRoutes extends SymfonyRoutes
{
    public static readonly CALENDAR_MANAGE_BASE_URL = "/module/calendar/manage";
    public static readonly CALENDAR_SCHEDULE_BASE_URL = "/module/calendar/schedule";
}
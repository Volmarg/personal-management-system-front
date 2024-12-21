import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the reports module
 */
export default class SymfonyReportsRoutes extends SymfonyRoutes
{
    public static readonly SAVINGS_BASE_URL = "/module/reports/savings";
    public static readonly PAYMENTS_TOTAL_PER_MONTH_BASE_URL = "/module/reports/payments/total-per-month";
    public static readonly PAYMENTS_TOTAL_PER_TYPE_BASE_URL = "/module/reports/payments/total-per-type";
}
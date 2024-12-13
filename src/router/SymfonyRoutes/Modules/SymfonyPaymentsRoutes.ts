import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the payments module
 */
export default class SymfonyPaymentsRoutes extends SymfonyRoutes
{
    public static readonly PRODUCT_PRICES_BASE_URL = "/module/payment/product-prices";
    public static readonly MONTHLY_BASE_URL = "/module/payment/monthly";
    public static readonly INCOMES_BASE_URL = "/module/payment/income";

    private static readonly SETTINGS_BASE = "/module/payment/setting";
    public static readonly SETTINGS_RECURRING_PAYMENT_BASE_URL   = SymfonyPaymentsRoutes.SETTINGS_BASE + "/recurring-payment";
    public static readonly SETTINGS_PAYMENT_TYPE_BASE_URL        = SymfonyPaymentsRoutes.SETTINGS_BASE + "/payment-type";
    public static readonly SETTINGS_CURRENCY_MULTIPLIER_BASE_URL = SymfonyPaymentsRoutes.SETTINGS_BASE + "/currency-multiplier";
}
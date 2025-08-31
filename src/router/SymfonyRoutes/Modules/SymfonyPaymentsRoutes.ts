import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the payments module
 */
export default class SymfonyPaymentsRoutes extends SymfonyRoutes
{
    public static readonly PRODUCT_PRICES_BASE_URL = "/module/payment/product-prices";
    public static readonly MONTHLY_BASE_URL = "/module/payment/monthly";
    public static readonly INCOMES_BASE_URL = "/module/payment/income";
    public static readonly BILLS_BASE_URL = "/module/payment/bills";
    public static readonly BILLS_ITEMS_BASE_URL = "/module/payment/bills/items";
    public static readonly MONEY_OWED_BASE_URL = "/module/payment/owed";

    private static readonly SETTINGS_BASE = "/module/payment/setting";
    public static readonly SETTINGS_RECURRING_PAYMENT_BASE_URL   = SymfonyPaymentsRoutes.SETTINGS_BASE + "/recurring-payment";
    public static readonly SETTINGS_PAYMENT_TYPE_BASE_URL        = SymfonyPaymentsRoutes.SETTINGS_BASE + "/payment-type";
    public static readonly SETTINGS_CURRENCY_MULTIPLIER_BASE_URL = SymfonyPaymentsRoutes.SETTINGS_BASE + "/currency-multiplier";

    public static readonly MONTHLY_IMPORT_URL = "/module/payment/monthly/import";
}
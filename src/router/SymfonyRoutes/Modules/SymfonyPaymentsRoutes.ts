import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the payments module
 */
export default class SymfonyPaymentsRoutes extends SymfonyRoutes
{
    public static readonly PRODUCT_PRICES_BASE_URL = "/module/payment/product-prices";
}
import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains logic related to dev routes
 */
export default class SymfonyDevRoutes extends SymfonyRoutes {
    /**
     * @description Backend dev debug route
     */
    static readonly DEV_DEBUG_ROUTE = "/dev/debug";
}
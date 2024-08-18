import 'vue-router';

/**
 * @description define router extensions
 */
declare module "vue-router" {
    interface RouteMeta {
        requiredRole: string | undefined
    }
}
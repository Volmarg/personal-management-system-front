import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from 'vue-router'
import Dashboard                                                    from '@/views/Dashboard/Dashboard.vue';
import VueRouterGuards                                              from "@/router/VueRouterGuards";
import SymfonyRolesAndRights                                        from "@/scripts/Core/Security/SymfonyRolesAndRights";
import VueRouterUser                                                from "@/router/VueRouterUser";
import {Component}                                                  from "vue";
import VueRouterGoals                                               from "@/router/Modules/VueRouterGoals";

import VueRouterTodo         from "@/router/Modules/VueRouterTodo";
import VueRouterNotes        from "@/router/Modules/VueRouterNotes";
import VueRouterContacts     from "@/router/Modules/VueRouterContacts";
import VueRouterPasswords    from "@/router/Modules/VueRouterPasswords";
import VueRouterCalendar     from "@/router/Modules/VueRouterCalendar";
import VueRouterIssues       from "@/router/Modules/VueRouterIssues";
import VueRouterTravel       from "@/router/Modules/VueRouterTravel";
import VueRouterPayments     from "@/router/Modules/VueRouterPayments";
import VueRouterShopping     from "@/router/Modules/VueRouterShopping";
import VueRouterJob          from "@/router/Modules/VueRouterJob";
import VueRouterReports      from "@/router/Modules/VueRouterReports";
import VueRouterStorage      from "@/router/Modules/VueRouterStorage";
import VueRouterAchievements from "@/router/Modules/VueRouterAchievements";
import VueRouterSystem       from "@/router/VueRouterSystem";

/**
 * @description provided the vue router based logic / data
 */
export default class VueRouter
{
    /**
     * @description definitions of routes names
     */
    static readonly ROUTE_NAME_INFO = "Info";
    static readonly ROUTE_NAME_HOME  = "Home";
    static readonly ROUTE_NAME_LOGIN = "Login";
    static readonly ROUTE_NAME_404   = "404";
    static readonly ROUTE_NAME_MAINTENANCE = "Maintenance";
    static readonly ROUTE_NAME_USER_SETTINGS        = "UserSettings";
    static readonly ROUTE_NAME_SYSTEM_SETTINGS      = "SystemSettings";
    static readonly ROUTE_NAME_REGISTER             = "Register";
    static readonly ROUTE_NAME_USER_PROFILE_PASSWORD_RESET_CONFIRMATION = "UserProfilePasswordResetConfirmation";
    static readonly ROUTE_NAME_DEVELOPMENT_PLAYGROUND = "DevelopmentPlayground";
    static readonly ROUTE_NAME_USER_NOT_ACTIVATED = "UserNotActivated"

    /**
     * @description definitions of routes paths
     */
    static readonly ROUTE_PATH_INFO= "/";
    static readonly ROUTE_PATH_NONE     = "#"; // special path, which will cause user to stay on current page
    static readonly ROUTE_PATH_LOGIN    = "/login";
    static readonly ROUTE_PATH_LOGOUT   = "/logout";
    static readonly ROUTE_PATH_REGISTER = "/register";
    static readonly ROUTE_PATH_HOME         = "/panel/start";
    static readonly ROUTE_PATH_MAINTENANCE  = "/maintenance";
    static readonly ROUTE_PATH_USER_SETTINGS                            = "/panel/user/settings";
    static readonly ROUTE_PATH_SYSTEM_SETTINGS                          = "/panel/system/settings";
    static readonly ROUTE_PATH_USER_PROFILE_PASSWORD_RESET_CONFIRMATION = "/user/profile-password-reset-confirmation/:token"
    static readonly ROUTE_PATH_DEVELOPMENT_PLAYGROUND                   = "/panel/development/playground"

    /**
     * @description configuration of routes in vue itself
     *              these routes are recognized by vue
     */
    static readonly routes: Array<RouteRecordRaw> = [
        {
            path: VueRouter.ROUTE_PATH_LOGIN,
            name: VueRouter.ROUTE_NAME_LOGIN,
            component: (): Promise<Component> => import("@/views/Security/Login.vue"),
        },
        {
            path: "/:pathMatch(.*)",
            name: VueRouter.ROUTE_NAME_404,
            component: (): Promise<Component> => import("@/views/ErrorCodes/404.vue"),
        },
        {
            path: VueRouter.ROUTE_PATH_MAINTENANCE,
            name: VueRouter.ROUTE_NAME_MAINTENANCE,
            component: (): Promise<Component> => import("@/views/SystemState/Maintenance.vue"),
        },
        {
            path: VueRouter.ROUTE_PATH_REGISTER,
            name: VueRouter.ROUTE_NAME_REGISTER,
            component: (): Promise<Component> => import("@/views/Security/Register.vue"),
        },
        {
            path: VueRouter.ROUTE_PATH_USER_PROFILE_PASSWORD_RESET_CONFIRMATION,
            name: VueRouter.ROUTE_NAME_USER_PROFILE_PASSWORD_RESET_CONFIRMATION,
            component: (): Promise<Component> => import("@/views/User/PasswordResetConfirmation.vue")
        },
        {
            path: VueRouter.ROUTE_PATH_INFO,
            name: VueRouter.ROUTE_NAME_INFO,
            component: (): Promise<Component> => import("@/views/InfoLandingPage/Page.vue")
        },
        /**
         * @description Logged in user routes
         *              these routes are rendered into special view accessible only for user
         */
        {
            path: "/",
            component: (): Promise<Component> => import("@/views/RouterViews/LoggedInUser.vue"),
            children: [
                {
                    path: VueRouter.ROUTE_PATH_USER_SETTINGS,
                    name: VueRouter.ROUTE_NAME_USER_SETTINGS,
                    component: (): Promise<Component> => import("@/views/User/Settings/Settings.vue"),
                    children: VueRouterUser.userRoutesConfiguration,
                    meta: {
                        requiredRole: SymfonyRolesAndRights.ROLE_USER,
                    }
                },
                {
                    path: VueRouter.ROUTE_PATH_SYSTEM_SETTINGS,
                    name: VueRouter.ROUTE_NAME_SYSTEM_SETTINGS,
                    component: (): Promise<Component> => import("@/views/System/Settings.vue"),
                    children: VueRouterSystem.systemRoutesConfiguration,
                    meta: {
                        requiredRole: SymfonyRolesAndRights.ROLE_USER,
                    }
                },
                {
                  path: VueRouter.ROUTE_PATH_DEVELOPMENT_PLAYGROUND,
                  name: VueRouter.ROUTE_NAME_DEVELOPMENT_PLAYGROUND,
                  component: (): Promise<Component> => import("@/views/Development/Playground.vue"),
                  meta: {
                      requiredRole: SymfonyRolesAndRights.ROLE_DEVELOPER,
                  }
                },
                {
                    path: VueRouter.ROUTE_PATH_HOME,
                    name: VueRouter.ROUTE_NAME_HOME,
                    component: Dashboard
                },
                ...VueRouterGoals.routesConfiguration,
                ...VueRouterTodo.routesConfiguration,
                ...VueRouterNotes.routesConfiguration,
                ...VueRouterContacts.routesConfiguration,
                ...VueRouterPasswords.routesConfiguration,
                ...VueRouterCalendar.routesConfiguration,
                ...VueRouterIssues.routesConfiguration,
                ...VueRouterTravel.routesConfiguration,
                ...VueRouterPayments.routesConfiguration,
                ...VueRouterShopping.routesConfiguration,
                ...VueRouterJob.routesConfiguration,
                ...VueRouterReports.routesConfiguration,
                ...VueRouterStorage.routesConfiguration,
                ...VueRouterAchievements.routesConfiguration,
            ],
        },
        ...VueRouterUser.userSettingLandingPageRoutesConfiguration,
    ]

    /**
     * @description will return router with added routes and guards
     */
    public getPreconfiguredRouter(ignoreGuard: boolean = false): Router
    {
        let router = createRouter({
            history : createWebHashHistory(),
            routes  : VueRouter.routes
        });

        // this causes some loop issue
        if(!ignoreGuard){
            let vueRouterGuards = new VueRouterGuards();
            router              = vueRouterGuards.setHelpers(router); // must be set first otherwise guards might redirect user before helper is set
            router              = vueRouterGuards.setGuards(router);
        }

        return router;
    }
}
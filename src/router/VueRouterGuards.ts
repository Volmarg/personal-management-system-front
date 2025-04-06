import {Router}                      from "vue-router";
import LocalStorageService           from "@/scripts/Core/Services/Storage/LocalStorageService";
import JwtService                    from "@/scripts/Core/Services/Security/JwtService";
import UserController                from "@/scripts/Core/Controller/UserController";
import EnvReader                     from "@/scripts/Core/System/EnvReader";
import VueRouter                     from "@/router/VueRouter";
import JwtTokenHandler               from "@/scripts/Core/Security/JwtTokenHandler";
import TypeChecker                   from "@/scripts/Core/Services/Types/TypeChecker";
import Nprogress                     from "@/scripts/Libs/Nprogress";
import SymfonySecurityRoutes         from "@/router/SymfonyRoutes/SymfonySecurityRoutes";
import AppAxios                      from "@/scripts/Core/Services/Request/AppAxios";
import EventDispatcherService        from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";

import ToastNotification, {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";

/**
 * @description handles setting guards to the vue router - meaning, restrictions of when / under which circumstances
 *              can given frontend routes be accessed
 *
 * @link https://router.vuejs.org/api/#router-currentroute
 *
 */
export default class VueRouterGuards
{

    private getRoutesNamesExcludedFromRequirementsOfBeingLoggedIn(): Array<string> {
        return [
            VueRouter.ROUTE_NAME_404,
            VueRouter.ROUTE_NAME_LOGIN,
            VueRouter.ROUTE_NAME_REGISTER,
            VueRouter.ROUTE_NAME_USER_PROFILE_PASSWORD_RESET_CONFIRMATION,
            VueRouter.ROUTE_NAME_USER_NOT_ACTIVATED,
        ];
    }

    static readonly KEY_VUE_ROUTER_TO_PATH   = "vueRouterToPath";
    static readonly KEY_VUE_ROUTER_FROM_PATH = "vueRouterFromPath";

    private userController  = new UserController();
    private jwtTokenHandler = new JwtTokenHandler();

    private jwtService: JwtService = new JwtService();

    /**
     * @description set route guards
     * @param router
     */
    public setGuards(router: Router): Router
    {
        router = this.startLoader(router); // must always be first

        router = this.checkMaintenanceMode(router);
        router = this.checkJwtTokenValidity(router);
        router = this.enforceUserToLoginPageGuard(router);
        router = this.denyAccessingLoginPageIfAlreadyLoggedIn(router);
        router = this.checkIfRequiredRouteRoleGranted(router);
        router = this.redirectPanelStartPage(router);
        router = this.denyRegister(router);

        return router;
    }

    /**
     * @description set helper data
     * @param router
     */
    public setHelpers(router: Router): Router
    {
        this.setGlobals(router);

        router = this.endLoader(router); //must always be last

        return router;
    }

    /**
     * @description will handle validating the token in storage
     */
    private checkJwtTokenValidity(router: Router): Router
    {
        router.beforeEach( (to, from, next) => {
            if(
                    this.userController.isUserLoggedIn()
                &&  this.jwtService.isTokenExpired(LocalStorageService.get(LocalStorageService.AUTHENTICATION_TOKEN))
                &&  !EnvReader.isMaintenance()
            ){
                ToastNotification.showAlert("info", "Session expired");
                this.jwtTokenHandler.invalidateTokenAndRedirectUser();
                next(false);
            }else{
                next();
            }

        });

        return router;
    }

    /**
     * @description Handle check if user is still allowed to navigate on page or not
     */
    private enforceUserToLoginPageGuard(router: Router): Router
    {
        router.beforeEach( (to, from, next) => {
            let toRouteName = to.name as string;
            if(
                    !this.getRoutesNamesExcludedFromRequirementsOfBeingLoggedIn().includes(toRouteName)
                &&  !this.userController.isUserLoggedIn()
                &&  !EnvReader.isMaintenance()
            ){
                router.push(VueRouter.ROUTE_PATH_LOGIN);
            }else{
                next();
            }

        });

        return router;
    }

    /**
     * @description will deny logged in user to access login page
     */
    private denyAccessingLoginPageIfAlreadyLoggedIn(router: Router): Router
    {
        router.beforeEach( (to, from, next) => {
            if(
                    to.name === VueRouter.ROUTE_NAME_LOGIN
                &&  this.userController.isUserLoggedIn()
                &&  !EnvReader.isMaintenance()
            ){
                router.push(VueRouter.ROUTE_PATH_HOME);
            }else{
                next();
            }

        });

        return router;
    }

    /**
     * @description will deny access to registration page if registration is disabled
     */
    private denyRegister(router: Router): Router {
        router.beforeEach( async (to, from, next) => {
            if (to.name === VueRouter.ROUTE_NAME_REGISTER) {
                if (EnvReader.isDemo()) {
                    EventDispatcherService.emitShowNotification(ToastTypeEnum.info, null, 'security.register.texts.msg.disabled');
                    await router.push(VueRouter.ROUTE_PATH_HOME);
                    return;
                }

                let response = await (new AppAxios).get(SymfonySecurityRoutes.buildUrl(SymfonySecurityRoutes.URL_CAN_REGISTER_CHECK));
                if (response.code !== 200) {
                    EventDispatcherService.emitShowNotification(ToastTypeEnum.info, response.message);
                    await router.push(VueRouter.ROUTE_PATH_HOME);
                } else {
                    next();
                }
                return;
            }

            next();
        });

        return router;
    }

    /**
     * @description will check if the maintenance mode is turned on, and if so then will redirect user to special page
     */
    private checkMaintenanceMode(router: Router): Router
    {
        router.beforeEach( (to, from, next) => {

            if(
                    to.name != VueRouter.ROUTE_NAME_MAINTENANCE
                &&  EnvReader.isMaintenance()
            ){
                router.push(VueRouter.ROUTE_PATH_MAINTENANCE)
            }
            else if (
                    to.name === VueRouter.ROUTE_NAME_MAINTENANCE
                &&  !EnvReader.isMaintenance()
            ) {
                router.push(VueRouter.ROUTE_PATH_HOME)
            } else {
                next();
            }

        });

        return router;
    }

    /**
     * @description check if user has required role to enter this route
     */
    private checkIfRequiredRouteRoleGranted(router: Router): Router
    {
        router.beforeEach( (to, from, next) => {

            if( !TypeChecker.isUndefined(to.meta.requiredRole) ){
                if( this.userController.isRoleGranted(to.meta.requiredRole as string) ){
                    next();
                }else{
                    next(false);
                }
            }else{
                next();
            }

        })

        return router;
    }

    /**
     * @description will set globals usable in project outside of the vue logic
     * @param router
     */
    private setGlobals(router: Router)
    {
        router.beforeEach( (to, from, next) => {
            window[VueRouterGuards.KEY_VUE_ROUTER_TO_PATH]   = to.fullPath;
            window[VueRouterGuards.KEY_VUE_ROUTER_FROM_PATH] = from.fullPath;

            next();
        })
    }

    /**
     * @description will show loader spinner
     */
    private startLoader(router: Router): Router
    {
        router.beforeEach( (to, from, next) => {
            if (from.name !== to.name) {
                Nprogress.start();
            }
            next();
        });

        return router;
    }

    /**
     * @description will show loader spinner
     */
    private endLoader(router: Router): Router
    {
        router.afterEach( () => {
            Nprogress.done();
        });

        return router;
    }

    /**
     * @description handles redirecting from "/" when user is logged in to the panel start page,
     *              that's because how the router logic works in vue. I no longer want the "/"
     *              to be home page when logged in, but that's not easy to handle so the simplest
     *              solution is just to push route to new path.
     */
    private redirectPanelStartPage(router: Router): Router
    {
        router.beforeEach( (to, from, next) => {
            if (
                    this.userController.isUserLoggedIn()
                &&  to.fullPath == "/"
                &&  to.path == "/"
                &&  undefined === to.name
            ) {
                router.push(VueRouter.ROUTE_PATH_HOME);
            }
            next();
        });

        return router;
    }

}
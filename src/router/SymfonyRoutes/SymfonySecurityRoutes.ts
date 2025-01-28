import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description This class contains definitions of Symfony (backend) api routes
 *              there is no way to pass this via templates etc so whenever a route is being changed in the symfony
 *              it also has to be updated here.
 *
 *              This solution was added to avoid for example calling routing api, or having string hardcoded in
 *              all the places.
 */
export default class SymfonySecurityRoutes extends SymfonyRoutes {

    /**
     * @description login authentication (form submission)
     */
    static readonly URL_LOGIN = "/login";

    /**
     * @description will register user
     */
    static readonly URL_REGISTER_USER = "/register-user";

    /**
     * @description checks if registration is possible
     */
    static readonly URL_CAN_REGISTER_CHECK = "/can-register";

    /**
     * @description once this url is called the user will be activated
     *              This is NOT a confirmation url rather the real url for activation.
     */
    static readonly URL_RESET_PASSWORD_USER             = "/reset-password/:token";
    static readonly URL_RESET_PASSWORD_USER_PARAM_TOKEN = "token"

    /**
     * @description refreshes the jwt token
     */
    static readonly URL_REFRESH_TOKEN = "/security/jwt/refresh";
}

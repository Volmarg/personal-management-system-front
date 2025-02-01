/**
 * @description contains routes related to user settings
 */
export default class SymfonyUserSettingRoutes
{
    /**
     * @description handles updating the user personal data in settings
     */
    static readonly URL_USER_BASE_DATA_PERSONAL_SAVE = "/user/base-data/personal-data/save";

    /**
     * @description handles changing the user E-Mail in settings
     */
    static readonly URL_USER_BASE_DATA_EMAIL_SAVE             = "/user/base-data/email/change/:emailAddress";
    static readonly URL_USER_BASE_DATA_EMAIL_SAVE_PARAM_EMAIL = "emailAddress"

    /**
     * @description changes the user password
     */
    static readonly URL_CHANGE_PASSWORD = "/user/security/password/change";

    /**
     * @description changes the user lock password
     */
    static readonly URL_CHANGE_LOCK_PASSWORD = "/user/security/lock-password/change";

    /**
     * @description handles changing user profile image,
     *              in reality it takes no parameters because this is called after file upload is done,
     *              once upload is done this logic only removes old files, and leaves the latest one
     */
    static readonly URL_CHANGE_PROFILE_IMAGE = "/user/base-data/profile-image/change";

}
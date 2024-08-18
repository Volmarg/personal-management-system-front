/**
 * @description must be used instead of 'jsonwebtoken' which is breaking in vite production mode
 */
import {verify as jwtVerify}      from "jsonwebtoken-esm";
import Logger                     from "@/scripts/Core/Logger";
import moment                     from "moment";
import {Moment}                   from "moment/moment";
import ConfigLoader               from "@/scripts/Core/Services/ConfigLoader/ConfigLoader";
import {JwtTokenPayload}          from "@/scripts/Dto/Jwt/JwtPayloadType";
import BaseError                  from "@/scripts/Core/Error/BaseError";
import JwtTokenHandler            from "@/scripts/Core/Security/JwtTokenHandler";
import BackendErrorStorageService from "@/scripts/Core/Services/Storage/BackendErrorStorageService";
import EventDispatcherService     from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";
import {ToastTypeEnum}            from "@/scripts/Libs/ToastNotification";

/**
 * @description handles the jwt tokens
 * @link https://www.npmjs.com/package/jsonwebtoken
 */
export default class JwtService
{
    private jwtTokenHandler = new JwtTokenHandler();

    /**
     * @description Will check if jwt token is valid by not only checking jwt itself but also it's signature
     *              - uses public secret key to check if signature is valid
     *
     *              Error can be thrown if signature is invalid or token is expired
     */
    public decodeUsingSignature(jwtToken: string, invalidateUser: boolean = true, showErrorNotification: boolean = true): null | JwtTokenPayload
    {
        let jwtPayload: JwtTokenPayload | null = null;
        let _this = this;
        jwtVerify(jwtToken, ConfigLoader.jwt.publicSecretKey, {}, function(errors, payload) {

            if (null === errors) {
                /**
                 * @description well... I'm very sorry, but it has to be done this way because on dev if there
                 *              are no errors then it's indeed null but with Vite in prod (build) mode
                 *              the errors is an empty object.
                 *
                 *              Even tho the TS typehint never mentions this, it does assign empty object on prod on error
                 */
                //@ts-ignore
                errors = {};
            }

            /**
             * @description it's important to first invalidate, then log error in DB
             *              must be done this way otherwise request sends no longer valid JWT
             *              which then triggers authentication error on backend for logging logic
             */
            //@ts-ignore
            if (Object.keys(errors).length > 0) {
                let dataBag = {
                    errors : errors
                };

                if (errors?.message && showErrorNotification) {
                    EventDispatcherService.emitShowNotification(
                        ToastTypeEnum.warning,
                        errors.message
                    );
                }

                Logger.error("Errors occurred while verifying token with signature", dataBag);
                if(invalidateUser){
                    _this.jwtTokenHandler.invalidateTokenAndRedirectUser();
                }

                return null;
            }

            if ("undefined" === typeof payload) {
                return null;
            }

            jwtPayload = payload as JwtTokenPayload;
        });

        return jwtPayload;
    }

    /**
     * @description will return human readable payload expiration time
     */
    public getExpirationTimeFromPayload(payload: JwtTokenPayload): Moment
    {
        let expirationTimestamp = payload.exp as number;
        if( isNaN(expirationTimestamp) ){

            this.handleIssueWithDecodingToken({
                payload : payload,
                message : "Could not extract the timestamp from payload",
            });
        }
        let expirationDateTime  = moment.unix(expirationTimestamp);
        return expirationDateTime;
    }

    /**
     * @description check if token is expired
     * @return boolean
     */
    public isTokenExpired(token: string): boolean
    {
        let payload = this.decodeUsingSignature(token, false, false);

        /**
         * @description null can be returned if token is invalid or expired,
         *              if it's invalid for some reason then it's considered
         *              expired automatically - to invalidate it later on
         */
        if(null === payload){
            return true;
        }

        let expirationMoment = this.getExpirationTimeFromPayload(payload);

        return ( expirationMoment < moment() );
    }

    /**+
     *  @description handles logic when there were some issues with decoding token.
     */
    private handleIssueWithDecodingToken(data: Record<string | number, string | number | null | boolean | unknown>): void
    {
        let message = "Something went wrong while decoding token";
        Logger.error(message, data);
        throw new BaseError(message, data);
    }

}
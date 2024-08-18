/**
 * @description must be used instead of 'jsonwebtoken' which is breaking in vite production mode
 */
import {JwtPayload} from "jsonwebtoken-esm";

/**
 * @description expected special keys in payload (delivered from backend)
 */
type BackendJwtTokenPayload = {
    roles        : Array<string>,
    username     : string,
    email        : string,
    isUserActive : boolean,
    userId       : string,
}

type JwtTokenPayload = JwtPayload & BackendJwtTokenPayload;

export {
    JwtTokenPayload
}
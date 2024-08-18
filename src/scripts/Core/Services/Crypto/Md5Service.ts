import {Md5} from "ts-md5";

/**
 * @description relies on {@link https://www.npmjs.com/package/ts-md5}
 */
export default class Md5Service {
    /**
     * @description will hash the string
     */
    public static hash(hashedString: string): string {
        return Md5.hashStr(hashedString);
    }
}
import BaseError from "@/scripts/Core/Error/BaseError";

/**
 * @description will handle logic related to boolean value
 */
export default class BoolTypeProcessor
{

    /**
     * @description return bool representation of string bool
     */
    public static boolStringToRealBool(value: string | boolean): boolean
    {
        if("boolean" === typeof value){
            return value;
        }

        if("true" == value || "1" == value){
            return true;
        }else if("false" == value || "0" === value){
            return false;
        }

        throw new BaseError("Not a valid `bool` string: " + value);
    }

}
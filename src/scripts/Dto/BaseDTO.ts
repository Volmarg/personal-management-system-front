import BaseError from "@/scripts/Core/Error/BaseError";

/**
 * @description Base of all dtos
 */
export default class BaseDTO {
    /**
     * @description Will throw error related to json parsing
     */
    public static throwJsonParsingError(className: string, Exception: Error, json: string): void{
        throw new BaseError("Could not parse the json for: " + className, {
            "exception" : Exception,
            "json"      : json,
        })
    }
}
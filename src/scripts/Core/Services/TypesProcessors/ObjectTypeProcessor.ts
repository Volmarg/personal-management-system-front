import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import TypeChecker         from "@/scripts/Core/Services/Types/TypeChecker";
import {JSONPath}          from "jsonpath-plus";
import BaseError           from "@/scripts/Core/Error/BaseError";
import ArrayTypeProcessor  from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

/**
 * @description will handle logic related to object value
 */
export default class ObjectTypeProcessor {

    /**
     * @description will check if all keys have "non empty" values
     */
    public static areAllValuesSet(objectToCheck: Record<string|number, unknown>): boolean
    {
        let keys = Object.keys(objectToCheck);
        for(let key of keys){
            let value = objectToCheck[key];
            if(
                    TypeChecker.isScalar(value)
                &&  StringTypeProcessor.isEmptyString(value as string | number | null | undefined)
            ){
                return false;
            }
        }

        return true;
    }

    /**
     * @description Will check if object has key
     * @param searchedKeyPath {string} - in json format such as "key1.key2.key3"
     */
    public static hasKey(objectToCheck: Record<string | number, unknown>, searchedKeyPath: string): boolean
    {
        if( StringTypeProcessor.isEmptyString(searchedKeyPath) ){
            return false;
        }

        let resolvedValues = JSONPath({
            path : searchedKeyPath,
            json : objectToCheck,
        })

        return !ArrayTypeProcessor.isEmpty(resolvedValues);
    }

    /**
     * @description will return value for given json key
     *              supports nested keys traversing
     *
     * @example
     * searchedPath = "key1.key2.key3"
     * targetObject = {
     *     key1: {
     *         key2 : {
     *             key3: value
     *         }
     *     }
     * }
     */
    public static getValueForKey(targetObject: Record<string | number, unknown>, searchedPath: string): null | unknown
    {

        let resolvedValues = JSONPath({
            path : searchedPath,
            json : targetObject,
        })

        if(resolvedValues.length > 1){
            throw new BaseError("Give path was expected to be present only once in object", {
                path       : searchedPath,
                objectJson : JSON.stringify(targetObject),
            });
        }

        let firstValue = resolvedValues[0];
        if( StringTypeProcessor.isEmptyString(firstValue, false, false) ){
            return null;
        }

        return firstValue;
    }
}
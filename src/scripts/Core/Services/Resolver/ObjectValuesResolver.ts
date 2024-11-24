import ObjectTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ObjectTypeProcessor";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

/**
 * @description this class handles resolving object values by provided keys
 */
export default class ObjectValuesResolver
{

    /**
     * @description will go over the provided `searchedKeys` and `targetObject` and will resolve values for given keys
     *              of the `searchedKeys`. If `targetObject` has no key then `value` will be set to `null`
     *
     * @description in case when `searchedKey` is empty, null will be returned for such key
     */
    public static resolveKeysToValues(targetObject: Record<string | number, unknown>, searchedKeys: Array<string>): Record<string, unknown>
    {
        let resolvedValues = {};
        for(let key of searchedKeys){
            if( StringTypeProcessor.isEmptyString(key, false) ){
                resolvedValues[key] = null;
                continue;
            }

            let foundValue = null as unknown;
            if( ObjectTypeProcessor.hasKey(targetObject, key) ){
                foundValue = ObjectTypeProcessor.getValueForKey(targetObject, key);
            }

            resolvedValues[key] = foundValue;
        }

        return resolvedValues;
    }

    /**
     * @description will return object key for given value or null if nothing is found
     */
    public static resolveValueToKey(object: Record<string | number, unknown>, value: string | number): string | null
    {
        let resolvedKey = Object.keys(object).find( key => (object[key] === value) );
        return resolvedKey ?? null;
    }

}
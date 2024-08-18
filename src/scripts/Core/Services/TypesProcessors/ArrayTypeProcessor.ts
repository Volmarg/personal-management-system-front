/**
 * @description will handle logic related to array value
 */
import TypeChecker from "@/scripts/Core/Services/Types/TypeChecker";
import BaseError from "@/scripts/Core/Error/BaseError";

export default class ArrayTypeProcessor {

    /**
     * @description will check if array is empty or now
     */
    public static isEmpty(array: Array<unknown>): boolean
    {
        return array.length === 0;
    }

    /**
     * @description will return random element (value) from array
     */
    public static getRandomElement(array: Array <unknown>): unknown
    {
        return array[Math.floor(Math.random()*array.length)];
    }

    /**
     * @description will return the index of first element matching given value in array
     *              or null if no element has given value
     */
    public static findFirstByValue(value: unknown, array: Array<unknown>): number | null {
        let foundIndex = array.findIndex( (element)  => {
            if( TypeChecker.isScalar(value) ){
                return element == value;
            }
            throw new BaseError("Function `findFirstByValue` supports only scalar values. Provided type: " + typeof value);
        });

        if(-1 == foundIndex){
            return null;
        }

        return foundIndex;
    }
}
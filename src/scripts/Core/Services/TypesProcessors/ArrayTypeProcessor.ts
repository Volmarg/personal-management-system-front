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

    /**
     * @link https://stackoverflow.com/a/59942031 - straightforward copy, just changed few things
     */
    public static getStringCombinations(valuesArray: Array<unknown>): Array<Array<string>> {
        for (let element of valuesArray) {
            if (!TypeChecker.isString(element)) {
                throw new BaseError("At least one element in array is not a string. This is not allowed! Array: " + JSON.stringify(valuesArray));
            }
        }

        let temp = [];
        let combination = [];
        let maxCombinations = Math.pow(2, valuesArray.length);

        for (let i = 0; i < maxCombinations; i++) {
            temp = [];
            for (let j = 0; j < valuesArray.length; j++) {
                if ((i & Math.pow(2, j))) {
                    temp.push(valuesArray[j]);
                }
            }
            if (temp.length > 0) {
                combination.push(temp);
            }
        }

        combination.sort((a, b) => a.length - b.length);

        return combination;
    }
}
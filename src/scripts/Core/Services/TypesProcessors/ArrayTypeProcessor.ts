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
     * @link https://stackoverflow.com/a/17041830
     * Same solution is used on backed, this is front implementation, if something is going to be changed here, do change
     * it also on backed.
     *
     * Take the range of characters, and generate an array of all permutations - will not contain the input values
     *
     * @param input  array used for building product
     * @param result contains the resulting cartesian product
     *                              - combination of different values,
     *                              - combination of the values themselves (["test"], results ["testtest"])
     *
     * @param depth         iterations of product (1 returns array itself, 2 is products made once, 3 twice with array from previous results)
     * @param currentDepth  currentDepth  internal variable to track how nested the current call is
     * @param stringBetween stringBetween string added between glued values
     * @param stringBetweenOriginal same as above (but it's passed around in recursive call, while above one gets modified)
     */
    public static cartesianProduct(
        input: Array,
        result: Record,
        depth: number = 1,
        currentDepth: number = 0,
        stringBetween: string = "",
        stringBetweenOriginal: string | null = null
    ): void {
        if (TypeChecker.isNull(stringBetweenOriginal)) {
            stringBetweenOriginal = stringBetween;
        }

        let excludeSelfDupes = () => {
            for (let value of input) {
                let dupe  = value + stringBetweenOriginal + value;
                let index = Object.values(result).findIndex( (element)  => { return element === dupe});
                if (TypeChecker.isNumber(index) && index >= 0) {
                    let key = Object.keys(result)[index];
                    delete result[key];
                }
            }
        };

        currentDepth++;
        if (currentDepth > depth) {
            excludeSelfDupes();
            return;
        }

        for (let char of input) {
            if (!TypeChecker.isScalar(char)) {
                throw new BaseError("One of the array elements is not scalar. This is not allowed!")
            }

            if (currentDepth === depth) {
                let currKey = parseInt(Object.keys(result).reverse()[0]);
                let newKey = isNaN(currKey) ? 0 : currKey + 1;

                result[newKey] = stringBetween + char;
                excludeSelfDupes();
                continue;
            }

            ArrayTypeProcessor.cartesianProduct(input, result, depth, currentDepth, char + stringBetween, stringBetweenOriginal);
        }

    }

}
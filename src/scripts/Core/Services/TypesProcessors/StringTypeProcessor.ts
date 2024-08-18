/**
 * @description will handle logic related to string value
 */
export default class StringTypeProcessor {

    public static readonly DOTS = "...";

    /**
     * @description will check if given value is empty
     *
     * @param valueToCheck
     * @param considerZeroEmpty
     */
    public static isEmptyString(valueToCheck: string | number | null | undefined | boolean, considerZeroEmpty: boolean = true): boolean
    {
        if(
                valueToCheck === true
            ||  valueToCheck === false
        ){
            return valueToCheck;
        }

        if(
                "undefined" === typeof valueToCheck
            ||  undefined   === valueToCheck
            ||  ""          === valueToCheck
            ||  null        === valueToCheck
            ||  ""          === String(valueToCheck).trim()
        ){
            return true;
        }

        if (
            considerZeroEmpty
            && (
                     0   === valueToCheck
                ||  "0"  === valueToCheck
            )
        ) {
            return true;
        }

        return false;
    }

    /**
     * @description will reduce length of string, and append dots on the end if proper param is passed
     */
    public static reduceStringToCharactersCount(processedString: string, charactersCount: number, showDots: boolean = true): string
    {
        let reducedString = processedString.substr(0, charactersCount);
        if(!showDots){
            return reducedString;
        }

        return `${reducedString}${StringTypeProcessor.DOTS}`;
    }

    /**
     * @description check if given value is a number or not
     */
    public static isNumber(value: unknown): boolean
    {
        // null must be checked because js thinks that null is a number
        if(null === value){
            return false;
        }

        // cast is necessary as the TS implementation is wrong - property should be number but this makes no sense
        return !isNaN(value as number);
    }

    /**
     * @description makes the first letter uppercase
     *
     * @link {https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript}
     */
    public static ucFirst(string: string): string
    {
        return string && string[0].toUpperCase() + string.slice(1);
    }

}
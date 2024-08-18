/**
 * @description provides small & simple logic for checking types of provided data
 *              this solution was provided due to js way of checking types "typeof var == 'string'" etc
 */
export default class TypeChecker {

    /**
     * @description check if value is of type string
     */
    public static isString(value: unknown): boolean
    {
        return (typeof value === "string");
    }

    /**
     * @description check if value is of type array
     */
    public static isArray(value: unknown): boolean
    {
        return Array.isArray(value);
    }

    /**
     * @description check if value is of type object
     */
    public static isObject(value: unknown): boolean
    {
        /**
         * @description this check is needed as `typeof` returns "object" as well for array,
         *              which in fact is `kinda` correct as array is also an object BUT it's more about
         *              checkin if value is an REAL object defined with `{}`
         */
       return ( !Array.isArray(value) &&  typeof value === "object" )
    }

    /**
     * @description check if value is of type undefined
     */
    public static isUndefined(value: unknown): boolean
    {
        return (typeof value === "undefined" || value === undefined)
    }

    /**
     * @description check if value is of type null
     */
    public static isNull(value: unknown): boolean
    {
        return (value === null)
    }

    /**
     * @description check if value is of type number
     */
    public static isNumber(value: unknown): boolean
    {
        return( typeof value === "number" || value instanceof Number )
    }

    /**
     * @description check if value is of type boolean
     */
    public static isBoolean(value: unknown): boolean
    {
        return( typeof value === "boolean" || value instanceof Boolean )
    }

    /**
     * @description check if value is a scalar value
     */
    public static isScalar(value: unknown): boolean
    {
        return (
                TypeChecker.isString(value)
          ||    TypeChecker.isNumber(value)
          ||    TypeChecker.isBoolean(value)
          ||    TypeChecker.isUndefined(value)
          ||    TypeChecker.isNull(value)
        );
    }

}
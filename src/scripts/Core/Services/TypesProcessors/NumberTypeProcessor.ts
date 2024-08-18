/**
 * @description handles working with number type
 */
export default class NumberTypeProcessor {

    /**
     * @description check if number is int
     */
    public static  isInt(number){
        return Number(number) === number && number % 1 === 0;
    }

    /**
     * @description check if number is float
     */
    public static isFloat(number) {
        return Number(number) === number && number % 1 !== 0;
    }
}
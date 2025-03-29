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

    /**
     * @description the js built-in toFixed is just bad, it does not what it's supposed to do and returns
     *              weird results, this function here just does what it's expected to do:
     *              - take number,
     *              - set precision,
     */
    public static toFixed(number, precision) {
        let multiplier = Math.pow(10, precision + 1);
        let wholeNumber = Math.floor(number * multiplier);
        return Math.round(wholeNumber / 10) * 10 / multiplier;
    }

}
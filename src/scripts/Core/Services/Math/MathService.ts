/**
 * @description provides mathematical calculations based logic
 */
export default class MathService {

    /**
     * @description will round the provided value to X places
     */
    public static round(value: number, decimals: number) {
        // @ts-ignore (sadly it has to be done this way)
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }
}
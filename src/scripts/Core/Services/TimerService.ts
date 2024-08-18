/**
 * @description handles any kind of delays, schedulers, etc.
 */
export default class TimerService
{
    /**
     * @description will wait X ms
     * @note call this method with `await` in front
     * @param ms
     * @param doReject
     */
    public static asyncSleep(ms: number, doReject = false): Promise<unknown> {
        return new Promise((resolve, reject) => {
            setTimeout( () => {
                if (doReject) {
                    reject();
                }

                resolve(true);
            }, ms);
        });
    }

    /**
     * @description standard timeout based sleep, added to avoid setting the comment all the time
     */
    public static sleep(ms: number): void {
        setTimeout( () => {
            //
        }, ms);
    }
}
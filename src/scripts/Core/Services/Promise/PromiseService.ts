/**
 * @description service for handling some special cases of promises
 */
export default class PromiseService {

    /**
     * @description will create a Promise which will periodically call provided function,
     *              provided function MUST return true in order to resolve.
     *
     *              Not checking the runtime, if it's stuck etc., because promise can keep running on some
     *              page and waiting for user to click, if user never clicks then it's just pending.
     */
    public static buildPeriodicallyCheckedPromise($function: CallableFunction): Promise<unknown> {
        return new Promise( (resolve) => {
            let interval = setInterval(() => {
                if ($function()) { // because reactivity is not triggering resolving in here
                    resolve(true);
                    clearInterval(interval);
                }
            }, 100)
        })
    }
}
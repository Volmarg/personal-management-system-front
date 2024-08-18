/**
 * @description provides some building process logic
 */
export default class {

    /**
     * @description registers globals need for the project to work
     */
    public static registerGlobals(): void {
        global.Uint8Array = Uint8Array
    }
}
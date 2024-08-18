import NProgress from 'nprogress';

/**
 * @description shows tiny loading bar directly on top of the page
 * @link https://github.com/rstacruz/nprogress
 */
export default class Nprogress
{

    /**
     * @description will show the bar
     *              Must be called on start of ajax or start of any special logic
     */
    public static start(): void
    {
        NProgress.start();
    }

    /**
     * @description will hide the bar
     *              Must be called on end of the ajax call or end of any special logic
     */
    public static done(): void
    {
        NProgress.done();
    }
}
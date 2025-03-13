/**
 * @description provides logic for handling urls
 */
export default class UrlService
{
    /**
     * @description takes the url, and appends slash on end of it, if slash is already present then
     *              returns the original url
     */
    public static addTrailingSlash(url: string): string {
        return (url.endsWith("/") ? url : `${url}/`);
    }

    /**
     * @description returns host for url
     */
    public static getHost(url: string, stripWww = false): string | null
    {
        let host = (new URL(url)).host as string | null;
        if(stripWww){
            host = UrlService.removeWwwPrefix(host);
        }

        return host;
    }

    /**
     * @description will remove www prefix from url
     */
    public static removeWwwPrefix(url: string | null): string | null
    {
        if (null === url) {
            return null;
        }

        return url.replace("www.", "");
    }

    /**
     * @description removes the http(s) from url
     */
    public static removeProtocol(url: string | null): string | null
    {
        if (null === url) {
            return null;
        }

        let regexp          = new RegExp(/http[s]?:\/\//);
        let protocolLessUrl = url.replace(regexp, "");

        return protocolLessUrl;
    }

    /**
     * {@see UrlService.removeWwwPrefix}
     * {@see UrlService.removeProtocol}
     */
    public static removeWwwAndProtocol(url: string | null): string | null
    {
        if (null === url) {
            return null;
        }

        let wwwLessUrl    = UrlService.removeWwwPrefix(url);
        let procolLessUrl = UrlService.removeProtocol(wwwLessUrl);

        return procolLessUrl;
    }

    /**
     * @description takes query params and appends them to the url, returns updated url.
     *              This method does not check if url already contains query params,
     *              by default assuming that it's not containing any params.
     */
    public static appendQueryParams(queryParams: Record, url: string): string {
        if (Object.keys(queryParams).length == 0) {
            return url;
        }

        let params = new URLSearchParams();
        for (let key of Object.keys(queryParams)) {
            params.set(key, queryParams[key]);
        }

        return url + `?${params.toString()}`;
    }
}
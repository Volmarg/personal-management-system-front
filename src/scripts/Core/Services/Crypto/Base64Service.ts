/**
 * @description handles encrypting & decrypting the base64
 * @link https://developer.mozilla.org/en-US/docs/Glossary/Base64
 */
export default class Base64Service {

    private static readonly BASE_64_PREFIX = "=ENC/";

    /**
     * @description turns utf8 string to base64
     */
    public static utf8ToBase64(value: string): string {
        return btoa(unescape(encodeURIComponent(value)));
    }

    /**
     * @description turns base64 encoded string to utf8
     */
    public static base64ToUtf8(value: string): string {
        return decodeURIComponent(escape(window.atob(value)));
    }

    /**
     * Will append the {@see Base64Service.BASE_64_PREFIX} to the string,
     * the problem is that there were / are a bunch of issues with base64 encoding
     * Php (backend) can't tell if some string is really a base64:
     * - from perspective of base64 the character range etc. will mean it IS base64,
     * - but the string can be sometimes just a word that falls into the base64 criteria
     *
     * The prefix added in here is supposed to solve that issue, but should only be added to the places
     * where it's really going to get removed on backend.
     */
    public static appendPrefix(targetString: string): string {
        return Base64Service.BASE_64_PREFIX + targetString;
    }
}
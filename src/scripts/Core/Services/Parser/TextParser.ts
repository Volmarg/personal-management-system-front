/**
 * @default handles parsing the text
 */
export default class TextParser {

    /**
     * @description will remove html tags from text leaving only what's between them (or outside them)
     */
    public static stripHtmlTags(text: string): string
    {
        return text.replace(/<[^>]*>?/gm, '');
    }
}
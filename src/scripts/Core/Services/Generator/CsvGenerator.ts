/**
 * @description handles building csv from provided data
 */
export default class CsvGenerator {

    private static readonly COLUMN_SEPARATOR_CHARACTER = ",";

    /**
     * @description takes headers and rows, produces the base 64 content of csv
     *
     * >WARNING<, the cell values cannot have "," inside them as this is reserved "col separator" character,
     *            if used, will result in malformed output file
     */
    public static getBase64ContentFromArray(data: Array<Array<unknown>>, headers: Array<string>): string {
        let csvContent = "";
        csvContent += CsvGenerator.getCsvLineFromArrayRow(headers)

        for (let dataRow of data) {
            csvContent += CsvGenerator.getCsvLineFromArrayRow(dataRow);
        }

        return csvContent;
    }

    /**
     * @description replaces the reserved column separator character with other one
     */
    public static replaceSeparatorCharacter(string: string): string
    {
        return string.replaceAll(CsvGenerator.COLUMN_SEPARATOR_CHARACTER, " | ");
    }

    /**
     * @description turns the single data row into value that will be used for building single csv row
     */
    private static getCsvLineFromArrayRow(dataRow: Array<unknown>): string {
        let row = dataRow.join(CsvGenerator.COLUMN_SEPARATOR_CHARACTER);
        return row + "\r\n";
    }
}

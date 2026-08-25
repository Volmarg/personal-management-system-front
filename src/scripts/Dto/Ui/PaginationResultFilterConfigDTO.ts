export default class PaginationResultFilterConfigDTO {
    private _currentPage: number = 0;
    private _countOfResultsPerPage: number;
    private _dataArray: Array<Record<string, unknown>>;

    /**
     * @description using `this.name` inside callback will modify the caller (source) props
     * @return {boolean} true - if matching is found (rowData is visible), false otherwise
     */
    private _resultMatchingCallback: ((rowData: Record<string, unknown>) => boolean) | null = null;

    static create(currentPage: number, perPage: number, data: Array<Record<string, unknown>>): PaginationResultFilterConfigDTO {
        let dto = new PaginationResultFilterConfigDTO();

        dto.currentPage = currentPage;
        dto.countOfResultsPerPage = perPage;
        dto.dataArray = data;

        return dto;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    set currentPage(value: number) {
        this._currentPage = value;
    }

    get countOfResultsPerPage(): number {
        return this._countOfResultsPerPage;
    }

    set countOfResultsPerPage(value: number) {
        this._countOfResultsPerPage = value;
    }

    get dataArray(): Array<Record<string, unknown>> {
        return this._dataArray;
    }

    set dataArray(value: Array<Record<string, unknown>>) {
        this._dataArray = value;
    }

    get resultMatchingCallback(): ((rowData: Record<string, unknown>) => boolean) | null {
        return this._resultMatchingCallback;
    }

    set resultMatchingCallback(value: ((rowData: Record<string, unknown>) => boolean) | null) {
        this._resultMatchingCallback = value;
    }
}
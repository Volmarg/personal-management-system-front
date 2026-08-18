export default class PaginationResultFilterConfigDTO {
    private _currentPage: number = 0;
    private _countOfResultsPerPage: number;
    private _dataArray: Array<unknown>;
    private _supportsSearch: boolean = false;

    /**
     * @description using `this.name` inside callback will modify the caller (source) props
     */
    private _resultMatchingCallback: (rowData: Array<unknown>) => void;

    static create(currentPage: number, perPage: number, data: Array<unknown>): PaginationResultFilterConfigDTO {
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

    get dataArray(): Array<unknown> {
        return this._dataArray;
    }

    set dataArray(value: Array<unknown>) {
        this._dataArray = value;
    }

    get supportsSearch(): boolean {
        return this._supportsSearch;
    }

    set supportsSearch(value: boolean) {
        this._supportsSearch = value;
    }

    get resultMatchingCallback(): (rowData: Array<unknown>) => void {
        return this._resultMatchingCallback;
    }

    set resultMatchingCallback(value: (rowData: Array<unknown>) => void) {
        this._resultMatchingCallback = value;
    }
}
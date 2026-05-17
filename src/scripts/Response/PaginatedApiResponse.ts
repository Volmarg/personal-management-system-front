import BaseApiResponse from "@/scripts/Response/BaseApiResponse";
import ErrorHandler    from "@/scripts/Response/ErrorHandler";

export default class PaginatedApiResponse extends BaseApiResponse {
    private _maxPageNumber: number;
    private _currentPageNumber: number;
    private _totalResults: number;

    get maxPageNumber(): number {
        return this._maxPageNumber;
    }

    set maxPageNumber(value: number) {
        this._maxPageNumber = value;
    }

    get currentPageNumber(): number {
        return this._currentPageNumber;
    }

    set currentPageNumber(value: number) {
        this._currentPageNumber = value;
    }

    get totalResults(): number {
        return this._totalResults;
    }

    set totalResults(value: number) {
        this._totalResults = value;
    }

    /**
     * @description Create PaginatedApiResponse from json
     */
    public static fromJson(json: string): PaginatedApiResponse
    {
        let apiResponse = new PaginatedApiResponse();
        apiResponse.prefillBaseFields(json);

        try {
            var object = JSON.parse(json);
        } catch (Exception) {
            ErrorHandler.throwJsonParsingError('PaginatedApiResponse', Exception, json);
        }

        apiResponse.maxPageNumber = object.maxPageNumber;
        apiResponse.currentPageNumber = object.currentPageNumber;
        apiResponse.totalResults = object.totalResults;

        return apiResponse;
    }

}

import {AxiosPostDataBag} from "@/scripts/Core/Types/Request/AxiosTypes";
import BaseApiResponse from "@/scripts/Response/BaseApiResponse";

export default class BackendModuleCallConfig {
    private _baseUrl: string;
    private _id: number;
    private _parentId: number | null = null;
    private _dataBag: AxiosPostDataBag = {};
    private _castedDto: BaseApiResponse
    private _reload: boolean = true;

    constructor(baseUrl: string, id: string, castedDto: BaseApiResponse, dataBag: AxiosPostDataBag) {
        this._baseUrl = baseUrl;
        this._id = id;
        this._castedDto = castedDto;
        this._dataBag = dataBag;
    }

    get baseUrl(): string {
        return this._baseUrl;
    }

    set baseUrl(value: string) {
        this._baseUrl = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get parentId(): number {
        return this._parentId;
    }

    set parentId(value: number) {
        this._parentId = value;
    }

    get dataBag(): AxiosPostDataBag {
        return this._dataBag;
    }

    set dataBag(value: AxiosPostDataBag) {
        this._dataBag = value;
    }

    get castedDto(): BaseApiResponse {
        return this._castedDto;
    }

    set castedDto(value: BaseApiResponse) {
        this._castedDto = value;
    }

    get reload(): boolean {
        return this._reload;
    }

    set reload(value: boolean) {
        this._reload = value;
    }
}
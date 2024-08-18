import BaseError           from "@/scripts/Core/Error/BaseError";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import TypeChecker         from "@/scripts/Core/Services/Types/TypeChecker";
import ArrayTypeProcessor  from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";
import {ToastTypeEnum}     from "@/scripts/Libs/ToastNotification";
import ErrorHandler        from "@/scripts/Response/ErrorHandler";

import {AxiosResponse} from "axios";

type ViolationMessages = Array<string | number | null>;
type InvalidFields     = Record<string | number, string | null | number | ViolationMessages>;
type DataContent       = Record<string | number, string | number | null | boolean | Array<string | number | Array<unknown>>>;

/**
 * @description this is a base response used as a base for each internal backend api call response
 */
export default class BaseApiResponse {

    static readonly KEY_DATA_REDIRECT_ROUTE_NAME : string = "redirectRouteName"
    static readonly KEY_DATA_BASE64              : string = "base64"
    static readonly FIELD_NAME_CODE              : string = "code";
    static readonly FIELD_NAME_SUCCESS           : string = "success";

    private _code             : number;
    private _message          : string;
    private _success          : boolean;
    private _invalidFields    : InvalidFields = {};
    private _data             : DataContent = {};
    private _token            : string;

    private _isSystemDisabled     = false;
    private _isSystemSoonDisabled = false;

    get isSystemSoonDisabled(): boolean {
        return this._isSystemSoonDisabled;
    }

    set isSystemSoonDisabled(value: boolean) {
        this._isSystemSoonDisabled = value;
    }

    get isSystemDisabled(): boolean {
        return this._isSystemDisabled;
    }

    set isSystemDisabled(value: boolean) {
        this._isSystemDisabled = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }

    get code(): number {
        return this._code;
    }

    set code(value: number) {
        this._code = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get success(): boolean {
        return this._success;
    }

    set success(value: boolean) {
        this._success = value;
    }

    get invalidFields(): InvalidFields {
        return this._invalidFields;
    }

    set invalidFields(value: InvalidFields) {
        this._invalidFields = value;
    }

    get data(): DataContent {
        return this._data;
    }

    set data(value: DataContent) {
        this._data = value;
    }

    /**
     * @description will check if any invalid fields are set pr mpt
     */
    public hasInvalidFields(): boolean {
        let keys = Object.keys(this._invalidFields);
        return !ArrayTypeProcessor.isEmpty(keys);
    }

    /**
     * @description will return type suitable for {@see ToastNotification}
     *             this type is based on the state of {@see BaseApiResponse.success}
     */
    public getNotificationType(warnInsteadError = false): string {
        let notificationType = (this.success ? ToastTypeEnum.success : ToastTypeEnum.error);
        if(
                warnInsteadError
            &&  notificationType === ToastTypeEnum.error
        ){
            notificationType = ToastTypeEnum.warning;
        }

        return notificationType;
    }

    /**
     * @description check if message is set
     */
    public isMessageSet(): boolean {
        return !StringTypeProcessor.isEmptyString(this.message);
    }

    /**
     * @description will return the route name from the data array
     */
    get redirectRouteName(): string
    {
        return this._data[BaseApiResponse.KEY_DATA_REDIRECT_ROUTE_NAME] as string;
    }

    /**
     * @description will return the base64 from the data array
     */
    get base64(): string
    {
        return this._data[BaseApiResponse.KEY_DATA_BASE64] as string;
    }

    /**
     * @description check if the response code is user issue based code
     */
    public isBadRequestCode(): boolean
    {
        return (this.code >= 400 && this.code < 500);
    }

    /**
     * @description check if the response code is related to the unauthorized access
     */
    public isAccessDeniedCode(): boolean
    {
        return (this.code === 401 || this.code === 403);
    }

    /**
     * @description will create object from the json (delivered from response)
     *
     * @param json
     */
    public static fromJson(json: string): BaseApiResponse
    {
        let apiResponse = new BaseApiResponse();
        apiResponse.prefillBaseFields(json);

        return apiResponse;
    }

    /**
     * @description creates BaseApiResponse from axios response
     */
    public static fromAxiosResponse(response: unknown): BaseApiResponse
    {
        if(
                "object" === typeof response
            &&  null !== response
        ){
            let json        = JSON.stringify(response['data']);
            let apiResponse = this.fromJson(json);
            return apiResponse;
        }

        throw new BaseError("Axios response is not an object");
    }

    /**
     * @description turns the response into json,
     *              uses normalization to escape the `_` in private fields so that created json can be used to rebuild
     *              the dto back.
     */
    public toJson(): string
    {
        let object = {};
        let props  = Object.keys(this);
        for (let propName of props) {
            let usedPropName = propName;
            if (0 === propName.indexOf("_")) {
                usedPropName = propName.replace("_", "");
            }

            object[usedPropName] = this[propName];
        }

        let json = JSON.stringify(object);

        return json;
    }

    /**
     * @description Backend might sometimes return ban based response indicating that user was banned,
     *              The only way to find out if it's ban is to cast the response dto and check for ban type,
     *
     *              Ban type IS always set if user / resource etc. is banned so if no type is present then
     *              the response can be considered as non-ban based.
     *
     *              The problem here is that BanResponse cannot be called here directly as it would
     *              be endless calls loop.
     */
    public static isBanResponse(response: AxiosResponse): boolean
    {
        /** @see BanResponse.activeBanTypes */
        let banTypes = response.data.activeBanTypes ?? [];

        return !ArrayTypeProcessor.isEmpty(banTypes)
    }

    /**
     * @description will prefill the fields of current calling class which extends from this one,
     *              this reduced the necessity of setting the base fields in child class
     */
    protected prefillBaseFields(json: string): this
    {
        try{
            var object = JSON.parse(json);
            this.validateBaseObject(object);
        }catch(Exception){
            ErrorHandler.throwJsonParsingError('BaseApiResponse', Exception, json);
        }

        this._success = object.success;
        this._message = object.message;
        this._code    = object.code;
        this._token   = object.token;

        this._invalidFields = object.invalidFields;
        if( TypeChecker.isString(object.invalidFields) ){
            this._invalidFields = JSON.parse(object.invalidFields);
        }

        this._data = object.data;
        if( TypeChecker.isString(object.data) ){
            this._data = JSON.parse(object.data);
        }

        return this;
    }

    /**
     * @description will validate the base object response (each backend response should contain these fields)
     */
    private validateBaseObject(object: Record<string|number, unknown>)
    {
        let missingFieldsNames: Array<string> = [];

        if( "undefined" === object.code ){
            missingFieldsNames.push(BaseApiResponse.FIELD_NAME_CODE);
        }

        if( "undefined" === object.success ){
            missingFieldsNames.push(BaseApiResponse.FIELD_NAME_SUCCESS);
        }

        if(0 !== missingFieldsNames.length){
            throw new BaseError("Some of the required backend fields are missing in response object", missingFieldsNames);
        }
    }
}

export {InvalidFields}
/**
 * Contains information about the file upload rules
 */
export default class {
    private _identifier : string;
    private _maxFileSizeMb : number;
    private _isMultiUpload : boolean;
    private _allowNaming : boolean;
    private _allowedExtensions : Array<string>;
    private _allowedMimeTypes : Array<string>;
    private _fileNameValidationRegexps: Array<string>;

    get fileNameValidationRegexps(): Array<string> {
        return this._fileNameValidationRegexps;
    }

    set fileNameValidationRegexps(value: Array<string>) {
        this._fileNameValidationRegexps = value;
    }

    get identifier(): string {
        return this._identifier;
    }

    set identifier(value: string) {
        this._identifier = value;
    }

    get maxFileSizeMb(): number {
        return this._maxFileSizeMb;
    }

    set maxFileSizeMb(value: number) {
        this._maxFileSizeMb = value;
    }

    get isMultiUpload(): boolean {
        return this._isMultiUpload;
    }

    set isMultiUpload(value: boolean) {
        this._isMultiUpload = value;
    }

    get allowedExtensions(): Array<string> {
        return this._allowedExtensions;
    }

    set allowedExtensions(value: Array<string>) {
        this._allowedExtensions = value;
    }

    get allowedMimeTypes(): Array<string> {
        return this._allowedMimeTypes;
    }

    set allowedMimeTypes(value: Array<string>) {
        this._allowedMimeTypes = value;
    }

    get allowNaming(): boolean {
        return this._allowNaming;
    }

    set allowNaming(value: boolean) {
        this._allowNaming = value;
    }
}
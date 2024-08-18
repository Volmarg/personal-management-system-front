import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import EnvReader           from "@/scripts/Core/System/EnvReader";

/**
 * @description contains base information about uploaded file
 */
export default class {
    private _id            : number;
    private _userBasedName : string | null;
    private _originalName  : string;
    private _publicPath    : string | null;
    private _localFileName : string;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get userBasedName(): string | null {
        return this._userBasedName;
    }

    set userBasedName(value: string | null) {
        this._userBasedName = value;
    }

    get originalName(): string {
        return this._originalName;
    }

    set originalName(value: string) {
        this._originalName = value;
    }

    get publicPath(): string | null {
        return this._publicPath;
    }

    set publicPath(value: string | null) {
        this._publicPath = value;
    }

    get localFileName(): string {
        return this._localFileName;
    }

    set localFileName(value: string) {
        this._localFileName = value;
    }

    /**
     * @description check if public path is set
     */
    public hasPublicPathSet(): boolean {
        return !StringTypeProcessor.isEmptyString(this.publicPath);
    }

    /**
     * @description returns the public file path or null if no public access is set for the file
     */
    public getPublicFilePath(): string | null {
        if (!this.hasPublicPathSet()) {
            return null;
        }

        return `${EnvReader.getBackendBaseUrl()}${this.publicPath}${this.localFileName}`;
    }

}
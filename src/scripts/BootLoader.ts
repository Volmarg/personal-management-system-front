import EnvReader    from "@/scripts/Core/System/EnvReader";
import ConfigLoader from "@/scripts/Core/Services/ConfigLoader/ConfigLoader";

/**
 * @description this class handles pre loading / pre configuring different classes / objects / strings etc
 *              think of it as of "Kernel" in Symfony
 *
 *              The methods present here should be wrapped in `async` when needed
 *              this solution is necessary in order to load all necessary data first and then start
 *              the application itself.
 *
 *              > !WARNING! <
 *              Keep in mind that ONLY the most important data should be booted as it will result in increased size of
 *              the loaded data, further meaning will lead to bloating the output js.
 */
export default class BootLoader
{

    /**
     * @description handles booting the most necessary project data
     */
    public async boot(): Promise<void>
    {
        await this.loadEnvModeBasedResources();
    }

    /**
     * @description will handle loading environment based data / resources
     */
    private async loadEnvModeBasedResources(): Promise<void>
    {
        let modeFolder = EnvReader.SYSTEM_MODE_SHORT_PRODUCTION;
        if( EnvReader.isDev() ){
            modeFolder = EnvReader.SYSTEM_MODE_SHORT_DEVELOPMENT;
        }

        // [!Warning!] cannot use the `dynamic` imports due to VITE limitation
        let jwtConfigModules     = import.meta.globEager("/src/config/**/jwt.json");
        let usedJwtConfigModule  = this.getModuleForModeFolder(modeFolder, jwtConfigModules);

        this.setAndMakeReadonly(ConfigLoader, "jwt", usedJwtConfigModule.default);

        await import(`@/config/global.json`).then( result => {
            this.setAndMakeReadonly(ConfigLoader, "general", result.default);
        })

    }

    /**
     * @description will set data to given property of an object
     *              this utilizes the js trick which allows to set the readonly properties,
     *              thanks to this, property marked with READONLY will remain readonly when used
     *              around the project the way it should (without utilizing this trick anywhere else)
     *
     *              [TL-DR]:
     *              - property on class must be defined as `static readonly`,
     *              - `Object.assign` doesn't raise error when writing to readonly properties,
     *              - this is more of `using a bug` but it allows to achieve the end goal
     */
    private setAndMakeReadonly(targetClass: unknown, property: string, value: unknown): void
    {
        Object.assign(targetClass, {[property]: value});
    }

    /**
     * @description will go over the modules returned for file path,
     *              returns the module matching current env mode (dev/prod)
     */
    private getModuleForModeFolder(modeFolderName: string, configModules: Record<string, Record<string, unknown>>): Record<string, unknown> {
        let usedJwtConfigKey    = Object.keys(configModules).find((key) => key.includes(modeFolderName)) as string;
        let usedJwtConfigModule = configModules[usedJwtConfigKey];

        return usedJwtConfigModule;
    }
}
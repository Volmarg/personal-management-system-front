export type ComponentData       = Record<string | number, string | number | CallableFunction | array | ComponentData | boolean | null>
export type ComponentSetup      = Record<string|number, CallableFunction | string, number, null, ComponentSetup>
export type ComponentValidation = Record<string | number, string | number | CallableFunction | Record<string | number, unknown>>
export type ComponentPluginOptions = {
    directive    : string,
    component    : string,
    defaultProps : Record<string, unknown>
}
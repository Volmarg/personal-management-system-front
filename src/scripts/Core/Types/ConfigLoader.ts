export type ConfigLoaderJwt = {
    publicSecretKey: string,
}

export type ConfigLoaderEncryption = {
    jsencrypt: {
        publicKey: string,
    }
}

export type ConfigLoaderGeneral = {
    directories: {
        translations: string,
    }
}
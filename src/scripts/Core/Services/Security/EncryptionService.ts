import {JSEncrypt}                from "jsencrypt";
import BaseError                  from "@/scripts/Core/Error/BaseError";
import BackendErrorStorageService from "@/scripts/Core/Services/Storage/BackendErrorStorageService";
import ConfigLoader               from "@/scripts/Core/Services/ConfigLoader/ConfigLoader";
import Logger                     from "@/scripts/Core/Logger";
import NonLoggableBaseError       from "@/scripts/Core/Error/NonLoggableBaseError";
import Base64Service              from "@/scripts/Core/Services/Crypto/Base64Service";

/**
 * @description will handle the encryption on front, this can be then decrypted on backend
 * @link https://www.npmjs.com/package/jsencrypt
 *
 * Known issues:
 * #1. "Message too long for RSA" means that the message that is about to be is to long for used key
 *      either the key must be longer (generated again that is + then updated both in front & backend)
 *      or the data provided for encryption must be reduced
 *
 *      Key of length => characters count:
 *      1024 => ~100
 *      4096 => ~1000 (This one is used now to handle the 1000 characters)
 *
 *      still fails to encrypt the long string. Seems to be `JSEncrypt` package based problem
 */
export default class EncryptionService
{
    /**
     * @description used for validation of max encrypted characters - see class description `Issue #1`
     */
    static readonly MAX_ENCRYPTED_CHARACTERS_COUNT = 1000;

    private jsEncrypt = new JSEncrypt();

    public constructor()
    {
        this.jsEncrypt.setPublicKey(ConfigLoader.encryption.jsencrypt.publicKey)
    }

    /**
     * @description will take a value, encrypt it and return encrypted string
     */
    public encrypt(value: string | number): string
    {
        let valueStringLength = value.toString().length;
        if( valueStringLength >= EncryptionService.MAX_ENCRYPTED_CHARACTERS_COUNT){
            let message = "Provided string length exceeds the limit for RSA key";
            let dataBag = {
                valueStringLength           : valueStringLength,
                maxEncryptedCharactersCount : EncryptionService.MAX_ENCRYPTED_CHARACTERS_COUNT,
            };

            Logger.error(message, dataBag);

            throw new NonLoggableBaseError(message);
        }

        let stringifiedValue = String(value)
        let encryptedValue   = this.jsEncrypt.encrypt(stringifiedValue);

        if(false === encryptedValue){
            let message = "Could not encrypt the value: " + value;
            throw new BaseError(message);
        }

        return Base64Service.appendPrefix(encryptedValue);
    }

    /**
     * Will encrypt the values of the object, prepared to work only with single dimension object.
     * Recursive call must be implemented if nested types are to be supported
     *
     * Returns the object with the same keys but encrypted values
     *
     * @param object
     */
    public encryptObjectValues(object: Record<string, unknown>): Record<string, number | string | null>
    {
        let objectCopy = {...object};
        let objectKeys = Object.keys(object);

        let encryptedObject = {};
        for(let key of objectKeys){
            let value = objectCopy[key];

            if (typeof value === "object" && null !== value) {
                let typedValue       = value as Record<string, unknown>;
                encryptedObject[key] = this.encryptObjectValues(typedValue);
            }

            if (null === value) {
                value = "";
            }

            if (typeof value === "string" || typeof value === "number") {
                encryptedObject[key] = this.encrypt(value);
            }

        }

        return encryptedObject;
    }

}
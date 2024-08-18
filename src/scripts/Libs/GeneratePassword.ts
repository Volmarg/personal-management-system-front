/**
 * @description handles generating passwords
 *
 * There was a library for generating passwords, but it stopped working after moving to Vite,
 * so had to replace it with some custom code.
 */
export default class GeneratePassword
{
    private static readonly MAX_PASSWORD_LENGTH = 20;

    /**
     * @description will generate password of given length
     */
    public static generatePassword(minPasswordLength: number, maxPasswordLength: number = GeneratePassword.MAX_PASSWORD_LENGTH): string {
        let passwordLength = Math.floor(Math.random() * (maxPasswordLength - minPasswordLength + 1)) + minPasswordLength;
        let password       = GeneratePassword.createRandomPassword(passwordLength);

        return password;
    }

    /**
     * @description will return password
     */
    private static createRandomPassword(passwordLength: number): string {
        let lowercase = "abcdefghijklmnopqrstuvwxyz";
        let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let numbers   = "0123456789";
        let symbols   = "!@#$%^&*_-+=";

        let characters = lowercase + uppercase + numbers + symbols;
        let password   = "";
        for (let i = 0; i < passwordLength; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return password;
    }
}
# Security concerns

## Encryption key

In some cases project relies on `encryption key`.

The mentioned key is used to for example store encrypted entries of password module, which means that the entries in database
are encrypted, and no password is stored as plain-text.

To make things easier, project is shipped with **DEFAULT** key, meaning that whoever decides to use the project will have the same key as other ppl.

::: warning
It's **strongly** advised to remove the default key, and restart the `pms-php-fpm` container afterward. 
There is a script which will automatically generate random key if none was found.

To remove the key:
- open the backend project, and open the file `config/packages/config/encryption.yaml`, 
- set this value

```yaml
parameters:
    encrypt_key:
```
:::

::: danger
Make a backup of the key! Once it's lost You can no longer access any encrypted data.
:::

## JWT encryption keys

Communication between frontend and backend happens with the use of JWT tokens.

Like before to make things easier, project is shipped with **DEFAULT** set of keys, meaning that whoever decides to use the project will have the same key as other ppl.

::: warning
It's rather recommended generate new set of keys and set them up both on **backend** and **frontend**. 
You'd really need to be unlucky here for someone to reuse Your token, 
because the user email inside the token, would need to be exactly the same as the user that You use in Your project instance.

Follow the instruction below for more details.
:::

### Setting up new JWT keys

- todo: remove
- go inside the php container
```shell
docker exec -it pms-php-fpm bash
```
- call this command
```shell
bin/console lexik:jwt:generate-keypair --dry-run
```
- copy this part

```
-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFHDBOBgkqhkiG9w0BBQ0wQTApBgkqhkiG9w0BBQwwHAQIuNN7CJs+HBkCAggA
<rest>
oxkSLY4ruQ2QPZeCt6hpjw==
-----END ENCRYPTED PRIVATE KEY-----
```
- replace the content of **backend** project file `config/jwt/prod/private.pem`
- copy this part

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuJuTryRoj0bm286fyl7K
<rest>
bQIDAQAB
-----END PUBLIC KEY-----
```
- replace the content of **backend** project file `config/jwt/prod/public.pem`
- replace the content of the **frontend** project file `src/config/prod/jwt.json`
- rebuild **frontend** assets,

::: warning
Pay attention that the **frontend** key is stored as one-liner with special `new-line` character `\n`.
This format is important and must be kept!
:::

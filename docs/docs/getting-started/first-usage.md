# First usage

## Register

Upon opening project for the first time You will have to create a user.

On login screen click `Register`, and fill out the form - now You can log in using provided E-Mail address.

::: info
As the project name states **Personal** - only one user can be registered. 
Everything in this project was tested with one user only. 
It's possible to register more users by adding changes in security logic, however it was never neither will be intended to work with more users.

Records added in the database **ARE NOT** bound to user/userId so no matter which user will log in - 
everything will work like before.
:::

### Password reset / recovery

This logic is not implemented.

::: tip
While there is no GUI for that, You can still change the password manually:
- get into the backend container: 
```sh
docker exec -it pms-php-fpm bash
```

- call:
```sh
bin/console security:hash-password
```

- type Your new password (no input will be visible), and press enter,
- copy the `Password hash`, example: `$2y$13$0pgvBjgCi4LWV.euSrDyzurZPL825vrgBL5e6TNijFqEXOlNPhfEa`
- go to Your database table `app_user`,
- find Your user, and replace the `password` with `Password hash` from before,
- You can now log in with new password
:::

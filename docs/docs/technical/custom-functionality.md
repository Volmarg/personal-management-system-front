# Custom functionality

There are a lot of customisations on both sides.

Here are some of the most important ones. 

## Backend

- `App\Response\Base\BaseResponse` is used for building frontend response, has access to `toJsonResponse`,
- `ArrayHandler` can be used for reading out frontend requests data, example:

```php
$dataArray = RequestService::tryFromJsonBody($request);
$login     = ArrayHandler::get($dataArray, 'login');
$url       = ArrayHandler::get($dataArray, 'url');
```

## Frontend

**this**

Context of **Vue** `this` has been extended:

- `this.$axios` - ajax calls,
- `this.$moduleCall` - handler for the `backend pattern routes`,
- `this.$rootEvent` - accessing events that are otherwise present only on app / root page component,
- `this.$view` - handling user view (scrolling etc.),

**Translations**

Translations can be added to any new translation file inside: `src/translations/en-US`, there is ofc. limitation to how
deeply You can nest the files.

**Throwing error**

Use `BaseError` for throwing errors.

**Logging**

Use `Logger.ts` for logging, since it has built in logic that will log some errors only on `dev-mode`, else You'll end up
with errors on prod mode as well.
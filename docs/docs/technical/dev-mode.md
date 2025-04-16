# Development mode

Development mode is used for debugging, and working with code. 

## Backend

Edit the `.env` file in the project root, set these values:

```dotenv
APP_ENV=dev
APP_DEBUG=true
```

Edit this file inside project:
```dotenv
docker/php-fpm/php.ini
```

Apply changes:

```ini
;FROM: opcache.enable=1
;TO
opcache.enable=0
```

Afterward rebuild the `pms-php-fpm` container by calling this from project root dir:

```shell
docker compose -f docker-compose.yml up -d --force-recreate --build
```

## Frontend

Bring down dev container permanently by calling this in project root dir:

```shell
docker compose -f docker-compose-prod.yaml pms-front-prod down
```

Call this afterward:

```shell
docker compose -f docker-compose-dev.yaml up -d
```

Or You can just keep both running by adjusting `docker-compose` file on Your own. 
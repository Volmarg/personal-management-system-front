# Migrating from 1.x

## Caution

::: danger

Make a backup of the `database`, `storages`, and `configuration files` - **You have been warned**.

If You are going to use built-in commands, I **strongly** advice to double-check the exported file, 
or even additionally making the backup manually.

**Backup commands:**
::: tabs
== Database and Storage
```sh
bin/console cron:make-backup --help
```
== Configs
```sh
bin/console cron:make-config-backup --help
```
:::


## General information

Versions `2.0.x` don't, and won't have any database related changes - this was planned for smooth transition.

**Database volume**

There are some changes in docker containers, and as the earlier mentioned database backup must be inserted into new volume.

**Storage config**

Storage related logic has changed as well, it's been tested only with default `.env` configuration, so You might need to
change locations of Your storage files, or eventually try to symlink them.

It's about these `.env` keys:
````dotenv
UPLOAD_DIR=
IMAGES_UPLOAD_DIR=
FILES_UPLOAD_DIR=
VIDEOS_UPLOAD_DIR=
MINIATURES_UPLOAD_DIR=
PUBLIC_ROOT_DIR=
````

## Moving to 2.0.x

- update Your current project to the latest version - `1.4.65`,
- clone both backend and frontend to some new directories,
- start the containers,
- check the backend `.env` and `docker-compose` configurations to access the database
  - remove created database tables, and import Your backup,
- move backed-up storage files,
- revert any necessary `.env` configuration,
- revert Your encryption key in `config/packages/config/encryption.yaml`
# Installation

## Get the projects

::: warning
Always use latest versions (release / tag) on both sides, only then it can be guaranteed that everything works fine.
:::

**Clone backend project**

::: tabs
== ssh
```
git clone git@github.com:Volmarg/personal-management-system.git
```
== https
```
git clone https://github.com/Volmarg/personal-management-system.git
```
:::

**Clone frontend project**

::: tabs
== ssh
```
git clone git@github.com:Volmarg/personal-management-system-front.git
```
== https
```
git clone https://github.com/Volmarg/personal-management-system-front.git
```
:::

Alternatively You can just download the source code directly here:

::: tabs
== Backend
```
https://github.com/Volmarg/personal-management-system/releases
```
== Frontend
```
https://github.com/Volmarg/personal-management-system-front/releases
```
:::

Keep in mind that further guides assume that You did used `git clone`, and if You didn't then You need to solve potential upgrade problems on Your own.

## Configure projects

If You plan to run backend and frontend on the same host / machine then there is nothing for You todo here.

However, if for whatever reason You plan to host projects on separate machines then You must adjust given configurations:

**Fronted**

::: tabs
== .env.production
```dotenv
VITE_BACKEND_BASE_URL=
```
:::

:::warning
If You decide to change frontend configuration, then You **must** rebuild the assets - meaning that You have to install 
all necessary `dev` dependencies, and configure Your environment for proper bundling.
:::

## Start the containers

In both case You need to execute these commands from the project root dir!

**Frontend**

```sh
docker compose -f docker-compose-prod.yaml up -d
```

**Backend**

::: tabs
== Standard
```sh
docker compose -f docker-compose.yml up -d
```
== RaspberryPi arm/v7
```sh
docker compose -f docker-compose-pi.yml up -d
```
:::

Wait for `~1-3 min` as the backend container needs to download, and boot everything up (first time takes long).

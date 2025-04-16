# Limitations

## Operating system

This application is developed, and executed in **Linux** environment by using `docker`. 

It's unknown how everything will work out under Windows.

::: warning
**Windows OS**

Even if the project will run inside the docker, it's still possible that some things won't work out.

In fact users of version 1.x have reported in the past problems with some versions of the docker.
:::

## CPU Architecture

This project might not start at all on some CPU Architectures. 

If You have issues with booting the project, then You sadly need to adjust the used `docker-compose` file on Your own.

In best case, finding proper base images should solve the problem. 

For example, this config:

```yaml
  pms-nginx:
    image: yobasystems/alpine-nginx:stable
    container_name: pms-nginx
    hostname: pms-nginx
```

could be replaced with:

```yaml
  pms-nginx:
    image: nginx:bookworm
    container_name: pms-nginx
    hostname: pms-nginx
```

In worst case You'll need to adjust existing `Dockerfiles`, or create Your own ones.

## No docker usage

There is no support for running the app outside of docker.

**Windows OS**

Most of the modules might just work, but pretty sure that ~40% of things will be broken.

**Linux OS**

You still need to adjust Your environment, but other than that once done properly everything will work fine.

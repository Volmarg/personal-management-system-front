#!/bin/bash
DEV_CONTAINER_NAME='pms-front-dev';
PROD_CONTAINER_NAME='pms-front-prod';

   docker container stop "$DEV_CONTAINER_NAME" \
&& docker container start "$PROD_CONTAINER_NAME" \
&& docker exec "$PROD_CONTAINER_NAME" rm -rf ./dist \
&& docker exec "$PROD_CONTAINER_NAME" ./prepare-prod.sh \
&& docker container stop "$PROD_CONTAINER_NAME" \
&& docker container start "$DEV_CONTAINER_NAME";

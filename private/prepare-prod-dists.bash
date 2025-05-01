#!/bin/bash
PROD_CONTAINER_NAME='pms-front-prod';
DEV_CONTAINER_NAME='pms-front-dev';

echo -e "Preparing project dist \n";

   docker container stop "$DEV_CONTAINER_NAME" || true \
&& docker container start "$PROD_CONTAINER_NAME" \
&& docker exec "$PROD_CONTAINER_NAME" rm -rf ./dist \
&& docker exec "$PROD_CONTAINER_NAME" ./prepare-prod.sh \
&& docker container stop "$PROD_CONTAINER_NAME" \
&& docker container start "$DEV_CONTAINER_NAME" || true;

echo -e "Preparing docs dist \n"

npm run docs:build;

echo -e "Finished preparing dist data \n"

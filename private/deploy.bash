#!/bin/bash
HOST_PI="192.168.0.38";
HOST_DEMO='private-host';

USED_HOST='';
DIR='';

if [ "$1" == "pi" ]; then
  DIR="/home/volmarg/Partitions/Apps/pms/personal-management-system-front";
  USED_HOST="$HOST_PI";
fi;

if [ "$1" == "demo" ]; then
  DIR="/var/www/pms/personal-management-system-front";
  USED_HOST="$HOST_DEMO";
fi;

if [[ -z "$USED_HOST" || -z "$DIR" ]]; then
  printf "Invalid target host, got '$1'"
  exit 1;
fi;

rsync -h -v -r -P -t \
--exclude node_modules \
--exclude .git \
--exclude .idea \
--exclude docs \
--stats \
--delete \
./ "$USED_HOST:$DIR"

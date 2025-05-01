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

# on demo, need to update some files content, it's basically prod dist but with extra changes to it
## don't really want different process for demo, with a chance that prod dists will be messed up or will need to build twice
if [ "$1" == "demo" ]; then
  # set demo ON
  ssh "$USED_HOST" "find $DIR -type f -name "*.js" -print0 | xargs -0 sed -i 's/VITE_IS_DEMO:\"false\"/VITE_IS_DEMO:\"true\"/g'"
fi;
#!/bin/bash
rsync -h -v -r -P -t \
--exclude node_modules \
--exclude .git \
--exclude .idea \
--stats \
--delete \
./ 192.168.0.38:/home/volmarg/Partitions/Apps/pms/personal-management-system-front
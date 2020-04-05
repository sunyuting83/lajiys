#!/bin/sh

#set env

#修改PATH node所在目录

basepath=$(cd `dirname $0`; pwd)
export PATH=/usr/local/node/bin:/sbin:/bin:/usr/bin
cd $basepath
node spider/app.js

## add crontab
# crontab -e
# 18 4 * * * /path/movie/spider.sh
# service cron restart
# systemctl restart cron
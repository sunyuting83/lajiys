 #!/bin/bash
echo "start app.js"
while true  
do
  pid=$(lsof -i:5002|awk '{print $2}')
  #echo ${pid}
  if [ ! -n "${pid}" ];then
    echo "restart..."
    basepath=$(cd `dirname $0`; pwd)
    export PATH=/home/sun/program/node/bin:/sbin:/bin:/usr/bin
    cd $basepath
    nohup node app.js > run.log 2 >run.log 2>&1 &
  fi
  sleep 5
done
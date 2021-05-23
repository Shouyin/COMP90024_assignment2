source ../ips.sh


CAD="sudo docker service create \
    --mode global --name cadv --network couchdbnetwork \
    --mount type=bind,src=/,dst=/rootfs,ro=true \
    --mount type=bind,src=/var/run,dst=/var/run,ro=true \
    --mount type=bind,src=/sys,dst=/sys,ro=true \
    --mount type=bind,src=/var/lib/docker/,dst=/var/lib/docker,ro=true \
    --mount type=bind,src=/dev/disk/,dst=/dev/disk,ro=true \
    cadvdd
"

ssh ubuntu@$N1 "mkdir cadd"
ssh ubuntu@$N2 "mkdir cadd"
ssh ubuntu@$N3 "mkdir cadd"
ssh ubuntu@$N4 "mkdir cadd"

scp caddockerfile ubuntu@$N1:~/cadd/dockerfile
scp caddockerfile ubuntu@$N2:~/cadd/dockerfile
scp caddockerfile ubuntu@$N3:~/cadd/dockerfile
scp caddockerfile ubuntu@$N4:~/cadd/dockerfile

ssh ubuntu@$N1 "cd cadd && sudo docker build -t cadvdd ."
ssh ubuntu@$N2 "cd cadd && sudo docker build -t cadvdd ."
ssh ubuntu@$N3 "cd cadd && sudo docker build -t cadvdd ."
ssh ubuntu@$N4 "cd cadd && sudo docker build -t cadvdd ."


ssh ubuntu@$N1 $CAD
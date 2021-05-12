source ../ips.sh

CAD="sudo docker service create \
    --mode global --name cadv --network couchdbnetwork \
    --mount type=bind,src=/,dst=/rootfs,ro=true \
    --mount type=bind,src=/var/run,dst=/var/run,ro=true \
    --mount type=bind,src=/sys,dst=/sys,ro=true \
    --mount type=bind,src=/var/lib/docker/,dst=/var/lib/docker,ro=true \
    --mount type=bind,src=/dev/disk/,dst=/dev/disk,ro=true \
    gcr.io/cadvisor/cadvisor:latest
"

ssh ubuntu@$N1 $CAD
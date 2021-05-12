source ../../ips.sh

DOCKERCONFIGNAME=nginx2

scp nginx.conf ubuntu@$N1:

ssh ubuntu@$N1 "sudo docker config create $DOCKERCONFIGNAME nginx.conf"

ssh ubuntu@$N1 "sudo docker service create \
    --replicas 2 \
    --replicas-max-per-node 1 \
    --name nginx \
    --config source=$DOCKERCONFIGNAME,target=/etc/nginx/nginx.conf \
    --network couchdbnetwork \
    --publish published=80,target=80 \
    --mount type=bind,src=/data/nginx,dst=/usr/share/nginx/html \
    nginx"

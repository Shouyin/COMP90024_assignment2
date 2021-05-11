scp nginx.conf ubuntu@172.26.129.77:

ssh ubuntu@172.26.129.77 "sudo docker config create nginx3 nginx.conf"

ssh ubuntu@172.26.129.77 "sudo docker service create \
    --replicas 2 \
    --replicas-max-per-node 1 \
    --name nginx \
    --config source=nginx3,target=/etc/nginx/nginx.conf \
    --network couchdbnetwork \
    --publish published=80,target=80 \
    --mount type=bind,src=/data/nginx,dst=/usr/share/nginx/html \
    nginx"

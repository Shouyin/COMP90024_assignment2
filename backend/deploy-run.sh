source ../ips.sh

RUNSERVICE="sudo docker service create \
    --name backend \
    --replicas 3 \
    --replicas-max-per-node 1 \
    --network couchdbnetwork \
    --publish published=8000,target=8000 \
    bk
"

ssh ubuntu@$N1 $RUNSERVICE
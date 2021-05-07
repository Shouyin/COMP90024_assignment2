PACK=prometheus.zip
REMOTEFOLDER=prometheus

BUILDCOMM="rm -r -f $REMOTEFOLDER && unzip $PACK -d $REMOTEFOLDER && cd $REMOTEFOLDER && cd $REMOTEFOLDER && sudo docker build -t prom ."

PROM="sudo docker service create \
    --replicas 1 --name prom --network couchdbnetwork \
    --publish published=9090,target=9090 \
    prom \
    --config.file=/etc/prometheus/prometheus.yml
"

zip -r $PACK prometheus

echo "sending $PACK to all nodes.."
scp $PACK ubuntu@172.26.129.77: && \
scp $PACK ubuntu@172.26.133.93: && \
scp $PACK ubuntu@172.26.130.32: && \
scp $PACK ubuntu@172.26.129.7:

echo "building docker image.."
ssh ubuntu@172.26.129.77 $BUILDCOMM
ssh ubuntu@172.26.133.93 $BUILDCOMM
ssh ubuntu@172.26.130.32 $BUILDCOMM
ssh ubuntu@172.26.129.7 $BUILDCOMM

echo "starting"
ssh ubuntu@172.26.129.77 $PROM
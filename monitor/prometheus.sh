source ../ips.sh

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
scp $PACK ubuntu@$N1: && \
scp $PACK ubuntu@$N2: && \
scp $PACK ubuntu@$N3: && \
scp $PACK ubuntu@$N4:

echo "building docker image.."
ssh ubuntu@$N1 $BUILDCOMM
ssh ubuntu@$N2 $BUILDCOMM
ssh ubuntu@$N3 $BUILDCOMM
ssh ubuntu@$N4 $BUILDCOMM

echo "starting"
ssh ubuntu@$N1 $PROM
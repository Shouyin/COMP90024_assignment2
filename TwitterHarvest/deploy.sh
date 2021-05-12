source ../ips.sh

PACK=th.zip
BUILDCOMM="rm -r -f th && unzip th.zip -d th && cd th && sudo docker build -t th ."

echo "packing to $PACK.."
zip -r $PACK dockerfile TwitterHarvest

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
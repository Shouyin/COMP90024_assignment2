PACK=th.zip
BUILDCOMM="rm -r -f th && unzip th.zip -d th && cd th && sudo docker build -t th ."

echo "packing to $PACK.."
zip -r $PACK dockerfile TwitterHarvest

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
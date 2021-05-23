PACKNAME=bk
PACK=bk.zip
BUILDCOMM="rm -r -f $PACKNAME && unzip $PACK -d $PACKNAME && cd $PACKNAME && sudo docker build -t $PACKNAME ."

source ../ips.sh

echo "packing to $PACK.."
zip -r $PACK app.py dockerfile requirements.txt #!!

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
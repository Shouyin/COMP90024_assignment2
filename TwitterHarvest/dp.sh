PACK=th
BUILDCOMM="rm -r -f th && unzip th.zip -d th && cd th && sudo docker build -t th ."


scp $PACK ubuntu@172.26.129.77: && \
scp $PACK ubuntu@172.26.133.93: && \
scp $PACK ubuntu@172.26.130.32: && \
scp $PACK ubuntu@172.26.129.7:


ssh ubuntu@172.26.129.77 $BUILDCOMM
ssh ubuntu@172.26.133.93 $BUILDCOMM
ssh ubuntu@172.26.130.32 $BUILDCOMM
ssh ubuntu@172.26.129.7 $BUILDCOMM
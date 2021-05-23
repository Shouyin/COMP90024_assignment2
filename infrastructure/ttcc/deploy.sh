source ../../ips.sh

zip -r Archive1.zip cc.sh config.ini Dockerfile en.sh vm.args cdbdisv.sh

scp Archive1.zip ubuntu@$N1:
scp Archive1.zip ubuntu@$N2:
scp Archive1.zip ubuntu@$N3:
scp Archive1.zip ubuntu@$N4:

BUIL="rm -r -f couchdbtest && unzip Archive1.zip -d couchdbtest && cd couchdbtest && sudo docker build -t cclu ."
ssh ubuntu@$N1 $BUIL
ssh ubuntu@$N2 $BUIL
ssh ubuntu@$N3 $BUIL
ssh ubuntu@$N4 $BUIL


SERVICENAME=couchdb
DEPL="sudo docker service create --replicas 3 --name $SERVICENAME --network couchdbnetwork \
  --replicas-max-per-node 1 \
  --hostname="couchdb{{.Task.Slot}}" \
  -e NODENAME="{{.Service.Name}}.{{.Task.Slot}}.{{.Task.ID}}" \
  -e SERVICE_NAME="{{.Service.Name}}" \
  -e TASK_SLOT="{{.Task.Slot}}" \
  --publish published=5984,target=5984 \
  --mount type=bind,src=/data/dbn,dst=/opt/couchdb/data \
  cclu && \

  nohup bash couchdbtest/cdbdisv.sh"

ssh ubuntu@$N1 $DEPL
sudo docker service create --replicas 3 --name couchdb --network couchdbnetwork \
  --hostname="couchdb{{.Task.Slot}}" \
  -e NODENAME="{{.Service.Name}}.{{.Task.Slot}}.{{.Task.ID}}" \
  -e SERVICE_NAME="{{.Service.Name}}" \
  -e TASK_SLOT="{{.Task.Slot}}" \
  --publish published=5984,target=5984 \
  --mount type=bind,src=/data/db,dst=/opt/couchdb/data \
  cclu
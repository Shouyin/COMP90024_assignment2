sudo docker swarm init --advertise-addr {{ ansible_os_family }}
# init swarm
# get token

sudo docker service create --replicas 3 --name couchdb --network couchdbnetwork \
  --hostname="couchdb{{.Task.Slot}}" \
  -e NODENAME="couchdb{{.Task.Slot}}" \
  -e SERVICE_NAME="{{.Service.Name}}" \
  -e TASK_SLOT="{{.Task.Slot}}" \
  --publish published=5984,target=5984 \
  cclu

sudo docker network create --attachable --driver overlay --subnet 10.0.8.0/24 --opt encrypted couchdbnetwork
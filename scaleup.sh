source ips.sh

if [[ -z "${SERV}" ]]; then
  echo "no service SERV specified"
  exit 1
fi

REPLICA=$(ssh ubuntu@$N1 "sudo docker service ps $SERV | grep Running | wc -l")
OL=$(expr $REPLICA + 1)
ssh ubuntu@$N1 "sudo docker service scale $SERV=$OL"
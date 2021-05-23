source ips.sh

if [[ -z "${SERV}" ]]; then
  echo "no service SERV specified"
  exit 1
fi

if [[ -z "${SCAL}" ]]; then
  echo "no scale num SCAL specified"
  exit 1
fi

ssh ubuntu@$N1 "sudo docker service scale $SERV=$SCAL"


source ../ips.sh

if [[ -z "${TH_CITYNAME}" ]]; then
  echo "no CITYNAME (-re) specified"
  exit 1
fi



ssh ubuntu@$N1 "sudo docker service rm ${TH_CITYNAME}"
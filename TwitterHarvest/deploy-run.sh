if [[ -z "${TH_DB}" ]]; then
  echo "no TH_DB (-db) specified"
  exit 1
fi

if [[ -z "${TH_CITYNAME}" ]]; then
  echo "no CITYNAME (-re) specified"
  exit 1
fi


source ../ips.sh


# if [[ -z "${TH_KWCITYNAME}" ]]; then
#   echo "no CITYNAME (-kwreg) specified"
#   exit 1
# fi

RUNSERVICE="sudo docker service create \
    --name ${TH_CITYNAME} \
    --network couchdbnetwork \
    -e TH_DB=${TH_DB} \
    -e TH_CITYNAME=${TH_CITYNAME} \
    -e TH_KWCITYNAME=${TH_CITYNAME} \
    th
"

ssh ubuntu@$N1 $RUNSERVICE
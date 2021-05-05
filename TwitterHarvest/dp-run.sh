if [[ -z "${TH_DB}" ]]; then
  echo "no TH_DB (-db) specified"
  exit 1
fi

if [[ -z "${TH_CITYNAME}" ]]; then
  echo "no CITYNAME (-re) specified"
  exit 1
fi


if [[ -z "${TH_KWCITYNAME}" ]]; then
  echo "no CITYNAME (-kwreg) specified"
  exit 1
fi

RUNSERVICE="sudo docker service create \
    --name th_{$TH_DB}_re-${TH_CITYNAME}_kw-${TH_KWCITYNAME} \
    --network couchdbnetwork \
    -e TH_DB={$TH_DB} \
    -e TH_CITYNAME=${TH_CITYNAME} \
    -e TH_KWCITYNAME=${TH_KWCITYNAME} \
    th
"

ssh ubuntu@172.26.129.77 $RUNSERVICE
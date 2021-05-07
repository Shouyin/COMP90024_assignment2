if [[ -z "${TH_CITYNAME}" ]]; then
  echo "no CITYNAME (-re) specified"
  exit 1
fi



ssh ubuntu@172.26.129.77 "sudo docker service rm ${TH_CITYNAME}"
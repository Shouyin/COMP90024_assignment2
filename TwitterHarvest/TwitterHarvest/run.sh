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

python /TwitterHarvest/tweet_harvest.py \
    -db $TH_DB \
    -re $TH_CITYNAME \
    -kwreg $TH_KWCITYNAME
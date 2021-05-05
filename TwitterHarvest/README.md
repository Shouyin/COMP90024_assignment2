# Deploy the Harvester



## You need

- zuom.key (private key)



## Steps

1. Add `zuom.key` to your ssh agent using `eval "$(ssh-agent -s)" && ssh-add zuom.key`

2. run `dp.sh`

   1. It will zip the TwitterHarvester, send it to all nodes and build the docker images on them.

3. IF you’re deploying the harvester for the **first time**: run `dp-run.sh`, meanwhile setting up the environment variable like this:

   1. ``````
      TH_DB=test1 TH_CITYNAME=Melbourne TH_KWCITYNAME=Melbourne bash dp-run.sh
      ``````

4. IF you’re updating the harvester: NOT DONE YET



NOTICE that the service will be named using the `TH_CITYNAME` environment variable, and two services CANNOT use the same name.



# Python library Requirements



#### tweet_harvest.py

- couchdb
- TwitterAPI

#### store.py

- requests
- textblob



# How to run

Run tweet_harvest.py:

```
python tweet_harvest.py -db DATABASE_NAME -re CITY_NAME -kwreg CITY_NAME
```

``````
python tweet_harvest.py -db DATABASE_NAME(e.g. test1) -re CITY_NAME(e.g. Melbourne/Sydney/Canberra/Brisbane) -kwreg CITY_NAME(e.g. Melbourne/Sydney/Canberra/Brisbane)
``````



# Deploy the Harvester



## Steps

you need a recognized ssh key

``````
deploy.sh
deploy-cities.sh
``````





# Shutdown

You can use

``````
TH_CITYNAME=Melbourne bash shutdown.sh
``````

to shutdown (and remove) the harvester of Melbourne.

Since we are giving -re and -kw same city, then only one city name is required.



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




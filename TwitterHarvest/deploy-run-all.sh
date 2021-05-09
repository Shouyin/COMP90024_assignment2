TH_CITYNAME=Canberra bash shutdown.sh && \
TH_CITYNAME=Melbourne bash shutdown.sh && \
TH_CITYNAME=Brisbane bash shutdown.sh &&\
TH_CITYNAME=Sydney bash shutdown.sh

bash deploy.sh

TH_DB=test1 TH_CITYNAME=Melbourne TH_KWCITYNAME=Melbourne bash deploy-run.sh && \
TH_DB=test1 TH_CITYNAME=Canberra TH_KWCITYNAME=Canberra bash deploy-run.sh && \
TH_DB=test1 TH_CITYNAME=Sydney TH_KWCITYNAME=Sydney bash deploy-run.sh && \
TH_DB=test1 TH_CITYNAME=Brisbane TH_KWCITYNAME=Brisbane bash deploy-run.sh
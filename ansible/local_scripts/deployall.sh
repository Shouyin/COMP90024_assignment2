PH="$(pwd)"
echo local_script
cd "local_script/../../infrastructure/ttcc/" && \
bash deploy.sh
cd "local_script/../../frontend"  && \
bash deploy.sh
cd "local_script/../../backend"  && \
bash deploy.sh  && \
bash deploy-run.sh
cd "local_script/../../infrastructure/nginx"  && \
bash deploy-run.sh

cd "local_script/../../monitor"  && \
bash cadvisor.sh  && \
bash prometheus.sh

cd "local_script/../../TwitterHarvest"  && \
bash deploy.sh  && \
bash deploy-cities.sh
source ../ips.sh

yarn build
zip -r build.zip build/

scp build.zip ubuntu@$N1: && \
scp build.zip ubuntu@$N2: && \
scp build.zip ubuntu@$N3: && \
scp build.zip ubuntu@$N4:

ssh ubuntu@$N1 "unzip build.zip -d /data && sudo rm -r -f /data/nginx/* && mv -f /data/build/* /data/nginx/"
ssh ubuntu@$N2 "unzip build.zip -d /data && sudo rm -r -f /data/nginx/* && mv -f /data/build/* /data/nginx/"
ssh ubuntu@$N3 "unzip build.zip -d /data && sudo rm -r -f /data/nginx/* && mv -f /data/build/* /data/nginx/"
ssh ubuntu@$N4 "unzip build.zip -d /data && sudo rm -r -f /data/nginx/* && mv -f /data/build/* /data/nginx/"
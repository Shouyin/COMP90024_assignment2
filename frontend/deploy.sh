yarn build
zip -r build.zip build/

scp build.zip ubuntu@172.26.129.77: && \
scp build.zip ubuntu@172.26.133.93: && \
scp build.zip ubuntu@172.26.130.32: && \
scp build.zip ubuntu@172.26.129.7:

ssh ubuntu@172.26.129.77 "unzip build.zip -d /data && rm -r -f /data/nginx && mv -f /data/build /data/nginx"
ssh ubuntu@172.26.133.93 "unzip build.zip -d /data && rm -r -f /data/nginx && mv -f /data/build /data/nginx"
ssh ubuntu@172.26.130.32 "unzip build.zip -d /data && rm -r -f /data/nginx && mv -f /data/build /data/nginx"
ssh ubuntu@172.26.129.7 "unzip build.zip -d /data && rm -r -f /data/nginx && mv -f /data/build /data/nginx"
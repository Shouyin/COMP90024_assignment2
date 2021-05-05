FROM couchdb

ENV COUCHDB_USER=dbuser
# ENV COUCHDB_PASSWORD=weakpw123

ENV COUCHDB_COOKIE="ass2cookie"

ENV HTTP_PROXY=http://wwwproxy.unimelb.edu.au:8000/

ENV HTTPS_PROXY=http://wwwproxy.unimelb.edu.au:8000/

ENV http_proxy=http://wwwproxy.unimelb.edu.au:8000/

ENV https_proxy=http://wwwproxy.unimelb.edu.au:8000/

ENV no_proxy="localhost,127.0.0.1,localaddress,172.16.0.0/12,.melbourne.rc.nectar.org.au,.storage.unimelb.edu.au,.cloud.unimelb.edu.au,couchdb1,couchdb2,couchdb3,couchdb4"

RUN apt install -y curl

ENV ERL_FLAGS="-setcookie ass2cookie"

ENV no_proxy1=${no_proxy}
ENV no_proxy="*"

# ENV COUCHDB_SECRET="mysecret"

COPY cc.sh /cc.sh
COPY vm.args /home/couchdb/couchdb/etc/vm.args
COPY config.ini /opt/couchdb/etc/local.d/config.ini

# COPY ep.sh /ep.sh

# RUN echo "-name couchdb@couchdb${TASK_SLOT}" >> /home/couchdb/couchdb/etc/vm.args
RUN echo "-cookie \"$COUCHDB_COOKIE\"" >> /home/couchdb/couchdb/etc/vm.args

# CMD ["/bin/bash", "/ep.sh"]

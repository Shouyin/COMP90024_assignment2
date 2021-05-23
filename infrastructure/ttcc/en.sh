curl --max-time 2 172.26.129.125:3001
(sleep 10 && \
    (curl --max-time 2 172.26.129.125:3001 | \
        while read -r a; \
            do curl -X PUT "http://admin:weakpw123@127.0.0.1:5984/_node/_local/_nodes/couchdb@$a" -d {}; done))&

tini -- /docker-entrypoint.sh /opt/couchdb/bin/couchdb
echo "Starting cc: task slot $TASK_SLOT"

sleep 10

curl -X POST -H "Content-Type: application/json" http://$COUCHDB_USER:$COUCHDB_PASSWORD@127.0.0.1:5984/_cluster_setup -d \
        "{\"action\": \"enable_cluster\", \"bind_address\":\"0.0.0.0\", \"username\": \"$COUCHDB_USER\", \"password\":\"$COUCHDB_PASSWORD\", \"node_count\":\"3\"}"

if [ $TASK_SLOT -eq 1 ]; then
    echo "Setting up primary node..."

    # Create system databases if they don't already exist
    # missing=`curl -X GET http://$COUCHDB_USER:$COUCHDB_PASSWORD@couchdb1:5984/_users | grep 'not_found'`

    sleep 20

    #if [ "$missing" ]; then
    #    # Sleep so that when we create the databases, they will be distributed over all our nodes
    #    sleep 60
    #    curl -X PUT http://$COUCHDB_USER:$COUCHDB_PASSWORD@couchdb1:5984/_users
    #    curl -X PUT http://$COUCHDB_USER:$COUCHDB_PASSWORD@couchdb1:5984/_replicator
    #    curl -X PUT http://$COUCHDB_USER:$COUCHDB_PASSWORD@couchdb1:5984/_global_changes
    # fi

    curl -X POST -H "Content-Type: application/json" http://$COUCHDB_USER:$COUCHDB_PASSWORD@couchdb1:5984/_cluster_setup -d '{"action": "finish_cluster"}'

else
    sleep 10
    echo "Setting up secondary node..."

    curl -X POST -H "Content-Type: application/json" http://$COUCHDB_USER:$COUCHDB_PASSWORD@couchdb1:5984/_cluster_setup -d \
        "{\"action\": \"enable_cluster\", \"bind_address\":\"0.0.0.0\", \"username\": \"$COUCHDB_USER\", \"password\":\"$COUCHDB_PASSWORD\", \"node_count\":\"3\", \"remote_node\": \"couchdb$TASK_SLOT\", \"remote_current_user\": \"$COUCHDB_USER\", \"remote_current_password\": \"$COUCHDB_PASSWORD\"}"
    curl -X POST -H "Content-Type: application/json" http://$COUCHDB_USER:$COUCHDB_PASSWORD@couchdb1:5984/_cluster_setup -d \
        "{\"action\": \"add_node\", \"host\":\"couchdb$TASK_SLOT\", \"port\": 5984, \"username\": \"$COUCHDB_USER\", \"password\":\"$COUCHDB_PASSWORD\"}"

fi
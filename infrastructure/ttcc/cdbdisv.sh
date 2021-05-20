(while : ; \
        do ( sudo docker service ps couchdb \
            -q --format "{{.Name}}.{{.ID}}" --filter "desired-state=Running"; ) | nc -l -p 3001 ; done) &> /dev/null &
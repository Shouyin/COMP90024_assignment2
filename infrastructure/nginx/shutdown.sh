source ../../ips.sh

ssh ubuntu@$N1 "sudo docker service rm nginx"
ssh ubuntu@$N1 "sudo docker config ls --filter=\"name=nginx\" -q | xargs sudo docker config rm"
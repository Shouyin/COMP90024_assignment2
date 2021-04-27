sudo docker swarm init --advertise-addr {{ ansible_default_ipv4.address }} > ~/swarminit.txt
# init swarm
# get token
sudo docker swarm join-token worker -q
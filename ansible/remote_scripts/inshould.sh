# append to /env/environment
sudo chmod 646 /etc/environment

sudo echo "\
HTTP_PROXY=http://wwwproxy.unimelb.edu.au:8000/ \

HTTPS_PROXY=http://wwwproxy.unimelb.edu.au:8000/ \

http_proxy=http://wwwproxy.unimelb.edu.au:8000/ \

https_proxy=http://wwwproxy.unimelb.edu.au:8000/ \

no_proxy=localhost,127.0.0.1,localaddress,172.16.0.0/12,.melbourne.rc.nectar.org.au,.storage.unimelb.edu.au,.cloud.unimelb.edu.au \
" >> /etc/environment

sudo chmod 644 /etc/environment

echo ""
echo "added http proxy to the environment"
echo "======================="

source /etc/environment

# installing docker
echo ""
echo "install docker"
echo "======================="
sudo apt-get update

sudo apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo rm -f /usr/share/keyrings/docker-archive-keyring.gpg
curl -fsSL -x $HTTP_PROXY https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get -y install docker-ce docker-ce-cli containerd.io

sudo mkdir ~/.docker
sudo echo "
{
 \"proxies\":
 {
   \"default\":
   {
     \"httpProxy\": \"$HTTP_PROXY\",
     \"httpsProxy\": \"$HTTPS_PROXY\",
   }
 }
}
" > ~/.docker/config.json

echo ""
echo "configure docker service and restart service"
echo "======================="

sudo mkdir /etc/systemd/system/docker.service.d

sudo touch /etc/systemd/system/docker.service.d/http-proxy.conf

sudo chmod 644 /etc/systemd/system/docker.service.d/http-proxy.conf

sudo echo "
[Service]
Environment=\"HTTP_PROXY=$HTTP_PROXY\"
Environment=\"HTTPS_PROXY=$HTTPS_PROXY\"
" | sudo tee /etc/systemd/system/docker.service.d/http-proxy.conf

sudo systemctl daemon-reload

sudo systemctl restart docker

sudo docker run hello-world
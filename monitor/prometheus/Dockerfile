FROM prom/prometheus

ENV HTTP_PROXY=http://wwwproxy.unimelb.edu.au:8000/

ENV HTTPS_PROXY=http://wwwproxy.unimelb.edu.au:8000/

ENV http_proxy=http://wwwproxy.unimelb.edu.au:8000/

ENV https_proxy=http://wwwproxy.unimelb.edu.au:8000/

ENV no_proxy="localhost,127.0.0.1,localaddress,172.16.0.0/12,.melbourne.rc.nectar.org.au,.storage.unimelb.edu.au,.cloud.unimelb.edu.au,cadv"

COPY prometheus.yml /etc/prometheus/prometheus.yml
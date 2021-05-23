import requests
import os
import time

QUERY="sum(rate(container_cpu_user_seconds_total{container_label_com_docker_swarm_service_name=~\"nginx\",id=~\"/docker/.*\"} [1m])*100)"
LIMIT=600000
UR="http://172.26.129.125:9090/api/v1/query?query="
COMMSH="bash scaleup.sh"

def query(query):
    rp = requests.get(UR + query)
    return rp.json()["data"]["result"]

def scaleup(service):
    print("scaling..")
    os.system("SERV=" + service + " " + COMMSH)
    print("done")

'''def gather(metrics, qr):

    TS = "ts"

    ts = -1
    if TS in metrics:
        ts = metrics[TS]
    
    newMetrics = {}

    result = query(qr)
    print("===============================")
    for i in result:
        if "image" in i["metric"]:
            newMetrics[TS] = i["value"][0]
            service = i["metric"]["name"].split(".")[0]
            sv = float(i["value"][1])
            if ts != -1 and service in metrics:
                tdelta = i["value"][0] - ts
                dv = (sv - float(metrics[service])) / tdelta
                print(service, " : ", dv, "s")
            newMetrics[service] = sv
    return newMetrics'''

def gather1(service):
    qr = "sum(rate(container_cpu_user_seconds_total{container_label_com_docker_swarm_service_name=\"" + service + "\"} [1m])*100)"
    result = query(qr)
    print("===============================")
    i = result[0]
    print(i)
    sv = float(i["value"][1])
    print(service, ":", sv)
    return sv
       
if __name__ == "__main__":
    print(QUERY)
    LIMIT = 0
    sd = False
    while True:
        sv = gather1("nginx")
        if sv >= LIMIT and not sd:
            print("nginx needs scaling: " + QUERY + ">=" + str(LIMIT))
            scaleup("nginx")
            sd = True
        time.sleep(2)
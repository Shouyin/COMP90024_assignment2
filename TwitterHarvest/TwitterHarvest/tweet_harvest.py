"""
COMP90024 Cluster and CLoud Computing Assignment 2
Cities: Melbourne, Sydney, Brisbane, Canberra
"""

import sys
import json
import store
import couchdb
import argparse
import threading
from TwitterAPI.TwitterAPI import TwitterAPI


KEYWORD_LIST = ['beer', 'boba tea', 'tea', 'whiskey', 'tequila', 'juice', 'milk', 'bubble tea', '#thai food', 'korean food', 'sushi', 'hamburgers', 'burgers', 'hotpot', '#Chinese food', 'dumplings', 'noodles', 'soup', 'fries', 'steak', 'ice cream', '#cheese', 'youghurt', 'froyo', '#ScottMorrison', '#COVID19', '#bushfire', '#jobseekers', '#kangarooisland', '#naturalHazard', '#Recruiting', '#Staffing', '#Hiring', '#jobsearch']

# json files
JSON_PATH = "json_files/"
FILE_DICT = {
    "db_auth": "db_auth.json",
    "twitter_api": "twitterAPI_auth.json",
    "bounding": "bounding_squares.json",
    "geocode": "geocode.json"
    }

# list of user ids for timeline harvesting
uid_ls = []

def get_args():
    """ Obtaining args from terminal """
    parser = argparse.ArgumentParser(description="Processing tweets")

    # database name
    parser.add_argument("-db", "--db_name", type = str, required = True, 
                        help = "Name of Database for storing")
    parser.add_argument("-re", "--region", type = str, required = True, 
                        help = "Melbourne/Brisbane/Sydney/Canberra")
    parser.add_argument("-kwreg", "--keyword_region", type = str, required = True, 
                        help = "Melbourne/Brisbane/Sydney/Canberra")               
    args = parser.parse_args()
    
    return args

def read_jsons():
    """ Read required json files """
    # bounding boxes for twitter stream API
    with open(JSON_PATH + FILE_DICT["bounding"], "r") as f:
        bounding = json.load(f)

    with open(JSON_PATH + FILE_DICT["db_auth"], "r") as f:
        db_auth = json.load(f)

    # Twitter authentication credentials
    with open(JSON_PATH + FILE_DICT["twitter_api"], "r") as f:
        api_auths = json.load(f)["keys"]

    with open(JSON_PATH + FILE_DICT["geocode"], "r") as f:
        geocode = json.load(f)

    return bounding, db_auth, api_auths, geocode

def twitter_user_timeline(api, db_name):
    """ Getting tweets from user timeline """

    while True:
        # wait until has task
        if(len(uid_ls) == 0):
            continue

        # requesting timeline
        uid = uid_ls.pop(0)

        try:
            for item in api.request("statuses/user_timeline", {"user_id": uid, "count": 200}):
                if ("text" in item) and (item['lang'] == 'en') and (item['place'] != None):

                    # save tweet to database
                    store.save_tweet(db_name, item)

                elif 'message' in item:
                    print('80 ERROR in current Tweet %s: %s\n' % (item['code'], item['message']))
        except Exception as e:
            print("82 ERROR", str(e))
            pass


def twitter_keyword_search(api, db_name, kw_region):
    """ Real-time twitter streaming """
    for word in KEYWORD_LIST:
        try:
            for item in api.request("search/tweets", {"q": word, 
                                                "count": 100,
                                                "lang": "en", 
                                                "geocode": kw_region}):
                if ("text" in item) and (item['place'] != None):
                    #print('SEARCH: %s -- %s\n' % (item['user']['screen_name'], item['text']))
                    # save tweet to database
                    store.save_tweet(db_name, item)
                    uid_ls.append(item["user"]["id"])

                elif 'message' in item:
                    print('101 ERROR %s: %s\n' % (item['code'], item['message']))
        except Exception as e:
            print("103 ERROR", str(e))
            pass



def twitter_streaming(api, db_name, bounding, region):
    """ Real-time twitter streaming """

    # requesting tweets (in bounding box of specified region)

    while True:
        try:
            for item in api.request("statuses/filter", {"locations": bounding[region]}):
                if ("text" in item) and (item['place'] != None):
                    # print('STREAM: %s -- %s\n' % (item['user']['screen_name'], item['text']))

                    # save tweet to database
                    store.save_tweet(db_name, item)
                    uid_ls.append(item["user"]["id"])

                elif 'message' in item:
                    print('124 ERROR in current Tweet %s: %s\n' % (item['code'], item['message']))
        except Exception as e:
            print("126 ERROR", str(e))
            pass

def main():

    # get arguments
    args = get_args()

    # read required json files
    bounding, db_auth, api_auths, geocode = read_jsons()

    # pass authentication credentials url
    url = "http://" + db_auth["user"] + ":" + db_auth["pwd"] \
                    + "@" + db_auth["ip"] + ":" + db_auth["port"] + "/"
    
    server = couchdb.Server(url=url)
    try:
        # new db
        db = server.create(args.db_name)

    except:
        # existing db
        db = server[args.db_name]

    apis = []
    for api_auth in api_auths:
        api = TwitterAPI(api_auth["API_KEY"],
                        api_auth["API_SECRET"], 
                        api_auth["ACCESS_TOKEN"], 
                        api_auth["ACCESS_TOKEN_SECRET"])
        apis.append(api)

    t1 = threading.Thread(target=twitter_streaming, args=(apis[0], db, bounding, args.region))
    t2 = threading.Thread(target=twitter_keyword_search, args=(apis[1], db, geocode[args.keyword_region]))
    t3 = threading.Thread(target=twitter_user_timeline, args=(apis[2], db))
    
    # start streaming and getting timelines
    t1.start()
    t2.start()
    t3.start()

if __name__ == "__main__":
    main()
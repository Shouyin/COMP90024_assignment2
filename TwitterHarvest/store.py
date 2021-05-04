import couchdb
import json
import requests
from textblob import TextBlob


def _emotion(tweet_text):
    res = requests.get('http://senpy.gsi.upm.es/api/emotion-depechemood',
                       params={"input": tweet_text})
    return json.loads(res.text)


def _sentiment(tweet_text):
    return TextBlob(tweet_text).sentiment


def save_tweet(db, tweet):
    """ save tweet returned by twitter with tweet id as doc_id """

    try:
        tid = tweet["id_str"]
        tweet["_id"] = tid
        if tid in db:
            # updating
            doc = db[tid]
            if "senpy" not in doc.keys() or doc["senpy"] == None:
                # update with senpy
                doc["senpy"] = _emotion(doc["text"])
            if "textblob" not in doc.keys() or doc["textblob"] == None:
                # update with textblob
                doc["textblob"] = _sentiment(doc["text"])[0]  # two element tuple, the first one is selected
            db[tid] = doc
            print("UPDATE DOC ", tid)
        else:
            # new doc

            # save tweets
            new_tweet = dict()  # create a new dict (document) to be stored in couchDB
            new_tweet["_id"] = tweet["id_str"]
            new_tweet["text"] = tweet["text"]
            new_tweet["time"] = tweet["created_at"]

            new_tweet["city"] = tweet["place"]["name"]
            new_tweet["senpy"] = _emotion(tweet["text"])
            new_tweet["textblob"] = _sentiment(tweet["text"])[0]  # two element tuple, the first one is selected
            
            saved_tweet = json.loads(new_tweet)
            db.save(saved_tweet)
            print("NEW DOC ", tid)
    except Exception as e:
        print("ERROR: ", str(e))
        pass


# if __name__ == '__main__':
#     # couch = couchdb.Server('http://admin:111@192.168.2.232:5984/')
#     couch = couchdb.Server('http://admin:weakpw123@172.26.129.77:5984/')

#     # db = couch.create('test1') # 新建数据库
#     db = couch['test1']

#     test_tweet = ['{"created_at": "Sun May 02 02:53:57 +0000 2021","id": 111111111,"id_str": "111111111","text": "Gym Dadding today. It\u2019s her first competition in about 18 months, and the first at her new club. https://t.co/8Z1ft1n1qf","user": {"id": 15578810,"id_str": "15578810","name": "Brendan Waite"},"place": {"id": "004ec16c62325149","url": "https://api.twitter.com/1.1/geo/id/004ec16c62325149.json","place_type": "city","name": "Brisbane","full_name": "Brisbane, Queensland"}}',
#                   '{"created_at": "Sun May 02 02:53:57 +0000 2020","id": 2222222,"id_str": "2222222","text": "i am the tweet 2, and i love you, i am happy","user": {"id": 15578810,"id_str": "15578810","name": "Brendan Waite"},"place": {"id": "004ec16c62325149","url": "https://api.twitter.com/1.1/geo/id/004ec16c62325149.json","place_type": "city","name": "Melbourne","full_name": "Brisbane, Queensland"}}',
#                   '{"created_at": "Sun May 02 02:53:57 +0000 2020","id": 3333333,"id_str": "3333333","text": "i am tweet 3, and i hate you, i am angry", "user": {"id": 15578810,"id_str": "15578810","name": "Brendan Waite"},"place": {"id": "004ec16c62325149","url": "https://api.twitter.com/1.1/geo/id/004ec16c62325149.json","place_type": "city","name": "Sydney","full_name": "Brisbane, Queensland"}}',
#                   '{"created_at": "Sun May 02 02:53:57 +0000 2019","id": 444444444,"id_str": "444444444","text": "i am tweet 4, and i am a pig, i love human","user": {"id": 15578810,"id_str": "15578810","name": "Brendan Waite"},"place": {"id": "004ec16c62325149","url": "https://api.twitter.com/1.1/geo/id/004ec16c62325149.json","place_type": "city","name": "Melbourne","full_name": "Brisbane, Queensland"}}'
#                   ]

#     for tweet_raw in test_tweet:
#         tweet = json.loads(tweet_raw)
#         save_tweet(db, tweet)


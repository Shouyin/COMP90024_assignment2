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

def clean_tweet(tweet):
    tweet_info = ['created_at', 'id_str', 'text', 'user', 'place']
    user_info = ['id', 'location', 'description', 'verified', 'followers_count', 'friends_count', \
        'listed_count', 'favourites_count', 'statuses_count']
    place_info = ['id', 'place_type', 'name', 'bounding_box']

    clean = {}

    for info in tweet_info:
        if info:
            if info == 'user':
                user = {}
                for descrp in user_info:
                    user[descrp] = tweet['user'][descrp]
                clean['user'] = user

            elif info == 'created_at':
                clean["time"] = tweet[info]

            elif info == 'id_str':
                clean["_id"] = tweet["id_str"]

            elif info == 'place':
                place = {}
                for descrp in place_info:
                    if descrp:
                        if descrp == 'name':
                            clean["city"] = tweet[info][descrp]
                        place[descrp] = tweet['place'][descrp]
                clean['place'] = place

            else:
                clean[info] = tweet[info]

    # add sentiment
    if ("senpy" not in clean.keys()) or (clean["senpy"] == None):
        clean["polarity"] = _sentiment(clean["text"])[0]
        clean["subjectivity"] = _sentiment(clean["text"])[1]
        clean["emotion"] = _emotion(clean["text"])
    

    return clean


def save_tweet(db, tweet):
    """ save tweet returned by twitter with tweet id as doc_id """

    try:
    # save tweets
        new_tweet = clean_tweet(tweet) 
        db.save(new_tweet)
        print("NEW DOC ", new_tweet['_id'])

    except Exception as e:
        print("storage ERROR: ", str(e))
        pass

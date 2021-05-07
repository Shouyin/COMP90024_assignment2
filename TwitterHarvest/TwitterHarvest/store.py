import couchdb
import json
import numpy as np
import requests
from textblob import TextBlob


def _emotion(tweet_text):
    res = requests.get('http://senpy.gsi.upm.es/api/emotion-depechemood',
                       params={"input": tweet_text})
    return json.loads(res.text)

def _sentiment(tweet_text):
    return TextBlob(tweet_text).sentiment

########## functions to find location of a tweet ##########

def find_bounds(json_path):
    '''
    sort latitudes for the four cities by reading bounding_squares.json
    '''
    with open(json_path, 'r') as f:
        bounding_box = json.load(f)
    bounds = [(k, list(map(float, v.split(', ')))) for k,v in bounding_box.items()]
    bounds = sorted(bounds, key=lambda x: x[1][0])

    return bounds

# hard code bounds information
bounds = [('Melbourne', [144.425, -38.52, 146.21, -37.38]),
        ('Canberra', [150.1, -35.746672, 149.688624, -34.196]),
        ('Sydney', [150.24, -34.195, 151.365, -33.345]),
        ('Brisbane', [152.676, -27.664, 153.472, -27.018])]

x = [144.425, 146.21, 149.688624, 150.1, 150.24, 151.365, 152.676, 153.472]

cities = ['Melbourne', 'Canberra', 'Sydney', 'Brisbane']

def x_rank(x, coor):
    '''
    return relative position of an coordinate
    '''
    x_copy = x.copy()
    x_copy.append(coor)
    rank = np.array(x_copy).argsort()
    pos = np.where(rank==8)[0][0]
    if pos%2: # current coor is between bounds of a city
        idx = pos//2
    else:
        if pos == 0:
            return 0
        elif pos == 8:
            return 3
        else:
            midpoint = (x_copy[pos+1] - x_copy[pos-1]) / 2
            idx = (pos+1)//2 if coor>midpoint else (pos-1)//2
    return idx

def find_loc(tweet):
    '''
    tweet is a dictionary, bounds is a list of tuples, each tuple is (city_name, [coordinates])
    '''


    # check place is dictionary
    if isinstance(tweet['place'], dict):
        if tweet['place']['place_type'] == 'city': 
            coor = tweet['place']['bounding_box']['coordinates'][0][0][0] # x coordinate for this tweet
            city_idx = x_rank(x, coor)
            if city_idx not in [0,1,2,3]:
                print(city_idx)
                print(tweet['place'])
                print(coor)
                print(x)
            city = cities[city_idx] if city_idx >= 0 else 'Other'
            return city
        else:
            return 'Other'
    else:
        return 'Other'

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
    
    # add city_name
    # note: city_name may be 'Other', meaning this tweet is outside our bounding box
    clean['city_name'] = find_loc(tweet)

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

def reclean(db):
    '''
    read existing tweets and add missing attributes
    '''

    try:
        for doc_id in db:
            doc = db[doc_id]
            # add in city_name if they do not exist
            if "city_name" not in doc.keys() or doc["city_name"] is None:
                doc["city_name"] = find_loc(doc)
                db[doc_id] = doc
                print("UPDATE DOC ", doc["_id"])
        print('done')
    except:
        pass
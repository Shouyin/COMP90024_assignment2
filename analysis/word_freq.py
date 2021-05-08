import os
import sys
sys.path.append(r'D:\ley\UoM\CCC\ASS2')

import json
import re
import string
from collections import Counter

import pandas as pd
import numpy as np
from tqdm import tqdm
from nltk.corpus import stopwords
from nltk.tokenize import TweetTokenizer

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
    # x = [bounds[i][1][0] for i in range(len(bounds))]
    # x.extend([bounds[i][1][2] for i in range(len(bounds))])
    # x = sorted(x)
    # cities = [t[0] for t in bounds]

    # check place is dictionary
    if isinstance(tweet['place'], dict):
        if tweet['place']['place_type'] == 'city': 
            coor = tweet['place']['bounding_box']['coordinates'][0][0][0] # x coordinate for this tweet
            city_idx = x_rank(x, coor)
            city = cities[city_idx] if city_idx >= 0 else 'Other'
            return city
        else:
            return 'Other'
    else:
        return 'Other'

def word_freq(tweets, keep=100):
    '''
    tweets: a list of tweet, with each tweet being a dictionary
    keep: only keep a fixed number of most frequent words
    
    return:
    top: a dictionary (can be read as json) with the format:
        {
            city_name1: {word1:count1, word2:count2, ...},
            city_name2: {word1:count1, word2:count2, ...}
        }
    city_count: a dictionary of number of tweets for each city, can be used to scale the word frequencies
    '''
    word_freq = {city: Counter() for city in cities}
    city_count = {city: 0 for city in cities}
    for tweet in sample:
        # if attribute city_name does not exist, find its city on the spot
        if tweet.get('city_name', None) is None:
            city = find_loc(tweet)
        else:
            city = tweet['city_name']

        if city != 'Other':
            city_count[city] += 1
            text = tweet['text']
            token_list = [token for token in tokenizer.tokenize(text) if (token not in stop_words) and re.search(r'\w', token) is not None]
            word_freq[city].update(token_list)
    top = {city: dict(sorted(list(word_freq[city].items()), key=lambda x: x[1], reverse=True)[:keep]) for city in cities}
    return top, city_count

def post_process(freq, city_count):
    '''
    freq, city_count: returned from word_freq function
    may give weird results...
    '''
    keep = len(list(freq.values())[0])
    freq_dict = {}
    for city, d in freq.items():
        for (word, freq) in d.items():
            if word not in freq_dict.keys():
                freq_dict[word] = {}
            freq_dict[word][city] = freq
    freq_table = pd.DataFrame(freq_dict).fillna(0).astype(int).transpose()
    counts = np.array([city_count[city] for city in freq_table.columns])

    freq_table_scale = freq_table / counts # scale frequency by number of tweets for each city
    freq_table_scale = freq_table_scale.subtract(freq_table_scale.min(axis=1), axis=0) # subtract the minimum value for each word
    freq_table_scale = (freq_table_scale * counts.max()).round().astype(int) # convert back to integer counts
    
    scaled_freq = {} # will have the same format as the input freq
    for city in freq_table_scale.columns:
        s = freq_table_scale[city].sort_values(ascending=False)[:keep]
        scaled_freq[city] = {k:v for k,v in s.items()}
    return scaled_freq

if __name__ == '__main__':
    tokenizer = TweetTokenizer(preserve_case=False)
    stop_words = stopwords.words('english')


    data_folder = r'D:\ley\UoM\CCC\ASS2'
    with open(os.path.join(data_folder, 'sampled_tweets2.json'), 'r') as f:
        sample = json.load(f)['Melbourne']
    print(len(sample))

    top10, city_count = word_freq(sample, keep=10)
    for city, freq in top10.items():
        print(city)
        print(freq)
    print(city_count)

    top10_scaled = post_process(top10, city_count)
    for city, freq in top10_scaled.items():
        print(city)
        print(freq)
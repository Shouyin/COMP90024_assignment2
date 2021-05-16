import couchdb
# couch = couchdb.Server('http://admin:111@192.168.2.232:5984/')
couch = couchdb.Server('http://admin:weakpw123@172.26.129.77:5984/')
# db = couch.create('test1') # create a new database
db = couch['test1']


# mapreduce的view, 如果是新数据库，运行一遍
# doc1 = {
#   "_id": "_design/my_ddoc",
#   "views": {
#     "my_filter": {
#       "map": "function(doc) { emit(doc.city, doc.textblob);}",
#       "reduce": "_sum"
#     },
#     "my_filter1": {
#       "map": "function(doc) { var word_list = doc.text.split(' '); var count = 0; for (i=0; i<word_list.length; i++){if(word_list[i]=='a'){count += 1;}} emit(doc.city, count);}",
#       "reduce": "_sum"
#     }
#   }
# }


# backend

from flask import Flask, jsonify, request

app = Flask(__name__)

######################### return sentiment {'Melbourne': 0.0, 'Sydney': -1.9500000000000002, 'Brisbane': 0.21212121212121213} #################################################################
@app.route('/api/tweets', methods=['POST'])
def test12():
    specifytime = request.json["specify_time"]
    if int(specifytime) == 1:
        start_time = request.json['start_time']
        start_time = start_time.split(" ")
        end_time = request.json['end_time']
        end_time = end_time.split(" ")

        result_dict = {}
        for item in db.view('my_ddoc/my_filter2',
                            group_level=3,
                            startkey=[int(start_time[0]), int(start_time[1])],
                            endkey=[int(end_time[0]), int(end_time[1])]):
            if item.key[2] in result_dict:
                result_dict[item.key[2]] += item.value
            else:
                result_dict[item.key[2]] = item.value

        if result_dict:
            return jsonify(status=1,
                           content=result_dict)
        else:
            return jsonify(status=-1)
    else:
        result_dict = {}
        for item in db.view('my_ddoc/my_filter2',
                            group_level=3,
                            ):
            if item.key[2] in result_dict:
                result_dict[item.key[2]] += item.value
            else:
                result_dict[item.key[2]] = item.value

        if result_dict:
            return jsonify(status=1,
                           content=result_dict)
        else:
            return jsonify(status=-1,
                           content=-1)


@app.route('/api/wordfreq', methods=['POST'])
def test1441():
    specifytime = request.json["specify_time"]
    result_dict = {"Melbourne": 0, "Canberra": 0, "Brisbane": 0, "Sydney": 0}
    if int(specifytime) == 1:
        start_time = request.json['start_time']
        start_time = start_time.split(" ")
        end_time = request.json['end_time']
        end_time = end_time.split(" ")
        keyword = request.json['keyword']
        view_name = 'my_ddoc/' + keyword

        for item in db.view(view_name,
                            group_level=3,
                            startkey=[int(start_time[0]), int(start_time[1])],
                            endkey=[int(end_time[0]), int(end_time[1])]):
            if item.key[2] in result_dict:
                result_dict[item.key[2]] += item.value
            else:
                result_dict[item.key[2]] = item.value

        if result_dict:
            return jsonify(status=1,
                           content=result_dict)
        else:
            return jsonify(status=-1)
    else:
        keyword = request.json['keyword']
        view_name = 'my_ddoc/' + keyword
        for item in db.view(view_name,
                            group_level=3
                            ):
            if item.key[2] in result_dict:
                result_dict[item.key[2]] += item.value
            else:
                result_dict[item.key[2]] = item.value

        if result_dict:
            return jsonify(status=1,
                           content=result_dict)
        else:
            return jsonify(status=-1)



# return json
# content = {'Melbourne': {'Sun': -1.737878787878788}, 'Canberra': {'Sun': -1.737878787878788}, 'Brisbane': {'Sun': -1.737878787878788}, 'Sydney': {'Sun': -1.737878787878788}}
@app.route('/api/weeklySentiment', methods=['GET', 'POST'])
def test1331():
    result_dict = {"Melbourne": {"Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0, "Sun": 0},
                   "Canberra": {"Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0, "Sun": 0},
                   "Brisbane": {"Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0, "Sun": 0},
                   "Sydney": {"Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0, "Sun": 0}}
    for item in db.view('my_ddoc/weekly_sentiment', group_level=2):
        print(item)
        city_name = item.key[1]
        if item.key[0] in result_dict[city_name]:
            result_dict[city_name][item.key[0]] += item.value
        else:
            result_dict[city_name][item.key[0]] = item.value
    return jsonify(status=1,
                   content=result_dict)


# keyword search
@app.route('/api/tweets/keywords', methods=['POST'])
def test122():
    returnSentiment = request.json["returnSentiment"]
    keywords_list = request.json["keywords"]
    # keywords_list = keywords.strip("[]").split(", ")
    specifytime = request.json["specify_time"]
    result_dict = {"Melbourne": {}, "Canberra": {}, "Brisbane": {}, "Sydney": {}}
    #  initialize the result dict with keyword with initial value 0
    for key in result_dict:
        for keyword in keywords_list:
            result_dict[key][keyword] = 0

    if int(specifytime) == 1:
        start_time = request.json['start_time']
        start_time = start_time.split(" ")
        end_time = request.json['end_time']
        end_time = end_time.split(" ")
        if returnSentiment == "true":
            for item in db.view('my_ddoc/Keyword_sentiment',
                                group_level=4,
                                startkey=[int(start_time[0]), int(start_time[1])],
                                endkey=[int(end_time[0]), int(end_time[1])]):
                city_name = item.key[2]
                keyword = item.key[3]
                if keyword in keywords_list:
                    result_dict[city_name][item.key[3]] += item.value

        if returnSentiment == "false":
            for item in db.view('my_ddoc/Keyword_freq',
                                group_level=4,
                                startkey=[int(start_time[0]), int(start_time[1])],
                                endkey=[int(end_time[0]), int(end_time[1])]):
                city_name = item.key[2]
                keyword = item.key[3]
                if keyword in keywords_list:
                    result_dict[city_name][item.key[3]] += item.value

        return jsonify(status=1,
                       content=result_dict)

    else:  # if specify time is not 1
        if returnSentiment == "true":
            for item in db.view('my_ddoc/Keyword_sentiment',
                                group_level=4):
                city_name = item.key[2]
                keyword = item.key[3]
                if keyword in keywords_list:
                    result_dict[city_name][item.key[3]] += item.value

        if returnSentiment == "false":
            for item in db.view('my_ddoc/Keyword_freq',
                                group_level=4):
                city_name = item.key[2]
                keyword = item.key[3]
                if keyword in keywords_list:
                    result_dict[city_name][item.key[3]] += item.value

        return jsonify(status=1,
                       content=result_dict)
'''
{
	“content”: {
		Melbourne: {"hi": 29938, "welcome": 29910, ..}, 
		..
	},
	"status": 1
}
'''
@app.route('/api/cityWordfreq', methods=['POST'])
def test123():
    specifytime = request.json["specify_time"]
    result_dict = {"Melbourne": {}, "Canberra": {}, "Brisbane": {}, "Sydney": {}}
    keywords_list = ['fish', 'about', 'better', 'bring', 'carry', 'clean', 'cut', 'done', 'draw', 'drink', 'eight', 'fall', 'far', 'full', 'got', 'grow', 'hold', 'hot', 'hurt', 'if', 'keep', 'kind', 'laugh', 'light', 'long', 'much', 'myself', 'never', 'only', 'own', 'pick', 'seven', 'shall', 'show', 'six', 'small', 'start', 'ten', 'today', 'together', 'try', 'warm', 'apple', 'baby', 'back', 'ball', 'bear', 'bed', 'bell', 'bird', 'birthday', 'boat', 'box', 'boy', 'bread', 'brother', 'cake', 'car', 'cat', 'chair', 'chicken', 'children', 'Christmas', 'coat', 'corn', 'cow', 'day', 'dog', 'doll', 'door', 'duck', 'egg', 'eye', 'farm', 'farmer', 'father', 'feet', 'fire', 'fish', 'floor', 'flower', 'game', 'garden', 'girl', 'goodbye', 'grass', 'ground', 'hand', 'head', 'hill', 'home', 'horse', 'house', 'kitty', 'leg', 'letter', 'man', 'men', 'milk', 'money', 'morning', 'mother', 'name', 'nest', 'night', 'paper', 'party', 'picture', 'pig', 'rabbit', 'rain', 'ring', 'robin', 'Santa Claus', 'school', 'seed', 'sheep', 'shoe', 'sister', 'snow', 'song', 'squirrel', 'stick', 'street', 'sun', 'table', 'thing', 'time', 'top', 'toy', 'tree', 'watch', 'water', 'way', 'wind', 'window', 'wood']
    #  initialize the result dict with keyword with initial value 0
    for key in result_dict:
        for keyword in keywords_list:
            result_dict[key][keyword] = 0

    if int(specifytime) == 1:
        start_time = request.json['start_time']
        start_time = start_time.split(" ")
        end_time = request.json['end_time']
        end_time = end_time.split(" ")
        for item in db.view('my_ddoc/cityWordfreq',
                            group_level=4,
                            startkey=[int(start_time[0]), int(start_time[1])],
                            endkey=[int(end_time[0]), int(end_time[1])]):
            city_name = item.key[2]
            keyword = item.key[3]
            if keyword in keywords_list:
                result_dict[city_name][item.key[3]] += item.value
    else:  # if specify time == -1
        for item in db.view('my_ddoc/cityWordfreq',
                            group_level=4):
            city_name = item.key[2]
            keyword = item.key[3]
            if keyword in keywords_list:
                result_dict[city_name][item.key[3]] += item.value

    result_dict["Melbourne"] = dict(sorted(result_dict["Melbourne"].items(), key=lambda e: e[1], reverse=True))
    result_dict["Canberra"] = dict(sorted(result_dict["Canberra"].items(), key=lambda e: e[1], reverse=True))
    result_dict["Brisbane"] = dict(sorted(result_dict["Brisbane"].items(), key=lambda e: e[1], reverse=True))
    result_dict["Sydney"] = dict(sorted(result_dict["Sydney"].items(), key=lambda e: e[1], reverse=True))
    print(result_dict)

    return jsonify(status=1,
                   content=result_dict)

if __name__ == '__main__':
    app.config["JSON_SORT_KEYS"] = False
    app.run()

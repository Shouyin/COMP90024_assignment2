import couchdb
# couch = couchdb.Server('http://admin:111@192.168.2.232:5984/')
couch = couchdb.Server('http://admin:weakpw123@172.26.129.77:5984/')
# db = couch.create('test1') # create a new database
db = couch['test1']


# mapreduce的view, 现在不用运行
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

# db.save(doc1)
# if "_design/my_ddoc" in db:
#     doc = db["_design/my_ddoc"]
#     temp_dict = doc["views"]
#     temp_dict["my_filter2"] = {"map": "function(doc) { var word_list = doc.text.split(' '); var count = 0; for (i=0; i<word_list.length; i++){if(word_list[i]=='a'){count += 1;}} emit(doc.city, count);}","reduce": "_sum"}
#     doc["views"] = temp_dict
#     db["_design/my_ddoc"] = doc



# backend

from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/tweets', methods=['POST'])
def getSentimentScore():
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
def getFreq():
    specifytime = request.json["specify_time"]
    if int(specifytime) == 1:
        start_time = request.json['start_time']
        start_time = start_time.split(" ")
        end_time = request.json['end_time']
        end_time = end_time.split(" ")
        keyword = request.json['keyword']
        view_name = 'my_ddoc/' + keyword
        result_dict = {}
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
        result_dict = {}
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


if __name__ == '__main__':
    app.run()  # app.run(debug=True, threaded=True, port=5001, host='0.0.0.0')

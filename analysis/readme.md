<u>Summary</u>：

1. 两份.py文件：

   - process_aurin.py：处理aurin数据集的函数（已经没必要跑了）

   - word_freq.py：生成词频的函数。

     - word_freq函数：

       1. 输入list of dictionary，每个dictionary代表一条tweet，预设保留100个高频词（可以按需修改）

       2. 输出词频统计的dictionary，格式为：

          {city1: {word1:freq1, word2:freq2, ...},

           city2: {word1:freq1, word2:freq2, ...}}

          以及每个城市处理的tweet个数dictionary（如果有必要的话用来scale）

     - post_process函数：

       1. 输入word_freq函数返回的两个dictionary
       2. 输出scaled counts的dictionary（先按每城市tweet的个数scale，再减去每个词的最小值，最后还原成count），格式和word_freq返回的词频统计一致

2. aurin_data文件夹：

   - regions：地理分区的文件：SA2, SA3, SA4, 2018年划分的LGA
   - results：离线处理aurin数据的结果，medicare/employ/tourism用于五角图，election用于scomo的情感分析
   - 其余文件夹：每个aurin数据集的原始数据和metadata



<u>具体内容</u>

Aurin数据（存放路径：**analysis/aurin_data**）

- aurin数据下载为csv，然后用pandas读为dataframe，再将dataframe导出为json，每行作为一个json string（反之也可以用pd.read_json读取json文件为dataframe）。
  - 每个dataset的原始数据和metadata（解释数据来源，每个字段含义的json）存放在各自的文件夹内，路径为：**analysis/aurin_data/{data_theme}_{region}**，其中**data_theme**为数据的主题，**region**为使用的哪种地理分区方式。
  - 原始数据（csv和json格式）的命名方式和文件夹命名一样，如：**analysis/aurin_data/medicare_sa3/medicare_sa3.json**保存的是medicare相关的数据，使用的是SA3的地理分区。
- aurin数据集处理的函数保存在**analysis/process_aurin.py**内，具体函数的输入输出均为pandas dataframe，保存为json需要额外写一步
- aurin数据离线处理的结果存放在：**analysis/aurin_data/results**
- aurin数据地理分区的文件存放在：**analysis/aurin_data/regions**



Scenario

1. 五角图（城市宜居度）

   - medicare, tourism, employment: 只使用aurin，每个城市输出一个分数和一个排名
     - 函数保存在process_aurin.py内
     - 可直接使用结果（已保存成json，在**analysis/aurin_data/results**文件夹）
   - overall sentiment, sports相关: 使用twitter文本
     - mapreduce

2. 词频图

   - 函数保存在word_freq.py（路径：**analysis/word_freq.py**）内

     - word_freq函数：

       1. 输入list of dictionary，每个dictionary代表一条tweet，预设保留100个高频词（可以按需修改）

       2. 输出词频统计的dictionary，格式为：

          {city1: {word1:freq1, word2:freq2, ...},

           city2: {word1:freq1, word2:freq2, ...}}

          以及每个城市处理的tweet个数dictionary（如果有必要的话用来scale）

     - post_process函数：

       1. 输入word_freq函数返回的两个dictionary
       2. 输出scaled counts的dictionary（先按每城市tweet的个数scale，再减去每个词的最小值，最后还原成count），格式和word_freq返回的词频统计一致

   - 两个函数的输出都可以直接保存为json，（如果想看到差异性较大的有趣结果，可能还得额外处理）

   - 如何获取输入需要确认。暂定：

     - GET:
       xxx.xxx.xxx.xxx/filter/my_filter_name1/<timeslot_type1>

       POST
       xxx.xxx.xxx.xxx/filter/my_filter_name1
       application/json
       "starttime":xxx
       "endtime":xxx

     - 前端给时间段（固定时间段很快；自定义时间段需要现场运行（需测速））->  在db里query数据 -> 运行处理function -> 输出结果 -> 结果返回前端

3. 19年选举支持率和twitter对scomo态度联合

   - 19年选举支持率只需要aurin数据，结果已保存在**anaysis/aurin_data/results/election_result.json**，记录了每个城市对liberal party的支持率（key：" liberal_percent"）和swing（相比上次选举的变化）（key：" liberal_swing"）；Brisbane没有数据。。。
   - twitter对scomo的态度需要：按关键词（e.g. #ScottMorrison）筛选，按城市计算sentiment分数（或者按城市计算sentiment为正/负的twitter个数比例）
   - 柱状图或者折线图（看几个城市的走势）？

4.  jobseeker（待定？）

   - 有从19年Q1到20年Q2的每季度各种津贴领取人数的数据

   - jobseeker payment领取人数只有2020年两个季度的数据
   - 获取2020年前两个季度的twitter数据有点麻烦。。。

5.  食物

   - 靠关键词筛选twitter，按城市统计数量
   - 饼状图？



twitter个数/sentiment接口：

1. 时间段：-1：全期；time: 自定义时间段
2. 关键词：sports/food/election/-1

3. 需不需要sentiment： True：sentiment按城市加和；False：只输出按城市统计twitter个数

词频接口：

1. 时间段


import os
import json
import pandas as pd
import numpy as np

########## merge lga regions ##########
states = ['VIC', 'NSW', 'ACT', 'QLD']
def process_lga(states, lga_data_path):
    '''
    process lga data for each state and merge them together
    
    this function does not need to be run everytime
    result of this function is the processed lga2018.json and can be used directly
    '''
    lga_full = pd.DataFrame()
    for state in states:
        lga = pd.read_csv(os.path.join(lga_data_path, f'LGA_2018_{state}.csv'))
        mesh = pd.read_csv(os.path.join(lga_data_path, f'MB_2016_{state}.csv'))

        merge = mesh[['MB_CODE_2016', 'GCCSA_NAME_2016', 'SA4_NAME_2016']].merge(lga[['MB_CODE_2016','LGA_CODE_2018','LGA_NAME_2018']])
        lga_unique = merge.drop_duplicates(subset=['LGA_CODE_2018'])
        print(state, lga_unique.shape)
        lga_full = pd.concat((lga_full, lga_unique), axis=0)
    lga_full.to_json(os.path.join(lga_data_path, 'lga2018.json'))
    return lga_full

########## medicare ##########

def process_medicare(medicare, sa3, cities):
    '''
    medicare: pandas dataframe
    sa3: pandas dataframe
    cities: list of city names: [Greater Melbourne, Greater Sydney, Greater Brisbane, Australian Capital Territory]
    '''

    # find corresponding city using sa3
    medicare_merge = medicare.merge(sa3[['SA3_CODE_2016', 'GCCSA_NAME_2016']], how='left', left_on=' sa3_code', right_on='SA3_CODE_2016')
    # select data on interested attributes and cities
    medicare_cities = medicare_merge.loc[
        medicare_merge['GCCSA_NAME_2016'].isin(cities),
        [ 
            'GCCSA_NAME_2016', 
            'perc_patients_csts',
            ' tot_oop_cst_patient_50th_percile', 
            ' all_patients_avg_medicare_bfts_expenditure_patient', 
            ' all_patients_avg_oop_cst_patient', 
            ' all_patients_avg_no_patient'
        ]
    ]

    # calculate mean value for each city
    # larger attribute value is better
    medicare_cities_avg = medicare_cities.groupby('GCCSA_NAME_2016').mean() * np.array([-1,-1,1,-1,1])
    
    # scale each attributes
    medicare_cities_avg_scale = ((medicare_cities_avg - medicare_cities_avg.mean()) / medicare_cities_avg.std())

    # get overall score for each city and their rank
    # larger score -> higher rank -> better city
    score = medicare_cities_avg_scale.sum(axis=1)
    rank = score.rank()
    return pd.DataFrame({'score':score, 'rank':rank})

########## tourism ##########

def process_tourism(tourism, lga2018, cities):
    # select attributes to use
    tourism_reduce = tourism[[
        ' lga_code18', ' vis_000_tot', ' avg_spend_per_night_aud_tot', ' spend_audm_tot', ' nights_000_tot'
    ]]
    # merge with location data
    tourism_merge = tourism_reduce.merge(
        lga2018[['LGA_CODE_2018', 'GCCSA_NAME_2016', 'SA4_NAME_2016']], 
        how='left', left_on=' lga_code18', right_on='LGA_CODE_2018'
    ).dropna()
    # since no data in ACT, we enlarge the region to consider the whole capital region (which is in "rest of NSW" for GCCSA)
    tourism_cities = tourism_merge.loc[
        (tourism_merge['GCCSA_NAME_2016'].isin(cities))|(tourism_merge['SA4_NAME_2016']=='Capital Region')
    ].drop(columns=[' lga_code18', 'LGA_CODE_2018'])

    # sum over each city, giving negative weights to spending attributes
    # larger attribute values are better
    tourism_cities_sum = tourism_cities.groupby('GCCSA_NAME_2016').sum() * np.array([1,-1,-1,1])

    tourism_cities_sum_scale = (tourism_cities_sum - tourism_cities_sum.mean()) / tourism_cities_sum.std()

    score = tourism_cities_sum_scale.sum(axis=1)
    rank = score.rank()
    tourism_result = pd.DataFrame({'score':score, 'rank':rank}).rename(index={'Rest of NSW':'Australian Capital Territory'})
    # # we dont have data on ACT, so just assign some number and rank
    # tourism_result = tourism_result.append(pd.DataFrame([[-3.0, 0.0]], columns=['score', 'rank'], index=['Australian Capital Territory']))
    # tourism_result['rank'] += 1

    return tourism_result

########## employment ##########

def process_employ(employ, cities):
    # data on ACT is missing, so replace it with broader capital region
    employ_cities = employ.loc[
        (employ[' gccsa_name_2016'].isin(cities)) | (employ[' sa4_name_2016']=='Capital Region'),
        [
            ' gccsa_name_2016',
            ' sa4_name_2016',
            ' yth_unemp_rt_15_24',
            ' mpy_rt_15_64',
            ' unemp_rt_15',
            ' ptic_rt_15'
        ]
    ]

    # give unemployment rate negative weights
    # larger attribute values are better
    employ_cities_avg = employ_cities.groupby(' gccsa_name_2016').mean() * np.array([-1,1,-1,1])

    employ_cities_avg_scale = (employ_cities_avg - employ_cities_avg.mean()) / employ_cities_avg.std()
    score = employ_cities_avg_scale.sum(axis=1)
    rank = score.rank()
    employ_result = pd.DataFrame({'score':score, 'rank':rank}).rename(index={'Rest of NSW':'Australian Capital Territory'})

    return employ_result

########## election ##########
def process_election(election, city_names):
    '''
    result of this function can be used along with twitter analysis
    '''
    election_cities = election.loc[
        election[' division_name'].isin(city_names), 
        [' division_name',' liberal_percent',' liberal_swing']
    ]
    election_cities_mean = election_cities.groupby(' division_name').mean()
    return election_cities_mean

if __name__ == '__main__':

    # read in location files
    aurin_data_path = r'D:\ley\UoM\CCC\ASS2\aurin'
    result_store_path = os.path.join(aurin_data_path, 'results')
    cities = ['Greater Sydney', 'Greater Melbourne', 'Greater Brisbane', 'Australian Capital Territory']
    # sa2 = pd.read_csv(os.path.join(aurin_data_path, 'regions', 'sa2.csv'))
    # sa3 = pd.read_csv(os.path.join(aurin_data_path, 'regions', 'sa3.csv'))
    # sa4 = pd.read_csv(os.path.join(aurin_data_path, 'regions', 'sa4.csv'))
    # lga2018 = pd.read_csv(os.path.join(aurin_data_path, 'regions', 'lga2018.csv'))
    # medicare = pd.read_csv(os.path.join(aurin_data_path, 'medicare_sa3', 'medicare_sa3.csv'))
    # tourism = pd.read_csv(os.path.join(aurin_data_path, 'tourism', 'tourism.csv'))
    # employ = pd.read_csv(os.path.join(aurin_data_path, 'labour_sa4', 'labour_sa4.csv'))

    # change to read json string
    sa2_json = json.load(open(os.path.join(aurin_data_path, 'regions', 'sa2.json')))
    sa2 = pd.DataFrame(sa2_json)

    sa3_json = json.load(open(os.path.join(aurin_data_path, 'regions', 'sa3.json')))
    sa3 = pd.DataFrame(sa3_json)

    sa4_json = json.load(open(os.path.join(aurin_data_path, 'regions', 'sa4.json')))
    sa4 = pd.DataFrame(sa4_json)

    lga2018_json = json.load(open(os.path.join(aurin_data_path, 'regions', 'lga2018.json')))
    lga2018 = pd.DataFrame(lga2018_json)
    
    medicare_json = json.load(open(os.path.join(aurin_data_path, 'medicare_sa3', 'medicare_sa3.json')))
    medicare = pd.DataFrame(medicare_json)

    tourism_json = json.load(open(os.path.join(aurin_data_path, 'tourism', 'tourism.json')))
    tourism = pd.DataFrame(tourism_json)

    employ_json = json.load(open(os.path.join(aurin_data_path, 'labour_sa4', 'labour_sa4.json')))
    employ = pd.DataFrame(employ_json)

    medicare_result = process_medicare(medicare, sa3, cities)
    print("="*20)
    print('medicare:')
    print(medicare_result.to_dict())
    medicare_result.to_json(os.path.join(result_store_path, 'medicare_result.json'), orient='records')

    tourism_result = process_tourism(tourism, lga2018, cities)
    print("="*20)
    print('tourism:')
    print(tourism_result.to_dict())
    tourism_result.to_json(os.path.join(result_store_path, 'tourism_result.json'), orient='records')

    employ_result = process_employ(employ, cities)
    print("="*20)
    print('employment:')
    print(employ_result.to_dict())
    employ_result.to_json(os.path.join(result_store_path, 'employ_result.json'), orient='records')

    election_json = json.load(open(os.path.join(aurin_data_path, 'election', 'election.json')))
    election = pd.DataFrame(election_json)
    election_result = process_election(election, city_names=['Melbourne','Sydney','Brisbane','Canberra'])
    print("="*20)
    print('election:')
    print(election_result.to_dict())
    election_result.to_json(os.path.join(result_store_path, 'election_result.json'), orient='records')
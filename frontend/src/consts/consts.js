const defaultViewport = {
  latitude: -25.27,
  longitude: 133.77,
  zoom: 3,
};

const cities = ["Australian Capital Territory",
  "Greater Brisbane",
  "Greater Melbourne",
  "Greater Sydney"];

const citiesNames = {
  "Australian Capital Territory": "Canberra",
  "Greater Brisbane": "Brisbane",
  "Greater Melbourne": "Melbourne",
  "Greater Sydney": "Sydney"
};

const namesCities = {
  "Canberra": "Australian Capital Territory",
  "Brisbane": "Greater Brisbane",
  "Melbourne": "Greater Melbourne",
  "Sydney": "Greater Sydney",
};

const cityLevel = "";

const foods = ['#thai food', 'pizza', 'pasta', 'lasagna', 'fish', 'chips',
  'korean food', 'sushi', 'hamburgers', 'burgers', 'hotpot', '#Chinese food', 'dumplings', 'noodles', 'soup', 
  'fries', 'steak', 'ice cream', '#cheese', 'youghurt', 'froyo', 'lobster', 'lobsters'];

const drinks = ['beer', 'boba tea', 'tea', 'whiskey', 'tequila', 'juice', 'milk', 'bubble tea', 'coffee', 'hot choc',
  'Vodka']

const foodDrinks = [].concat(foods).concat(drinks);

const host = "";

const sports = ['football', 'swimming', 'soccer', 'dance', 'dancing', 'basketball', 'AFL', 'tennis', 'cricket', 'NRL',
  'cycling', 'netball'];

const scomo = ['#ScottMorrison', '#COVID19', '#bushfire',
  '#jobseekers', '#kangarooisland', '#naturalHazard', '#Recruiting', '#Staffing', '#Hiring', '#jobsearch'];

const rangeMax = 40;
const startYear = 2018;

export {
  defaultViewport, cityLevel, host, cities,
  citiesNames, namesCities, foods, drinks, foodDrinks, sports,
  rangeMax, startYear, scomo
};
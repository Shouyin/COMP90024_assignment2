import regionsa3 from "./regions/sa3.json";
import regionsa4 from "./regions/sa4.json";
import regionlga from "./regions/lga2018.json";


let getCityLocMap = () => {
  let citySA3map = {};
  let citySA4map = {};
  let cityLGAmap = {};
  let cityLvLocations = [
    "Greater Sydney",
    "Greater Melbourne",
    "Greater Brisbane",
    "Australian Capital Territory",
  ];

  for (let city of cityLvLocations) {
    citySA3map[city] = new Map();
    citySA4map[city] = new Map();
    cityLGAmap[city] = new Map();
  }

  for (let sa3 of regionsa3) {
    if (cityLvLocations.includes(sa3["GCCSA_NAME_2016"])) {
      citySA3map[sa3["GCCSA_NAME_2016"]][sa3.SA3_CODE_2016] = true;
    }
    if (sa3["SA4_NAME_2016"] == "Capital Region") {
      citySA3map["Australian Capital Territory"][sa3.SA3_CODE_2016] = true;
    }
  }

  for (let sa4 of regionsa4) {
    if (cityLvLocations.includes(sa4["GCCSA_NAME_2016"])) {
      citySA4map[sa4["GCCSA_NAME_2016"]][sa4.SA4_CODE_2016] = true;
    }
    if (sa4["SA4_NAME_2016"] == "Capital Region") {
      citySA4map["Australian Capital Territory"][sa4.SA4_CODE_2016] = true;
    }
  }

  for (let lga of regionlga) {
    if (cityLvLocations.includes(lga["GCCSA_NAME_2016"])) {
      cityLGAmap[lga["GCCSA_NAME_2016"]][lga.LGA_CODE_2018] = true;
    }
    if (lga["SA4_NAME_2016"] == "Capital Region") {
      cityLGAmap["Australian Capital Territory"][lga.LGA_CODE_2018] = true;
    }

  }

  return [citySA3map, citySA4map, cityLGAmap];
}

export { getCityLocMap };
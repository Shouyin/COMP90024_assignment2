import laboursa4 from "./labour_sa4/labour_sa4.json";
import mdlabour from "./labour_sa4/metadata_labour_sa4.json";
import medicaresa3 from "./medicare_sa3/medicare_sa3.json";
import mdmedicare from "./medicare_sa3/metadata_medicare_sa3.json";

import tourismlga from "./tourism_lga2018/tourism_lga2018.json";
import mdtourism from "./tourism_lga2018/metadata_tourism_lga2018.json";

let trim = (name) => {
  return name.replace(/^\s+|\s+$/g, "");
};

let initLabour = (citySA4map) => {
  let cityLvLocations = Object.keys(citySA4map);

  let labour = {};

  let attributes = {};
  // mapping column and their human friendly names
  for (let i of mdlabour.selectedAttributes) {
    attributes[i.name] = i.title;
  }

  let allkeys = [
    " yth_unemp_rt_15_24",
    " mpy_rt_15_64",
    " working_age_pop_15_64",
    " unemp_rt_15",
    " ptic_rt_15",
  ];

  for (let i of cityLvLocations) {
    labour[i] = {};
    for (let j of allkeys) {
      labour[i][attributes[trim(j)]] = [];
    }
  }

  // adding column keys
  // const sample = laboursa4[0];
  for (let i of cityLvLocations) {
    for (let j of laboursa4) {
      if (j[" sa4_code_2016"] in citySA4map[i]) {
        for (let l of allkeys) {
          labour[i][attributes[trim(l)]].push(j[l]);
        }
      }
    }
  }

  console.log(labour);
  return labour;
};

let initMedicare = (citySA3map) => {
  let cityLvLocations = Object.keys(citySA3map);
  let medicare = {};

  let attributes = {};
  // mapping column and their human friendly names
  for (let i of mdmedicare.selectedAttributes) {
    attributes[i.name] = i.title;
  }

  let allkeys = [
    "perc_patients_csts",
    " tot_oop_cst_patient_90th_percile",
    " tot_oop_cst_patient_50th_percile",
    " all_patients_avg_medicare_bfts_expenditure_patient",
    " tot_oop_cst_patient_75th_percile",
    " all_patients_avg_oop_cst_patient",
    " all_patients_avg_no_patient",
    " tot_oop_cst_patient_25th_percile",
  ];
  let cateKeys = [" remoteness_socioeconomic_status"];

  for (let i of cityLvLocations) {
    medicare[i] = {};
    for (let j of allkeys) {
      medicare[i][attributes[trim(j)]] = [];
    }

    for (let j of cateKeys) {
      medicare[i][attributes[trim(j)]] = new Map();
    }
  }

  // adding column keys
  // const sample = laboursa4[0];
  for (let i of cityLvLocations) {
    for (let j of medicaresa3) {
      if (j[" sa3_code"] in citySA3map[i]) {
        // console.log(j);
        for (let l of allkeys) {
          let k = attributes[trim(l)];
          medicare[i][k].push(j[l]);
        }

        for (let l of cateKeys) {
          let k = attributes[trim(l)];
          // console.log(medicare[i])
          if (!medicare[i][k].has(j[l])) {
            medicare[i][k][j[l]] = 0;
          }
          medicare[i][k][j[l]] += 1;
        }
      }
    }
  }

  console.log(medicare);
  return medicare;
};

let initTourism = (cityLGAmap) => {
  let cityLvLocations = Object.keys(cityLGAmap);
  let tourism = {};

  let attributes = {};
  // mapping column and their human friendly names
  for (let i of mdtourism.selectedAttributes) {
    attributes[i.name] = i.title;
  }

  let except = [" state",
    " lga_code18",
    " lga_name18"];

  let allkeys = [];

  let sample = tourismlga[0];
  for (let key of Object.keys(sample)) {
    if (!except.includes(key)) {
      allkeys.push(key);
    }
  }

  for (let i of cityLvLocations) {
    tourism[i] = {};
    for (let j of allkeys) {
      tourism[i][attributes[trim(j)]] = [];
    }
  }

  // adding column keys
  // const sample = laboursa4[0];
  for (let i of cityLvLocations) {
    for (let j of tourismlga) {
      if (j[" lga_code18"] in cityLGAmap[i]) {
        // console.log(j);
        for (let l of allkeys) {
          let k = attributes[trim(l)];
          tourism[i][k].push(j[l]);
        }
      }
    }
  }

  console.log(tourism);
  return tourism;
};

export { initLabour, initMedicare, initTourism };
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

// import ReactWordcloud from 'react-wordcloud';

import { TagCloud } from 'react-tagcloud';
import React, { useEffect, useState } from "react";

import regionsa3 from "../../aurin_data/regions/sa3.json";
import regionsa4 from "../../aurin_data/regions/sa4.json";
import regionlga from "../../aurin_data/regions/lga2018.json";


import DisplayMap from "../displayMap.js";
import { defaultViewport } from "../../consts/consts.js";
import geojsonAULess from "../../shapes/geojsonAUless.json";


import { initLabour, initMedicare, initTourism } from "../../aurin_data/p.js";
import { getCityLocMap } from "../../aurin_data/map.js";


import employ_reduce from "../../aurin_data/reduced_data/employ_reduce.json";
import medicare_reduce from "../../aurin_data/reduced_data/medicare_reduce.json";
import tourism_reduce from "../../aurin_data/reduced_data/tourism_reduce.json";


import PieChart_ from "../plots/PieChart_.js";
import BarChart_ from "../plots/BarChart_.js";
import LineChart_ from "../plots/LineChart_.js";
// import WordCloud_ from "../plots/WordCloud_.js";

import { cities, citiesNames, namesCities } from "../../consts/consts.js";

const Disabled = "disable";


// initializing
let init = () => {
  let [citySA3map, citySA4map, cityLGAmap] = getCityLocMap();

  /*let labour = initLabour(citySA4map);
  let medicare = initMedicare(citySA3map);
  let tourism = initTourism(cityLGAmap);*/
};

init();

const RESULT_DATA = "result";
const LABOUR_DATA = "labour";
const MEDICARE_DATA = "medicare";
const TOURISM_DATA = "tourism";
const SENTIMENT_DATA = "sentiment";
const SPORTS_DATA = "sports";

let LabourDetailed = (props) => {
  const location = props.location;

  // - Bar
  let Keyname = Object.keys(employ_reduce);
  let keyList = Object.keys(employ_reduce[cities[0]]);
  
  const data_1 = [];
  
  // for (const city of Object.keys(tourism_reduce)) {
  for (const city of location) {
    const tmp = {"Cities":citiesNames[city]}
    for (const value of Object.keys(employ_reduce[city]) ){
      tmp[value] = employ_reduce[city][value];
    }
    data_1.push(tmp);
  }

  return (
    <div style={detailStyle}>
      <h3>Labour data</h3>
      <BarChart_ data={data_1} keyName={"Cities"} keyList={keyList} brush_flag={false} height={300} width={560}></BarChart_>
  </div>
  )
}
let MedicareDetailed = (props) => {
  const location = props.location;

  // - Bar
  let Keyname = Object.keys(medicare_reduce);
  let keyList = Object.keys(medicare_reduce[cities[0]]);
  
  const data_1 = [];
  
  // for (const city of Object.keys(tourism_reduce)) {
  for (const city of location) {
    const tmp = {"Cities":citiesNames[city]}
    for (const value of Object.keys(medicare_reduce[city]) ){
      tmp[value] = medicare_reduce[city][value];
    }
    data_1.push(tmp);
  }

  return (
    <div style={detailStyle}>
      <h3>Medicare data</h3>
      <BarChart_ data={data_1} keyName={"Cities"} keyList={keyList} brush_flag={false} height={300} width={560}></BarChart_>
  </div>
  )
}

let TourismDetailed = (props) => {
  const location = props.location;
  console.log(location);

  // - Bar
  let Keyname = Object.keys(tourism_reduce);
  let keyList = Object.keys(tourism_reduce[cities[0]]);
  
  const data_1 = [];
  
  // for (const city of Object.keys(tourism_reduce)) {
  for (const city of location) {
    const tmp = {"Cities":citiesNames[city]}
    for (const value of Object.keys(tourism_reduce[city]) ){
      tmp[value] = tourism_reduce[city][value];
    }
    data_1.push(tmp);
  }

  return (
    <div style={detailStyle}>
      <h3>Tourism data</h3>
      <BarChart_ data={data_1} keyName={"Cities"} keyList={keyList} brush_flag={false} height={300} width={560}></BarChart_>
  </div>
  )
}

const weekly = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const week1 = [];
for (let j of weekly) {
  let tmp = { "name": j };
  for (let i of cities) {
    tmp[i] = Math.random();
  }
  week1.push(tmp);
}

console.log(week1);

let rpToWeek = (rp) => {
  let k = [];
  for (let j of weekly) {
    let tmp = { "name": j };
    for (let i of Object.keys(namesCities)) {
      tmp[i] = rp[i][j];
    }
    k.push(tmp);
  }
  return k;
}

let weekly1 = undefined;

let SentimentDetailed = (props) => {

  const [weeklyd, setWeeklyd] = useState(undefined)

  // if (weeklyd == undefined) {
  useEffect(() => {
      if (weekly1 == undefined) {
        fetch("http://localhost:8000/api/weeklySentiment")
        .then(rp =>
          rp.json()
        )
        .then(res => {
          // weeklyd = res["content"];
          let w = rpToWeek(res["content"]);
          weekly1 = w;
          console.log(w);
          // console.log(res["content"]);
          setWeeklyd(w);
        }) 
      }
  }, []);
    // return <div></div>
  // }
  if (weeklyd == undefined && weekly1 != undefined) {
    setWeeklyd(weekly1);
    return <div></div>
  }else if (weeklyd == undefined) {
    return <div></div>
  }


  const location = props.location;
  const week = weeklyd;

  let dispdata = [];
  let ks = [];

  for (let q of location) {
    ks.push(citiesNames[q]);
  }

  for (let i of week) {
    let tmp = {"name": i["name"]}
    for (let j of location) {
      if (citiesNames[j] in i) {
        tmp[citiesNames[j]] = i[citiesNames[j]];
      }
    }
    dispdata.push(tmp);
  }

  console.log(dispdata)
  

  return (
    <div style={detailStyle}>
      <h3>Sentiment data</h3>
      <h4>Weekly Sentiment Score</h4>
      <LineChart_ height={300} width={560} data={dispdata} keyName={"name"} keyList={ks}></LineChart_>
  </div>
  )
}

let SportsDetailed = (props) => {
  const location = props.location;

  // - Bar
  /*let Keyname = Object.keys(medicare_reduce);
  let keyList = Object.keys(medicare_reduce[cities[0]]);
  
  const data_1 = [];
  
  // for (const city of Object.keys(tourism_reduce)) {
  for (const city of location) {
    const tmp = {"Cities":city}
    for (const value of Object.keys(medicare_reduce[city]) ){
      tmp[value] = medicare_reduce[city][value];
    }
    data_1.push(tmp);
  }*/

  return (
    <div style={detailStyle}>
      <h3>Sports data</h3>
  </div>
  )
}

let ResultDetailed = (props) => {
  const location = props.location;

  // - Bar
  /*let Keyname = Object.keys(medicare_reduce);
  let keyList = Object.keys(medicare_reduce[cities[0]]);
  
  const data_1 = [];
  
  // for (const city of Object.keys(tourism_reduce)) {
  for (const city of location) {
    const tmp = {"Cities":city}
    for (const value of Object.keys(medicare_reduce[city]) ){
      tmp[value] = medicare_reduce[city][value];
    }
    data_1.push(tmp);
  }*/

  return (
    <div style={detailStyle}>
      <h3>Results</h3>
      <p>Melbourne is the best city, as shown in the blablabla</p>
  </div>
  )
}

const detailStyle = {
  marginBottom: "64px",
}


let Detailed = (props) => {
  const location = props.location;
  const state = props.state;

  return <div style={{marginBottom: "32px"}}>
    <h2>Scenario 1</h2>
    {state[RESULT_DATA] ? <ResultDetailed location={location} /> : null}
      {state[LABOUR_DATA] ? <LabourDetailed location={location} /> : null}
      {state[MEDICARE_DATA] ? <MedicareDetailed location={location} /> : null}
    {state[TOURISM_DATA] ? <TourismDetailed location={location} /> : null}
    {state[SENTIMENT_DATA] ? <SentimentDetailed location={location} /> : null}
    {state[SPORTS_DATA] ? <SportsDetailed location={location} /> : null}
  </div>
}


export default function ScenarioOneControl(props) {
  // console.log(props.location)
  const setGeoJsonData = props.setGeoJsonData;
  const addComp = props.addComp;
  const delComp = props.delComp;
  const location = props.location;

  const key = "scenarioone";

  const RadioButtonList = [RESULT_DATA, LABOUR_DATA, MEDICARE_DATA, TOURISM_DATA, SENTIMENT_DATA, SPORTS_DATA];

  let inst = {};
  for (let i of RadioButtonList) {
    inst[i] = false;
  }

  const [state, setState] = React.useState(inst);

  const shouldClose = (state) => {
    for (let i of Object.keys(state)) {
      if (state[i]) {
        return false;
      }
    }
    return true;
  }

  useEffect(
    () => {
      
      shouldClose(state) ? delComp(key) :
      addComp(
        key, <Detailed state={state} location={props.location} />
      );
    },
    [props.location],
  );

  const handleChange = (event) => {
    let newState = { ...state, [event.target.name]: event.target.checked };
    setState(newState);

    shouldClose(newState) ? delComp(key) :addComp(
      key, <Detailed state={newState} location={location} />
    );
  };


  let Radios = () => {
    let children = [];
    for (let i of RadioButtonList) {
      // console.log(attributes, i);
      children.push(
        <FormControlLabel
          control={
            <Checkbox onChange={handleChange} name={i} />
          }
          label={i}
        />
      );
    }
    return children;
  };

  return <FormGroup>{Radios()}</FormGroup>;
}

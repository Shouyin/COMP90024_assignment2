import {
  Fab, Paper, FormGroup, FormControlLabel,
  Checkbox, InputLabel, MenuItem, FormControl, Select, Slider, ListSubheader, CircularProgress,
  Chip
} from '@material-ui/core';

import React, { useEffect, useState } from "react";


import employ_reduce from "../../aurin_data/reduced_data/employ_reduce.json";
import medicare_reduce from "../../aurin_data/reduced_data/medicare_reduce.json";
import tourism_reduce from "../../aurin_data/reduced_data/tourism_reduce.json";

import mdmedicare from "../../aurin_data/medicare_sa3/metadata_medicare_sa3.json";
import mdlabour from "../../aurin_data/labour_sa4/metadata_labour_sa4.json";
import mdtouri from "../../aurin_data/tourism_lga2018/metadata_tourism_lga2018.json";

import employres from "../../aurin_data/results/employ_result.json";
import medicareres from "../../aurin_data/results/medicare_result.json";
import sentimentres from "../../aurin_data/results/sentiment_result.json";
import sportres from "../../aurin_data/results/sports_result.json";
import tourismres from "../../aurin_data/results/tourism_result.json";


import PieChart_ from "../plots/PieChart_.js";
import BarChart_ from "../plots/BarChart_.js";
import LineChart_ from "../plots/LineChart_.js";
import { CityDetailed, CityDetailed1 } from "./ctDetail.js";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LabelList
} from "recharts";
// import WordCloud_ from "../plots/WordCloud_.js";

import DT from "./detailTitle.js";

import { cities, host, citiesNames, namesCities, sports } from "../../consts/consts.js";
import { fetchCount } from "./request.js";

let trim = (name) => {
  return name.replace(/^\s+|\s+$/g, "");
};

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

  let attributes = {};
  let tmpk = [];

  for (let i of mdlabour.selectedAttributes) {
    attributes[i.name] = i.title;
  }

  for (let i of keyList) {
    tmpk.push(attributes[trim(i)]);
  }

  keyList = tmpk;
  
  const data_1 = [];
  
  // for (const city of Object.keys(tourism_reduce)) {
  for (const city of location) {
    const tmp = {"Cities":citiesNames[city]}
    for (const value of Object.keys(employ_reduce[city]) ){
      tmp[attributes[trim(value)]] = employ_reduce[city][value];
    }
    data_1.push(tmp);
  }

  return (
    <div style={{ ... detailStyle, width: "100%", height: "320px"}}>
      <h3>Labour data</h3>
      <BarChart_ data={data_1} keyName={"Cities"} keyList={keyList} brush_flag={false} height={300} width={620}></BarChart_>
  </div>
  )
}
let MedicareDetailed = (props) => {
  const location = props.location;

  // - Bar
  let Keyname = Object.keys(medicare_reduce);
  // let keyList = Object.keys(medicare_reduce[cities[0]]);
  let attributes = {};
  let keyList = Object.keys(medicare_reduce[cities[0]]);
  let tmpk = [];

  for (let i of mdmedicare.selectedAttributes) {
    attributes[i.name] = i.title;
  }

  for (let i of keyList) {
    tmpk.push(attributes[trim(i)]);
  }

  keyList = tmpk;
  
  const data_1 = [];
  
  // for (const city of Object.keys(tourism_reduce)) {
  for (const city of location) {
    const tmp = {"Cities":citiesNames[city]}
    for (const value of Object.keys(medicare_reduce[city]) ){
      tmp[attributes[trim(value)]] = medicare_reduce[city][value];
    }
    data_1.push(tmp);
  }

  return (
    <div style={{ ... detailStyle, width: "100%", height: "320px"}}>
      <h3>Medicare data</h3>
      <BarChart_ data={data_1} keyName={"Cities"} keyList={keyList} brush_flag={false} height={300} width={620}></BarChart_>
  </div>
  )
}

let TourismDetailed = (props) => {
  const location = props.location;
  console.log(location);

  // - Bar
  let Keyname = Object.keys(tourism_reduce);
  let keyList = Object.keys(tourism_reduce[cities[0]]);
  let attributes = {};
  let tmpk = [];

  for (let i of mdtouri.selectedAttributes) {
    attributes[i.name] = i.title;
  }

  for (let i of keyList) {
    tmpk.push(attributes[trim(i)]);
  }

  keyList = tmpk;
  
  const data_1 = [];
  
  // for (const city of Object.keys(tourism_reduce)) {
  for (const city of location) {
    const tmp = {"Cities":citiesNames[city]}
    for (const value of Object.keys(tourism_reduce[city]) ){
      tmp[attributes[trim(value)]] = tourism_reduce[city][value];
    }
    data_1.push(tmp);
  }

  return (
    <div style={{ ... detailStyle, width: "100%", height: "320px"}}>
      <h3>Tourism data</h3>
      <BarChart_ data={data_1} keyName={"Cities"} keyList={keyList} brush_flag={false} height={300} width={620}></BarChart_>
  </div>
  )
}

const weekly = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

/*
    Sentiment | weekly sentiment
*/
let weekly1 = undefined;

let WeeklySentiment = (props) => {
  // const location = props.location;

  const [weeklyd, setWeeklyd] = useState(undefined)

  // if (weeklyd == undefined) {
  useEffect(() => {
      if (weekly1 == undefined) {
        fetch(host + "/api/weeklySentiment")
        .then(rp =>
          rp.json()
        )
        .then(res => {
          
          let w = rpToWeek(res["content"]);
          weekly1 = w;
          console.log(w);
          
          setWeeklyd(w);
        }) 
      }
  }, []);

  if (weeklyd == undefined && weekly1 != undefined) {
    setWeeklyd(weekly1);
    return <div>
      <CircularProgress color="primary" />
    </div>
  }else if (weeklyd == undefined) {
    return <div>
      <CircularProgress color="primary" />
    </div>
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

  return <div style={{width: "100%", height: "320px"}}>
    <LineChart_ height={300} width={620} data={dispdata} keyName={"name"} keyList={ks}></LineChart_>
  </div>
}


let SentimentDetailed = (props) => {

  const location = props.location;

  return (
    <div style={detailStyle}>
      <h3>Sentiment data</h3>
      <h4>Weekly Sentiment Score</h4>
      <WeeklySentiment location={location} />
  </div>
  )
}

let SportsDetailed = (props) => {
  const location = props.location;

  const start_time = "2018 1";
  const end_time = "2021 5";
  const lw = sports;

  const [sportcount, setSportcount] = useState(undefined);

  useEffect(
    () => {
      fetchCount(start_time, end_time, lw, setSportcount);
    }
    , [])
  
  let t = [];
  if (sportcount != undefined) {
    for (let i of Object.keys(sportcount)) {
      if (location.includes(namesCities[i])) {
        t.push(<CityDetailed1 ct={i} dt={sportcount[i]} vn={"sport counts"} />)
      }
    }
  }

  return (
    <div style={detailStyle}>
      <h3>Sports data</h3>
      {t}
      {t.length == 0 && location.length != 0? <CircularProgress color="primary" />: undefined}
  </div>
  )
}

let CityRadar = (city, data) => {

}

let RadarDetail = (props) => {
  let res = [employres, medicareres, sentimentres,
    sportres, tourismres];

  let name = ["Employment", "Medicare", "Sentiment", "Sports", "Tourism"];

  let rs = {};
  for (let ct of Object.keys(citiesNames)) {
    let i = 0;

    rs[citiesNames[ct]] = [];
    while (i < res.length) {
      let re = res[i];
      let tmp = { "key": name[i] };
      tmp[citiesNames[ct]] = re["rank"][ct];
      rs[citiesNames[ct]].push(tmp);
      i += 1;
    }
  }

  let rd = [];

  for (let ctname of Object.keys(rs)) {
    let dt = rs[ctname];
    rd.push(<h3>{ctname} result:</h3>)
    rd.push(
        <RadarChart outerRadius={90} width={730} height={250} data={dt}>
      <PolarGrid />
      <PolarAngleAxis dataKey="key" />
      <PolarRadiusAxis angle={30} domain={[0, 4]} />
        <Radar name={ctname} dataKey={ctname} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
    )
  }

  /*let i = 0;
  while (i < res.length) {
    let re = res[i];
    rs.push(re["rank"]);
    rs[rs.length - 1]["key"] = name[i];
    // rs[rs.length - 1]["fullmark"] = 4;
    i += 1;
  }*/

  return rd;
  
}

let ResultDetailed = (props) => {
  const location = props.location;

  return (
    <div style={detailStyle}>
      <h3>Results</h3>
      <RadarDetail />
  </div>
  )
}

const detailStyle = {
  marginBottom: "64px",
}


let Detailed = (props) => {
  const location = props.location;
  const state = props.state;

  const [collaps, setCollaps] = useState(false);

  return <div style={{marginBottom: "32px"}}>
    <DT t={"Scenario 1: the Best city"} collaps={collaps} setCollaps={setCollaps} />
    { location.length != 0? undefined: <p>No location is selected</p>}
    {state[RESULT_DATA] && !collaps ? <ResultDetailed location={location} /> : null}
      {state[LABOUR_DATA] && !collaps ? <LabourDetailed location={location} /> : null}
      {state[MEDICARE_DATA] && !collaps ? <MedicareDetailed location={location} /> : null}
    {state[TOURISM_DATA] && !collaps ? <TourismDetailed location={location} /> : null}
    {state[SENTIMENT_DATA] && !collaps ? <SentimentDetailed location={location} /> : null}
    {state[SPORTS_DATA] && !collaps ? <SportsDetailed location={location} /> : null}
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
          label={i.slice(0,1).toUpperCase() + i.slice(1,i.length)}
        />
      );
    }
    return children;
  };

  return <FormGroup>{Radios()}</FormGroup>;
}

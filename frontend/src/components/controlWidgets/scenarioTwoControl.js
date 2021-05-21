import {
  Fab, Paper, FormGroup, FormControlLabel,
  Checkbox, InputLabel, MenuItem, FormControl, Select, Slider, ListSubheader, CircularProgress,
  Chip
} from '@material-ui/core';

import { ExpandLess, ExpandMore } from "@material-ui/icons";

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

import DT from "./detailTitle.js";


import { cities, host, citiesNames, namesCities } from "../../consts/consts.js";


// initializing
let init = () => {
  let [citySA3map, citySA4map, cityLGAmap] = getCityLocMap();
};

init();

let wordSubProcess = (wSnamel) => {
  let tmp = [];
  for (let i of Object.keys(wSnamel)) {
    tmp.push({ "value": i, "count": wSnamel[i] });
  }
  return tmp;
}

let wordToWords = (word, locations) => {
  let tmp = {};
  console.log(word);
  for (let i of locations) {
    let snamel = citiesNames[i];
    console.log(snamel);
    if (snamel in word) {
      tmp[snamel] = wordSubProcess(word[snamel]);
    }
  }
  return tmp;
}

let wwcc = undefined;

let Detailed = (props) => {
  const location = props.location;
  const state = props.state;

  /*const word = {
    "Melbourne": {
      "clean": 99,
      "hi": 98
    },
    "Canberra": {
      "ki": 99,
      "like": 98,
    },
    "Brisbane": {
      "hi": 88,
      "ok": 84,
    },
    "Sydney": {
      "eat": 89,
      "hi": 87,
    }
  }*/

  const [word, setWord] = useState(undefined);
  const [collaps, setCollaps] = useState(false);

  const start_time = "2019 3";
  const end_time = "2021 3";

  // TODO timeline
  
  // TODO tops

  useEffect(() => {
    if (wwcc == undefined) {
      fetch(host + "/api/cityWordfreq", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "specify_time": 1,
        "start_time": start_time,
        "end_time": end_time
      })
    })
      .then(rp =>
        rp.json()
      )
      .then(res => {
        // weeklyd = res["content"];
        let w = res["content"];
        // weekly1 = w;
        wwcc = w;
        console.log(w);
        // console.log(res["content"]);
        // setWeeklyd(w);
        setWord(w);
      })
    }
  }, []);
  

  if (word == undefined && wwcc != undefined) {
    setWord(wwcc);
    return <div>
      <h2>Scenario 2</h2>
      {location.length != 0 ? undefined : <p>No location is selected</p>}
      <CircularProgress color="primary" />
    </div>
  }

  if (word == undefined) {
    return <div>
      <h2>Scenario 2</h2>
      {location.length != 0 ? undefined : <p>No location is selected</p>}
      <CircularProgress color="primary" />
    </div>
  }
  

  let citWords = wordToWords(word, location);

  console.log(citWords);

  let wc = [];
  for (let ct of Object.keys(citWords)) {
    wc.push(<div><h4>Word frequency: {ct}</h4><TagCloud
      minSize={18}
      maxSize={35}
      tags={citWords[ct]}
      onClick={tag => alert(`'${tag.value}' was selected!`)}
    /></div>)
  }

  console.log(wc);

  return <div style={{marginBottom: "32px"}}>
    <DT t={"Scenario 2: Word frequency"} collaps={collaps} setCollaps={setCollaps} />
    { location.length != 0? undefined: <p>No location is selected</p>}
    {collaps? undefined: wc}
  </div>
}


export default function ScenarioTwoControl(props) {
  // console.log(props.location)
  const setGeoJsonData = props.setGeoJsonData;
  const addComp = props.addComp;
  const delComp = props.delComp;
  const location = props.location;

  const key = "scenariotwo";

  // const RadioButtonList = [LABOUR_DATA, MEDICARE_DATA, TOURISM_DATA];

  const onlySwitch = "Enable";

  let inst = {onlySwitch: false};

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

    newState[onlySwitch] ? addComp(
      key, <Detailed state={newState} location={location} />
    ): delComp(key);
  };


  let Radios = () => {
    let children = [];
    
    children.push(
      <FormControlLabel
        control={
          <Checkbox onChange={handleChange} name={onlySwitch} />
        }
        label={onlySwitch}
      />
    );
    return children;
  };

  return <FormGroup>{Radios()}</FormGroup>;
}

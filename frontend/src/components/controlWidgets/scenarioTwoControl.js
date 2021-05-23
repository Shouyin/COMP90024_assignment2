import {
  Fab, Paper, FormGroup, FormControlLabel,
  Checkbox, Slider, CircularProgress,
  Chip
} from '@material-ui/core';

import { TagCloud } from 'react-tagcloud';
import React, { useEffect, useState } from "react";


import { rangeMax, startYear } from "../../consts/consts.js";

import { getCityLocMap } from "../../aurin_data/map.js";

import DT from "./detailTitle.js";


import { cities, host, citiesNames, namesCities } from "../../consts/consts.js";

let wordSubProcess = (wSnamel, tops) => {
  let tmp = [];
  for (let i of Object.keys(wSnamel)) {
    tmp.push({ "value": i + " (" + wSnamel[i] + ")", "count": wSnamel[i] });
  }
  tmp.sort((first, second) => {
    return second.count - first.count;
  })
  return tmp.slice(0, tops);
}

let wordToWords = (word, locations, tops) => {
  let tmp = {};
  console.log(word);
  for (let i of locations) {
    let snamel = citiesNames[i];
    console.log(snamel);
    if (snamel in word) {
      tmp[snamel] = wordSubProcess(word[snamel], tops);
    }
  }
  return tmp;
}

let wwcc = undefined;
let wwccst = undefined;
let wwccet = undefined;
let loading = false;

let Detailed = (props) => {
  const location = props.location;
  const state = props.state;
  const usetimerange = props.usetimerange;
  const tops = props.top;

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

  const start_time = nToM(usetimerange[0], " ");
  const end_time = nToM(usetimerange[1], " ");

  // TODO timeline
  
  // TODO tops

  useEffect(() => {
    console.log("effect" + start_time + end_time)
    if (wwcc == undefined || wwccst != start_time || wwccet != end_time) {
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
        wwccst = start_time;
        wwccet = end_time;
        console.log(w);
        loading = false;
        // console.log(res["content"]);
        // setWeeklyd(w);
        setWord(w);
      })
    }
  }, [usetimerange]);

  console.log("after" + start_time + end_time + loading)

  if (loading == true) {
    console.log("lgin")
    return <div>
      <h2>Scenario 2</h2>
      {location.length != 0 ? undefined : <p>No location is selected</p>}
      <CircularProgress color="primary" />
    </div>
  }
  

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
  

  let citWords = wordToWords(word, location, tops);

  console.log(citWords);

  let wc = [];
  for (let ct of Object.keys(citWords)) {
    wc.push(<div><h4>Word frequency: {ct}</h4><TagCloud
      minSize={18}
      maxSize={35}
      tags={citWords[ct]}
      onClick={tag => alert(`'${tag.count}'`)}
    /></div>)
  }

  console.log(wc);

  return <div style={{marginBottom: "32px"}}>
    <DT t={"Scenario 2: Word frequency"} collaps={collaps} setCollaps={setCollaps} />
    { location.length != 0? undefined: <p>No location is selected</p>}
    {collaps? undefined: wc}
  </div>
}

let nToM = (n, sep) => {
  let ya = startYear + Math.floor(n / 12)
  let m = (n % 12) + 1
  return ya.toString() + sep + m
}

let tm = undefined;

let TimerangeSlider = (props) => {
  const timerange = props.timerange
  const handleRange = props.handleRange

  const marks = [
    {
      value: 0,
      label: '18 Jan',
    },
    {
      value: 12,
      label: '19 Jan',
    },
    {
      value: 24,
      label: '20 Jan',
    },
    {
      value: 40,
      label: '21 May',
    },
  ];

  return <div>
    <p>Time range {nToM(timerange[0], " ")} to {nToM(timerange[1], " ")}</p>
  <div style={{ display: "flex", justifyContent: "center"}}>
    <Slider
      style={{width: "90%"}}
        value={timerange}
      onChange={handleRange}
        marks={marks}
      max={rangeMax}
      />
    </div>
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
  const [top, setTop] = React.useState(10) // 0 - 40, 2018 - 1 - 2021 - 5
  const [timerange, setTimerange] = React.useState([25, rangeMax]) // 0 - 40, 2018 - 1 - 2021 - 5
  const [usetimerange, setUsetimerange] = React.useState(timerange);

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
        key, <Detailed state={state} usetimerange={usetimerange} top={top} location={props.location} />
      );
    },
    [props.location],
  );


  const handleChange = (event) => {
    let newState = { ...state, [event.target.name]: event.target.checked };
    setState(newState);

    newState[onlySwitch] ? addComp(
      key, <Detailed state={newState} usetimerange={usetimerange} top={top} location={location} />
    ): delComp(key);
  };

  const handleRange = (event, newValue) => {
    setTimerange(newValue);
    if (tm != undefined) {
      clearTimeout(tm);
    }
    tm = setTimeout(() => {
      loading = true;
      console.log(newValue)
      setUsetimerange(newValue)
      !shouldClose(state) ? addComp(
        key, <Detailed state={state} usetimerange={newValue} top={top} location={location} />
      ): delComp(key);
    }, 1000);
  };

  const handleTop = (event, newValue) => {
    setTop(newValue);
    !shouldClose(state) ? addComp(
      key, <Detailed state={state} usetimerange={usetimerange} top={newValue} location={location} />
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

  return <FormGroup>
    {Radios()}
    <p>Number of top words</p>
    <div style={{ display: "flex", justifyContent: "center"}}>
    <Slider
      style={{ width: "90%" }}
      defaultValue={top}
      step={1}
      marks
      min={1}
      max={100}
      valueLabelDisplay="auto"
      onChange={handleTop}
      
    />
    </div>
    <TimerangeSlider timerange={timerange} handleRange={handleRange} />
  </FormGroup>;
}

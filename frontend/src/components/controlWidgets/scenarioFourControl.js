import {
  Fab, Paper, FormGroup, FormControlLabel,
  Checkbox, InputLabel, MenuItem, FormControl, Select, Slider, ListSubheader, CircularProgress,
  Chip
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import React, { useState, useEffect } from "react";

import regionsa3 from "../../aurin_data/regions/sa3.json";
import regionsa4 from "../../aurin_data/regions/sa4.json";
import regionlga from "../../aurin_data/regions/lga2018.json";


import DisplayMap from "../displayMap.js";
import { defaultViewport, host, namesCities, foods, drinks, foodDrinks } from "../../consts/consts.js";
import geojsonAULess from "../../shapes/geojsonAUless.json";


import { initLabour, initMedicare, initTourism } from "../../aurin_data/p.js";
import { getCityLocMap } from "../../aurin_data/map.js";
import { Typography } from "@material-ui/core";

import BarChart_ from "../plots/BarChart_.js";

import { fetchSentiment, fetchCount } from "./request.js";

import { rangeMax, startYear } from "../../consts/consts.js";

import DT from "./detailTitle.js";


// initializing
let init = () => {
  let [citySA3map, citySA4map, cityLGAmap] = getCityLocMap();
};

init();


let CityDetailed = (props) => {
  const dt = props.dt;
  const ct = props.ct;
  const vn = props.vn;
  let bd = [];
  for (let fd of Object.keys(dt)) {
    let tmp = { "name": fd, [vn]: dt[fd] };
      bd.push(tmp);
  }
  console.log(bd);
  return <div>
    <h4>{ct}: {vn}</h4>
    <BarChart_ data={bd} keyName={"name"} keyList={[vn]} brush_flag={false} height={300} width={560} />
    </div>
}

let Sentifood = (props) => {
  const location = props.location;
  const usetimerange = props.usetimerange;
  const foodTags = props.foodTags;

  const start_time = nToM(usetimerange[0], " ");
  const end_time = nToM(usetimerange[1], " ");

  const [sentiments, setSentiments] = useState(undefined);

  let wl = Object.keys(foodTags);

  useEffect(() => {
    fetchSentiment(start_time, end_time, wl, setSentiments)
  }, [props.foodTags, props.usetimerange]);

  if (!sentiments) {
    return <div>
      {location.length != 0 ? undefined : <p>No location is selected</p>}
      <CircularProgress color="primary" />
    </div>
  }

  const dt = sentiments;

  let sentis = [];
  for (let c of Object.keys(dt)) {
    if (location.includes(namesCities[c])) {
      sentis.push(<CityDetailed dt={dt[c]} ct={c} vn={"sentiments"} />);
    }
  }

  return sentis

}

let Countsfood = (props) => {
  const location = props.location;
  const usetimerange = props.usetimerange;
  const foodTags = props.foodTags;

  const start_time = nToM(usetimerange[0], " ");
  const end_time = nToM(usetimerange[1], " ");

  const [countsfood, setCountsfood] = useState(undefined);

  let wl = Object.keys(foodTags);

  useEffect(() => {
    fetchCount(start_time, end_time, wl, setCountsfood)
  }, [props.foodTags, props.usetimerange]);

  if (!countsfood) {
    return <div>
      {location.length != 0 ? undefined : <p>No location is selected</p>}
      <CircularProgress color="primary" />
    </div>
  }

  const dt = countsfood;

  let cs = [];
  for (let c of Object.keys(dt)) {
    if (location.includes(namesCities[c])) {
      cs.push(<CityDetailed dt={dt[c]} ct={c} vn={"counts"} />);
    }
  }

  return cs

}

const onlySwitch = "Sentiment";
const secondSwitch = "Count";

let Detailed = (props) => {
  const location = props.location;
  const state = props.state;
  const usetimerange = props.usetimerange;

  console.log(usetimerange);

  // const [sentiments, setSentiments] = useState(undefined);

  const [collaps, setCollaps] = useState(false);

  const foodTags = props.foodTags;

  return <div style={{marginBottom: "32px"}}>
    <DT t={"Scenario 4: foods"} collaps={collaps} setCollaps={setCollaps} />
    {location.length != 0 ? undefined : <p>No location is selected</p>}
    {state[onlySwitch]  && !collaps ? <h3>Sentiments</h3> : undefined}
    {state[onlySwitch]  && !collaps ? <Sentifood location={location} usetimerange={usetimerange} foodTags={foodTags} /> : undefined}
    {state[secondSwitch]  && !collaps ? <h3>Counts</h3> : undefined}
    {state[secondSwitch] && !collaps ?<Countsfood location={location} usetimerange={usetimerange} foodTags={foodTags} />: undefined}
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
      style={{width: "80%"}}
        value={timerange}
      onChange={handleRange}
        marks={marks}
      max={rangeMax}
      />
    </div>
  </div>

}


export default function ScenarioFourControl(props) {
  // console.log(props.location)
  const setGeoJsonData = props.setGeoJsonData;
  const addComp = props.addComp;
  const delComp = props.delComp;
  const location = props.location;

  const key = "scenariofour";

  // const RadioButtonList = [LABOUR_DATA, MEDICARE_DATA, TOURISM_DATA];

  const onlySwitch = "Sentiment";
  const secondSwitch = "Count";

  let inst = { onlySwitch: false };
  let foodTags1 = {};

  const [state, setState] = React.useState(inst);
  const [foodTags, setfoodTags] = React.useState(foodTags1);
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
      
      shouldClose(state) ? delComp(key):
      addComp(
        key, <Detailed state={state} foodTags={foodTags} usetimerange={usetimerange} location={props.location} />
      );
    },
    [props.location],
  );

  const handleChange = (event) => {
    let newState = { ...state, [event.target.name]: event.target.checked };
    setState(newState);

    !shouldClose(newState) ? addComp(
      key, <Detailed state={newState} foodTags={foodTags} usetimerange={usetimerange} location={location} />
    ): delComp(key);
  };

  const handleTags = (event) => {
    let newg = { ...foodTags, [event.target.value]: true };
    // console.log(newg);
    setfoodTags(newg);

    !shouldClose(state) ? addComp(
      key, <Detailed state={state} foodTags={newg} usetimerange={usetimerange} location={location} />
    ): delComp(key);
  }

  const handleDelete = (k) => {
    let newg = { ...foodTags };
    delete newg[k];
    console.log(k);
    setfoodTags(newg);
    !shouldClose(state) ? addComp(
      key, <Detailed state={state} foodTags={newg} usetimerange={usetimerange} location={location} />
    ): delComp(key);
  }

  const handleRange = (event, newValue) => {
    setTimerange(newValue);
    if (tm != undefined) {
      clearTimeout(tm);
    }
    tm = setTimeout(() => {
      console.log(newValue)
      setUsetimerange(newValue)
      !shouldClose(state) ? addComp(
        key, <Detailed state={state} foodTags={foodTags} usetimerange={newValue} location={location} />
      ): delComp(key);
    }, 1000);
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
    children.push(
      <FormControlLabel
        control={
          <Checkbox onChange={handleChange} name={secondSwitch} />
        }
        label={secondSwitch}
      />
    );
    return children;
  };

  let Tags = () => {
    let tags = [];
    
    tags.push(<ListSubheader>foods</ListSubheader>);
    for (let i of foods) {
      tags.push(
        <MenuItem value={i}>{i}</MenuItem>
      )
    }
    tags.push(<ListSubheader>drinks</ListSubheader>);
    for (let i of drinks) {
      tags.push(
        <MenuItem value={i}>{i}</MenuItem>
      )
    }
    return tags;
  }

  let chips = () => {
    let cs = [];
    for (let i of Object.keys(foodTags)) {
      cs.push(
        <Chip style={{ margin: "2px" }} label={i} onDelete={() => handleDelete(i)} color="primary" />
      )
    }
    return cs;
  }

  return <FormGroup style={{ width: "100%" }}>{Radios()}
    <TimerangeSlider timerange={timerange} handleRange={handleRange} />
    <FormControl style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">Select foods or drinks</InputLabel>
        <Select
          value={""}
          onChange={handleTags}
        >
        {Tags()}
        </Select>
      </FormControl>
    <p>Selected</p>
    <Paper style={{display: 'flex',
    // justifyContent: 'center',
      flexWrap: 'wrap',
      flexDirection: 'row',
    padding: "3px",
      maxHeight: "200px",
      overflow: "scroll",
      margin: "8px 0px",}}>
      {chips()}
    </Paper>
  </FormGroup>;
}

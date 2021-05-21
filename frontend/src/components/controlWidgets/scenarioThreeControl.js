import {
  Fab, Paper, FormGroup, FormControlLabel,
  Checkbox, InputLabel, MenuItem, FormControl, Select, Slider, ListSubheader, CircularProgress,
  Chip
} from '@material-ui/core';

import { ExpandLess, ExpandMore } from "@material-ui/icons";

import React, { useEffect, useState } from "react";

import regionsa3 from "../../aurin_data/regions/sa3.json";
import regionsa4 from "../../aurin_data/regions/sa4.json";
import regionlga from "../../aurin_data/regions/lga2018.json";


import DisplayMap from "../displayMap.js";
import { defaultViewport, namesCities, rangeMax, startYear, scomo } from "../../consts/consts.js";
import geojsonAULess from "../../shapes/geojsonAUless.json";

import electionRes from "../../aurin_data/results/election_result.json";


import { initLabour, initMedicare, initTourism } from "../../aurin_data/p.js";
import { getCityLocMap } from "../../aurin_data/map.js";
import BarChart_ from "../plots/BarChart_";
import { LocationSearching } from "@material-ui/icons";
import DT from "./detailTitle.js";

import { fetchSentiment, fetchCount } from "./request.js";


// initializing
let init = () => {
  let [citySA3map, citySA4map, cityLGAmap] = getCityLocMap();
};

init();

let ElectionDetail = (props) => {
  const location = props.location;

  const librPr = " liberal_percent";
  const librSw = " liberal_swing";

  let librPrDt = electionRes[librPr];
  let librSwDt = electionRes[librSw];

  // let librPrdat = [];
  let ds = [];
  let tmp = { "name": librPr }
  let ks = [];
  for (let i of Object.keys(librPrDt)) {
    if (location.includes(namesCities[i])) {
      ks.push(i);
      tmp[i] = librPrDt[i]? librPrDt[i]:0;
    }
  }

  ds.push(
    <h4>Libral Percent</h4>
  )

  ds.push(
    <BarChart_ data={[tmp]} keyName={"name"} keyList={ks} brush_flag={false} height={300} width={560} />
  )

  tmp = { "name": librSw }
  // ks = [];
  for (let i of Object.keys(librSwDt)) {
    if (location.includes(namesCities[i])) {
      // ks.push(i);
      tmp[i] = librSwDt[i]? librSwDt[i]:0;
    }
  }

  ds.push(
    <h4>Libral swing</h4>
  )

  ds.push(
    <BarChart_ data={[tmp]} keyName={"name"} keyList={ks} brush_flag={false} height={300} width={560} />
  )

  return ds;

}

let nToM = (n, sep) => {
  let ya = startYear + Math.floor(n / 12)
  let m = (n % 12) + 1
  return ya.toString() + sep + m
}

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

let Sentiscomo = (props) => {
  const location = props.location;
  const usetimerange = props.usetimerange;
  const scomoTags = props.scomoTags;

  const start_time = nToM(usetimerange[0], " ");
  const end_time = nToM(usetimerange[1], " ");

  const [sentiments, setSentiments] = useState(undefined);

  let wl = Object.keys(scomoTags);

  useEffect(() => {
    fetchSentiment(start_time, end_time, wl, setSentiments)
  }, [props.scomoTags, props.usetimerange]);

  if (!sentiments) {
    return <div>
      {location.length != 0 ? undefined : <p>No location is selected</p>}
      <CircularProgress color="primary" />
    </div>
  }

  const dt = sentiments;

  let sentis = [<h3>Sentiments</h3>];
  for (let c of Object.keys(dt)) {
    if (location.includes(namesCities[c])) {
      sentis.push(<CityDetailed dt={dt[c]} ct={c} vn={"sentiments"} />);
    }
  }

  return sentis
}

let Detailed = (props) => {
  const location = props.location;
  const state = props.state;
  const scomoTags = props.scomoTags;
  const usetimerange = props.usetimerange;

  const [collaps, setCollaps] = useState(false);

  return <div style={{marginBottom: "32px"}}>
    <DT t={"Scenario 3"} collaps={collaps} setCollaps={setCollaps} />
    {collaps ? undefined : <ElectionDetail location={location} />}
    {collaps ? undefined : <Sentiscomo scomoTags={scomoTags} usetimerange={usetimerange} location={location} />}
  </div>
}


export default function ScenarioThreeControl(props) {
  // console.log(props.location)
  const setGeoJsonData = props.setGeoJsonData;
  const addComp = props.addComp;
  const delComp = props.delComp;
  const location = props.location;

  const key = "scenariothree";

  // const RadioButtonList = [LABOUR_DATA, MEDICARE_DATA, TOURISM_DATA];

  const onlySwitch = "Enable";

  let inst = {onlySwitch: false};

  const [state, setState] = React.useState(inst);
  const [scomoTags, setScomoTags] = React.useState({});
  const [timerange, setTimerange] = React.useState([25, rangeMax]) // 0 - 40, 2018 - 1 - 2021 - 5
  const [usetimerange, setUsetimerange] = React.useState(timerange);

  useEffect(
    () => {
      // console.log(key)
      state[onlySwitch] ? addComp(
        key, <Detailed state={state} scomoTags={scomoTags} usetimerange={usetimerange} location={props.location} />
      ) : delComp(key);
    },
    [props.location],
  );

  const handleRange = (event, newValue) => {
    setTimerange(newValue);
    if (tm != undefined) {
      clearTimeout(tm);
    }
    tm = setTimeout(() => {
      console.log(newValue)
      setUsetimerange(newValue)
      !shouldClose(state) ? addComp(
        key, <Detailed state={state} scomoTags={scomoTags} usetimerange={usetimerange} usetimerange={newValue} location={location} />
      ): delComp(key);
    }, 1000);
  };

  const shouldClose = (state) => {
    for (let i of Object.keys(state)) {
      if (state[i]) {
        return false;
      }
    }
    return true;
  }


  const handleChange = (event) => {
    let newState = { ...state, [event.target.name]: event.target.checked };
    setState(newState);

    newState[onlySwitch] ? addComp(
      key, <Detailed state={newState} scomoTags={scomoTags} usetimerange={usetimerange} location={location} />
    ): delComp(key);
  };

  const handleTags = (event) => {
    let newg = { ...scomoTags, [event.target.value]: true };
    // console.log(newg);
    setScomoTags(newg);

    !shouldClose(state) ? addComp(
      key, <Detailed state={state} scomoTags={newg} usetimerange={usetimerange} location={location} />
    ): delComp(key);
  }

  const handleDelete = (k) => {
    let newg = { ...scomoTags };
    delete newg[k];
    console.log(k);
    setScomoTags(newg);
    !shouldClose(state) ? addComp(
      key, <Detailed state={state} scomoTags={newg} usetimerange={usetimerange} location={location} />
    ): delComp(key);
  }

  let Tags = () => {
    let tags = [];
    for (let i of scomo) {
      tags.push(
        <MenuItem value={i}>{i}</MenuItem>
      )
    }
    return tags;
  }

  let chips = () => {
    let cs = [];
    for (let i of Object.keys(scomoTags)) {
      cs.push(
        <Chip style={{ margin: "2px" }} label={i} onDelete={() => handleDelete(i)} color="primary" />
      )
    }
    return cs;
  }


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
    <TimerangeSlider timerange={timerange} handleRange={handleRange} />
    <FormControl style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">Select hashtags</InputLabel>
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

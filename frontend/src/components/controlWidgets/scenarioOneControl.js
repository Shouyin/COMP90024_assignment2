import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import React from "react";

import regionsa3 from "../../aurin_data/regions/sa3.json";
import regionsa4 from "../../aurin_data/regions/sa4.json";
import regionlga from "../../aurin_data/regions/lga2018.json";


import DisplayMap from "../displayMap.js";
import { defaultViewport } from "../../consts/consts.js";
import geojsonAULess from "../../shapes/geojsonAUless.json";


import { initLabour, initMedicare, initTourism } from "../../aurin_data/p.js";
import { getCityLocMap } from "../../aurin_data/map.js";


const Disabled = "disable";


// initializing
let init = () => {
  let [citySA3map, citySA4map, cityLGAmap] = getCityLocMap();

  /*let labour = initLabour(citySA4map);
  let medicare = initMedicare(citySA3map);
  let tourism = initTourism(cityLGAmap);*/
};

init();


const LABOUR_DATA = "labour";
const MEDICARE_DATA = "medicare";
const TOURISM_DATA = "tourism";

let LabourDetailed = (props) => {
  const location = props.location;

  return <div>
1
  </div>
}

let MedicareDetailed = (props) => {
  const location = props.location;
  return <div>
    2
  </div>
}

let TourismDetailed = (props) => {
  const location = props.location;
  return <div>
    3
  </div>
}


let Detailed = (props) => {
  const location = props.location;
  const state = props.state;

  return <div>
      {state[LABOUR_DATA] ? <LabourDetailed location={location} /> : null}
      {state[MEDICARE_DATA] ? <MedicareDetailed location={location} /> : null}
      {state[TOURISM_DATA] ? <TourismDetailed location={location} /> : null}
  </div>
}


export default function ScenarioOneControl(props) {
  console.log(props.location)
  const setGeoJsonData = props.setGeoJsonData;
  const addComp = props.addComp;
  const delComp = props.delComp;
  const location = props.location;

  const key = "scenarioone";

  const RadioButtonList = [LABOUR_DATA, MEDICARE_DATA, TOURISM_DATA];

  let inst = {};
  for (let i of RadioButtonList) {
    inst[i] = false;
  }

  const [state, setState] = React.useState(inst);

  const names = []

  const handleChange = (event) => {
    let newState = { ...state, [event.target.name]: event.target.checked };
    setState(newState);

    addComp(
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

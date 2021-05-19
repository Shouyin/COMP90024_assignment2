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


// initializing
let init = () => {
  let [citySA3map, citySA4map, cityLGAmap] = getCityLocMap();
};

init();



let Detailed = (props) => {
  const location = props.location;
  const state = props.state;

  return <div>
    <h2>Scenario 4</h2>
      
  </div>
}


export default function ScenarioTwoControl(props) {
  // console.log(props.location)
  const setGeoJsonData = props.setGeoJsonData;
  const addComp = props.addComp;
  const delComp = props.delComp;
  const location = props.location;

  const key = "scenariofour";

  // const RadioButtonList = [LABOUR_DATA, MEDICARE_DATA, TOURISM_DATA];

  const onlySwitch = "Enable";

  let inst = {onlySwitch: false};

  const [state, setState] = React.useState(inst);


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

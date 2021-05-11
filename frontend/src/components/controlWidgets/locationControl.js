import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { FormLabel } from "@material-ui/core";
import React from "react";

import { defaultViewport, cityLevel } from "../../consts/consts.js";



/*const Disabled = "disable";
const NotShowing = [];

let RadioButtonList = [Disabled]; // all column keys
let attributes = { [Disabled]: Disabled }; // map of column and their human friendly names

let status = {}; // init checkboxes status as false

// str.strip
let trim = (name) => {
  return name.replace(/^\s+|\s+$/g, "");
};

// initializing
let init = () => {
  // mapping column and their human friendly names
  for (let i of mdmedicare.selectedAttributes) {
    attributes[i.name] = i.title;
  }

  console.log(attributes);

  // adding column keys
  const sample = medicaresa3[0];
  for (let i of Object.keys(sample)) {
    if (!NotShowing.includes(i)) {
      RadioButtonList.push(i);
      status[i] = false;
    }
  }
};

init();*/

let lvLocationMap = {
  [cityLevel]: ["Melbourne", "Brisbane", "Sydney", "Canberra"],
}


export default function LocationControl(props) {

  /*const setGeoJsonData = props.setGeoJsonData;
  const addComp = props.addComp;
  const delComp = props.delComp;*/

  const setLocation = props.setLocation;
  const lv = props.lv;

  // const key = "medicare";

  let cities = lvLocationMap[lv];

  let inst = {}
  for (let i of cities) {
    inst[i] = false;
  }

  const [state, setState] = React.useState(inst);

  const handleChange = (event) => {
    let newState = { ...state, [event.target.name]: event.target.checked };
    setState(newState);
    let newLocation = [];
    for (let i of cities) {
      if (newState[i]) {
        newLocation.push(i);
      }
    }
    setLocation(newLocation);
  };


  let Radios = () => {
    let children = [];
    for (let i of cities) {
      // console.log(attributes, i);
      children.push(<FormControlLabel control={<Checkbox onChange={handleChange} checked={state[i]} name={i}/>} label={i} />)
    }
    return children;
  }

  return (
    <FormGroup>
      {Radios()}
    </FormGroup>
  );
}

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { FormLabel } from "@material-ui/core";
import React from "react";

import DisplayMap from "../displayMap.js";
import { defaultViewport } from "../../consts/consts.js";
import geojsonAULess from "../../shapes/geojsonAUless.json";


import medicaresa3 from "../../aurin_data/medicare_sa3/medicare_sa3.json";
import mdmedicare from "../../aurin_data/medicare_sa3/metadata_medicare_sa3.json";

const Disabled = "disable";
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

init();

export default function MedicareControl(props) {

  const setGeoJsonData = props.setGeoJsonData;
  const addComp = props.addComp;
  const delComp = props.delComp;

  const key = "medicare";

  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });

      addComp(
        key,
        <div key={key}>
          <DisplayMap
            width={"300px"}
            height={"200px"}
            viewport={defaultViewport} // initial viewport
            geojsonData={geojsonAULess}
          />
        </div>
      );
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
          />
        }
        label="Secondary"
      />
    <FormControlLabel control={<Checkbox name="checkedB" />} label="Uncontrolled" />
    <FormControlLabel control={<Checkbox name="checkedC" />} label="Uncontrolled" />
    <FormControlLabel control={<Checkbox name="checkedD" />} label="Uncontrolled" />
    </FormGroup>
  );
}

import React, { useState, useCallback, useMemo } from "react";
import {
  Fab, Paper, Tabs, Tab, Accordion, AccordionSummary,
  Typography, AccordionDetails, Button, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio
} from '@material-ui/core';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import DisplayMap from "../displayMap.js";
import { defaultViewport } from "../../consts/consts.js";

import geojsonAULess from "../../shapes/geojsonAUless.json";

import laboursa4 from "../../aurin_data/labour_sa4/labour_sa4.json";
import mdlabour from "../../aurin_data/labour_sa4/metadata_labour_sa4.json";


const Disabled = "disable";
const NotShowing = ["state_name_2016", "gccsa_name_2016", "fid"];

let RadioButtonList = [Disabled]; // all column keys
let attributes = { [Disabled]: Disabled }; // map of column and their human friendly names

// str.strip
let trim = (name) => {
  return name.replace(/^\s+|\s+$/g, '');
}

// initializing
let init = () => {

  // mapping column and their human friendly names
  for (let i of mdlabour.selectedAttributes) {
    attributes[i.name] = i.title;
  }

  console.log(attributes);

  // adding column keys
  const sample = laboursa4[0];
  for (let i of Object.keys(sample)) {
    if (!NotShowing.includes(i)) {
      RadioButtonList.push(i);
    }
  }
}

init();

let Radios = () => {
  let children = [];
  for (let i of RadioButtonList) {
    // console.log(attributes, i);
    children.push(<FormControlLabel value={i} control={<Radio />} label={attributes[trim(i)]} />)
  }
  return children;
}

let LabourControl = (props) => {
  const setGeoJsonData = props.setGeoJsonData;
  const addComp = props.addComp;
  const delComp = props.delComp;
  const [value, setValue] = useState(RadioButtonList[0]);

  // when the radio group changes, new components should be added to the right side
  // addComp(key, comp)
  const handleChange = (event) => {
    const key = "labour";
    addComp(key, <div key={key}>
      <DisplayMap
        width={"300px"}
        height={"200px"}
        viewport={defaultViewport} // initial viewport
        geojsonData={geojsonAULess}
      />
      <p>edilfas iukerghf iuazse gifhszaiue</p>
    </div>)
    setValue(event.target.value);
  };

  return <FormControl component="fieldset">
  <FormLabel component="legend">Properties</FormLabel>
  <RadioGroup aria-label="properties" name="props" value={value} onChange={handleChange}>
      {Radios()}
  </RadioGroup>
</FormControl>
}
export default LabourControl;
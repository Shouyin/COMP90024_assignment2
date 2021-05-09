import React, { useState, useCallback, useMemo } from "react";
import {
  Fab, Paper, Tabs, Tab, Accordion, AccordionSummary,
  Typography, AccordionDetails, Button, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio
} from '@material-ui/core';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import laboursa4 from "../../aurin_data/labour_sa4/labour_sa4.json";
import mdlabour from "../../aurin_data/labour_sa4/metadata_labour_sa4.json";


const Disabled = "disable";
const NotShowing = ["state_name_2016", "gccsa_name_2016", "fid"];

let RadioButtonList = [Disabled];
let attributes = { [Disabled]: Disabled };

function trim(name) 
    {
        return name.replace(/^\s+|\s+$/g, '');
    };

let init = () => {

  for (let i of mdlabour.selectedAttributes) {
    attributes[i.name] = i.title;
  }

  console.log(attributes);

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
    console.log(attributes, i);
    children.push(<FormControlLabel value={i} control={<Radio />} label={attributes[trim(i)]} />)
  }
  return children;
}

let LabourControl = (props) => {
  const setGeoJsonData = props.setGeoJsonData;
  const [value, setValue] = useState(RadioButtonList[0]);

  const handleChange = (event) => {
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
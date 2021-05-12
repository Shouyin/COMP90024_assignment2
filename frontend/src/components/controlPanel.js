import React, { useState, useCallback, useMemo } from "react";
import { Fab, Paper, Tabs, Tab, Accordion, AccordionSummary, Typography, AccordionDetails, Button } from '@material-ui/core';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';


import LabourControl from "./controlWidgets/labourControl.js";
import MedicareControl from "./controlWidgets/medicareControl.js";
import LocationControl from "./controlWidgets/locationControl.js";
import SenarioOneControl from "./controlWidgets/scenarioOneControl.js";


let ControlWrapper = (insideControl, title) => {
  const [expanded, setExpanded] = useState(false);

  return <Accordion elevation={2} expanded={expanded} onChange={(e, ex) => setExpanded(ex)}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}>
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {insideControl}
    </AccordionDetails>
  </Accordion>
}

// get all controls, on the left side of the home page
let getControls = (scenario, setGeoJsonData, addComp, delComp, lv) => {

  return <Controls setGeoJsonData={setGeoJsonData} addComp={addComp} delComp={delComp} lv={lv} />
}

let defaultLocation = [];

let Controls = (props) => {
  const setGeoJsonData = props.setGeoJsonData;
  const addComp = props.addComp;
  const delComp = props.delComp;
  const lv = props.lv

  const [location, setLocation] = useState(defaultLocation);

  return <div style={{ position: "fixed", left: "32px", top: "128px", zIndex: 1, width: "20vw", minWidth: "280px" }}>
    <Paper elevation={2} style={{margin: "0px 0px 16px 0px"}}>
      <Typography variant="h6" component="h6" style={{padding: "16px 16px"}}>CONTROLS</Typography>
    </Paper>
    <div style={{ maxHeight: "calc(100vh - 240px)", padding: "2px", overflowY: "scroll", overflowX: "visible" }}>
      {ControlWrapper(<LocationControl setLocation={setLocation} lv={lv}/>, "Location")}
      {ControlWrapper(<LabourControl setGeoJsonData={setGeoJsonData} addComp={addComp} delComp={delComp} lv={lv} location={location}/>, "Labour")}
      {ControlWrapper(<MedicareControl setGeoJsonData={setGeoJsonData} addComp={addComp} delComp={delComp} lv={lv} location={location}/>, "Medicare")}
    </div>
    
  </div>
}

export default getControls;
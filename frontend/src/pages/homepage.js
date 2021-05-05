import React, { useState, useCallback, useMemo } from "react";
import DisplayMap from "./components/displayMap.js";
import geojsonAU from "./shapes/geojsonAU.json";
import geojsonAULess from "./shapes/geojsonAUless.json";
import geojsonLGAvc from "./shapes/geojsonLGAvc.json";
import { headerStyle } from "./styles/homepageStyle";

import { Fab, Paper, Tabs, Tab, Accordion, AccordionSummary, Typography, AccordionDetails, Button } from '@material-ui/core';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';


// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


const defaultViewport = {
  latitude: -25.27,
  longitude: 133.77,
  zoom: 3,
};

// mapType: different types of map
let getMap = (data, mapType, geojson, viewport) => {
  return <DisplayMap
    width={"100vw"}
    height={"100vh"}
    viewport={viewport} // initial viewport
    geojsonData={geojson}
  />
}

let getControlWrapper = (insideControl, title) => {
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

let getControl = (scenario, setGeoJsonData) => {

  const [expanded, setExpanded] = useState(0);

  // const handleChange = (p) => (e, expned) => setExpanded(expned? p:false);

  // const handleChange = (p) => (e, expned) => setExpanded(expned ? p : false);
  // const wrapper = (insideControl, title) => getControlWrapper(insideControl, title);

  return <div style={{ position: "fixed", left: "32px", top: "128px", zIndex: 1, width: "20vw", minWidth: "280px" }}>
    <Paper elevation={2} style={{margin: "0px 0px 16px 0px"}}>
      <Typography variant="h6" component="h6" style={{padding: "16px 16px"}}>CONTROLS</Typography>
    </Paper>
    <div style={{ maxHeight: "calc(100vh - 240px)", padding: "2px", overflowY: "scroll", overflowX: "visible" }}>
    {getControlWrapper(<div><Button onClick={() => setGeoJsonData(geojsonAU)}>
       scenario 1
      </Button>
      <Button onClick={() => setGeoJsonData(geojsonAU)}>
          scenario 2
      </Button>
      <Button onClick={() => setGeoJsonData(geojsonAU)}>
        free
      </Button>
        </div>, "Modes")}
    {getControlWrapper(<Button onClick={() => setGeoJsonData(geojsonAU)}>
      change
      </Button>, "Locations")}

      {getControlWrapper(<Button onClick={() => setGeoJsonData(geojsonAU)}>
        change
      </Button>, "Music")}
    </div>
  </div>
}

const scenario1 = 2;
const scenario2 = 3;

let HomePage = () => {

  const [value, setValue] = useState(1);
  const [geojsonData, setGeoJsonData] = useState(geojsonAULess)
  const handleChange = (e, newv) => {
    // value == 2: scenario 1
    // value == 3: scenario 2
    if (newv == scenario1) {
      setGeoJsonData(geojsonLGAvc);
    } else if (newv == scenario2) {
      setGeoJsonData(geojsonAU);
    } else {
      setGeoJsonData(geojsonAULess);
    }
    setValue(newv);
  }
  
  return (
    <div>
      <header style={headerStyle}>
        <Paper elevation={3} square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="header"
          >
            <Tab label="Assignment 2" disabled />
            <Tab label="HOME" />
            <Tab label="MELBOURNE" />
          </Tabs>
        </Paper>
      </header>
      {getControl("", setGeoJsonData)}
      {getMap("", "", geojsonData, defaultViewport)}
      <Paper elevation={3} style={{padding: "32px", backgroundColor: "white", zIndex: 1, position: "fixed", right: "0px", top: "0px", height: "95vh", width: "25vw", overflow: "scroll"}}>
        <h1>Melbourne</h1>
        <DisplayMap
          width={"300px"}
          height={"200px"}
          viewport={defaultViewport} // initial viewport
          geojsonData={geojsonAULess}
        />
        <p>edilfas iukerghf iuazse gifhszaiue</p>
        <DisplayMap
          width={"300px"}
          height={"300px"}
          viewport={defaultViewport} // initial viewport
          geojsonData={geojsonAULess}
        />
        <p>edilfas iukerghf iuazse gifhszaiue</p>
      </Paper>

    </div>
  );
};

/*<Fab color="primary" aria-label="add" style={{ position: "fixed", zIndex:1, bottom: "32px", left: "32px"}}>
        <AddIcon />
      </Fab> */

export default HomePage;

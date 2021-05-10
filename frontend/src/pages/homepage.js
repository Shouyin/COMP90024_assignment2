import React, { useState, useCallback, useMemo } from "react";
import DisplayMap from "../components/displayMap.js";
import DetailStream from "../components/detailStream.js";
import geojsonAU from "../shapes/geojsonAU.json";
import geojsonAULess from "../shapes/geojsonAUless.json";
import geojsonLGAvc from "../shapes/geojsonLGAvc.json";
import { headerStyle } from "./styles/homepageStyle";

import getControls from "../components/controlPanel.js";

import { defaultViewport } from "../consts/consts.js";

import { Fab, Paper, Tabs, Tab, Accordion, AccordionSummary, Typography, AccordionDetails, Button } from '@material-ui/core';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';


// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// mapType: different types of map
let getMap = (data, mapType, geojson, viewport) => {
  return <DisplayMap
    width={"100vw"}
    height={"100vh"}
    viewport={viewport} // initial viewport
    geojsonData={geojson}
  />
}

const scenario1 = 2;
const scenario2 = 3;

let HomePage = () => {

  const [value, setValue] = useState(1);
  const [geojsonData, setGeoJsonData] = useState(geojsonAULess);
  const [detailStreamComps, setDetailStreamComps] = useState({});
  const handleChange = (e, newv) => {
    // value == 2: scenario 1
    // value == 3: scenario 2
    /*if (newv == scenario1) {
      setGeoJsonData(geojsonLGAvc);
    } else if (newv == scenario2) {
      setGeoJsonData(geojsonAU);
    } else {
      setGeoJsonData(geojsonAULess);
    }
    setValue(newv);*/
  }

  // 用这个往右边添加可视化， 需要一个key作为唯一id
  const addComp = (key, comp) => {
    let tmp = Object.assign({key: comp}, detailStreamComps);
    // detailStreamComps[key] = comp;
    // console.log(detailStreamComps);
    setDetailStreamComps(tmp);
  }

  // 用这个删除
  const delComp = (key) => {
    delete detailStreamComps[key];
    setDetailStreamComps(Object.assign({}, detailStreamComps));
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
      {getControls("", setGeoJsonData, addComp, delComp)}
      {getMap("", "", geojsonData, defaultViewport)}
      <DetailStream comp={detailStreamComps} />

    </div>
  );
};

/*<Fab color="primary" aria-label="add" style={{ position: "fixed", zIndex:1, bottom: "32px", left: "32px"}}>
        <AddIcon />
      </Fab> */

export default HomePage;

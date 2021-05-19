import React, { useState, useCallback, useMemo } from "react";
import DisplayMap from "../components/displayMap.js";
import DetailStream from "../components/detailStream.js";
import geojsonAU from "../shapes/geojsonAU.json";
import geojsonAULess from "../shapes/geojsonAUless.json";
import geojsonLGAvc from "../shapes/geojsonLGAvc.json";
import { headerStyle } from "./styles/homepageStyle";

import getControls from "../components/controlPanel.js";

import { defaultViewport, cityLevel } from "../consts/consts.js";

import { Fab, Paper, Tabs, Tab, Accordion, AccordionSummary, Typography, AccordionDetails, Button } from '@material-ui/core';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';


import PieChart_ from "../components/plots/PieChart_.js"
import BarChart_ from "../components/plots/BarChart_.js"
import LineChart_ from "../components/plots/LineChart_.js"
import WordCloud_ from "../components/plots/WordCloud_.js"

// mapType: different types of map
let getMap = (data, mapType, geojson, viewport) => {
  return <DisplayMap
    width={"100vw"}
    height={"100vh"}
    viewport={viewport} // initial viewport
    geojsonData={geojson}
  />
}



// let HomePage = () => {
class HomePage extends React.Component {

  constructor() {
    super();
  }

  state = {
    "value": 1,
    "geojsonData": geojsonAULess,
    "detailStreamComps": {},
    "lv": ""
  };

  render() {

    let setValue = (newValue) => {
      this.setState({
        ... this.state, value: newValue
      });
    }

    let setGeoJsonData = (newGeo) => {
      this.setState({
        ... this.state, geojsonData: newGeo
      });
    }

    let setDetailStreamComps = (newDetail) => {
      console.log("??");
      console.log(newDetail);
      this.setState({
        ... this.state, detailStreamComps: newDetail
      });
    }

    let setLv = (newLv) => {
      this.setState({
        ... this.state, lv: newLv
      });
    }


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
      let tmp = { ...this.state.detailStreamComps, [key]: comp };
      // detailStreamComps[key] = comp;
      // console.log(this.state.detailStreamComps);
      // console.log(tmp);
      // setDetailStreamComps(tmp);
      this.state = {
        ... this.state, detailStreamComps: tmp
      }
      this.setState(this.state);
    }

    // 用这个删除
    const delComp = (key) => {
      // console.log("key"+key);
      delete this.state.detailStreamComps[key];
      // console.log(detailStreamComps);
      // let tmp = { ...this.state.detailStreamComps }
      this.setState(this.state);
      // setDetailStreamComps(tmp);
    }
      

    return (
      <div>
        {getControls("", setGeoJsonData, addComp, delComp, this.state.lv)}
        {getMap("", "", this.state.geojsonData, defaultViewport)}
        <DetailStream comp={this.state.detailStreamComps} />
      </div>
    );
  }
};

/*<header style={headerStyle}>
          <Paper elevation={3} square>
            <Tabs
              value={this.state.value}
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
        </header>*/

/*<Fab color="primary" aria-label="add" style={{ position: "fixed", zIndex:1, bottom: "32px", left: "32px"}}>
        <AddIcon />
      </Fab> */

export default HomePage;

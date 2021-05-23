import React, { useState, useCallback, useMemo } from "react";
import DisplayMap from "../components/displayMap.js";
import DetailStream from "../components/detailStream.js";
import { headerStyle } from "./styles/homepageStyle";

import getControls from "../components/controlPanel.js";

import { defaultViewport, cityLevel } from "../consts/consts.js";


// mapType: different types of map
let getMap = (data, mapType, geojson, viewport) => {
  return <DisplayMap
    width={"100vw"}
    height={"100vh"}
    viewport={viewport} // initial viewport
  />
}



// let HomePage = () => {
class HomePage extends React.Component {

  constructor() {
    super();
  }

  state = {
    "value": 1,
    "geojsonData": undefined,
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

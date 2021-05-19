import { Fab, Paper } from '@material-ui/core';
import DisplayMap from "./displayMap.js";
import { defaultViewport } from "../consts/consts.js";
import geojsonAU from "../shapes/geojsonAU.json";
import geojsonAULess from "../shapes/geojsonAUless.json";
import geojsonLGAvc from "../shapes/geojsonLGAvc.json";
import { useState } from 'react';

import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";



let DetailStream = (props) => {

  const comp = props.comp;
  let displayComp = [];

  const [show, setShow] = useState(true);

  const oncl = () => {
    setShow(!show);
  }

  for (let i of Object.keys(comp)) {
    displayComp.push(comp[i]);
    // console.log(comp[i]);
  }
  
  return <Paper elevation={3} style={{ padding: "32px", backgroundColor: "white", zIndex: 1, position: "fixed", right: show?"0px": "calc(128px - 40vw)", top: "0px", height: "95vh", width: "40vw", overflow: "scroll" }}>
    <div style={{display: "flex", textAlign: "center", verticalAlign: "center"}}>
      <Fab variant="extended" color="primary" aria-label="expand" onClick={oncl}>
        {show ? <ArrowForwardIos style={{marginRight: "16px"}} /> : <ArrowBackIos style={{marginRight: "16px"}} />}
        {show ? "Collapse" : "Scenarios"}
    </Fab>
    </div>
    {displayComp}
  </Paper>;
}

export default DetailStream;
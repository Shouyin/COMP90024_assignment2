import { Fab, Paper } from '@material-ui/core';
import DisplayMap from "./displayMap.js";
import { defaultViewport } from "../consts/consts.js";
import geojsonAU from "../shapes/geojsonAU.json";
import geojsonAULess from "../shapes/geojsonAUless.json";
import geojsonLGAvc from "../shapes/geojsonLGAvc.json";

let DetailStream = (props) => {
  
  return <Paper elevation={3} style={{ padding: "32px", backgroundColor: "white", zIndex: 1, position: "fixed", right: "0px", top: "0px", height: "95vh", width: "25vw", overflow: "scroll" }}>
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
  </Paper>;
}

export default DetailStream;
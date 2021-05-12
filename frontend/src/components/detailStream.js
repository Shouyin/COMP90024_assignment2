import { Fab, Paper } from '@material-ui/core';
import DisplayMap from "./displayMap.js";
import { defaultViewport } from "../consts/consts.js";
import geojsonAU from "../shapes/geojsonAU.json";
import geojsonAULess from "../shapes/geojsonAUless.json";
import geojsonLGAvc from "../shapes/geojsonLGAvc.json";



let DetailStream = (props) => {

  const comp = props.comp;
  let displayComp = [];

  for (let i of Object.keys(comp)) {
    displayComp.push(comp[i]);
    // console.log(comp[i]);
  }
  
  return <Paper elevation={3} style={{ padding: "32px", backgroundColor: "white", zIndex: 1, position: "fixed", right: "0px", top: "0px", height: "95vh", width: "25vw", overflow: "scroll" }}>
    <h1>Melbourne</h1>
    {displayComp}
  </Paper>;
}

export default DetailStream;
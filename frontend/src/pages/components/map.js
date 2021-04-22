import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import geojsonAULess from "../shapes/geojsonAUless.json";
import geojsonAU from "../shapes/geojsonAU.json";
import ReactMapGL, {Source, Layer} from 'react-map-gl';


const projectionConfig = {
  parallels: [-18, -36],
  translate: [480, 250],
  scale: 600,
  rotate: [230, 0],
  center: [5, 210]
};

const stroke = "#424642";
const fill = "#F3F4ED";
const choose = "#C06014";

// https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
const layerStyle = {
  id: 'au',
  type: 'fill',
  paint: {
    "fill-color": choose,
    "fill-opacity": 0.6,
    "fill-outline-color": stroke,
  }
};

function Map() {
  const [viewport, setViewport] = useState({
    latitude: -25.27,
    longitude: 133.77,
    zoom: 3
  });

  return (
    <ReactMapGL
      {...viewport}
      width={"100%"}
      height={"100%"}
      mapboxApiAccessToken={"pk.eyJ1Ijoic3N5aW4iLCJhIjoiY2tucmtvZWJqMDhjdTJvbWsydXEwdTRseiJ9.CLErMWYutp6PdHUaN5eFOg"}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      <Source id="my-data" type="geojson" data={geojsonAU}>
        <Layer {...layerStyle} />
      </Source>
    </ReactMapGL>
  );
}

/*class GeoSvg extends React.Component {

  state = {};

  constructor(props) {
    super();
    this.allsvgs = props.allsvgs;
    this.allsvgs[props.geo.rsmKey] = this;
    this.state.geo = props.geo;
    this.state.fill = fill;
    this.state.stroke = stroke;
  }

  render() {
    return <Geography
      stroke={this.state.stroke}
      fill={this.state.fill}
      style={{
        animationDuration: "1s",
      }}
      key={this.state.geo.rsmKey}
      geography={this.state.geo}
      onClick={() => {
        for (let i of Object.keys(this.allsvgs)) {
          this.allsvgs[i].setState({ fill: fill });
        }
        this.setState({ fill: choose })
      }}
      />;
  }
}*/

let MainMap = (props) => {
  return <div style={{backgroundColor: "#424642", width: props.width, height: props.height} }>
    <Map />
  </div>
  

  /* <ComposableMap projection={"geoConicEqualArea"} projectionConfig={projectionConfig}>
      <ZoomableGroup zoom={1}>
        <Geographies geography={geojsonAU}>
          {({ geographies }) => {
            let allsvgs = {}
            return geographies.map(geo => <GeoSvg geo={geo} allsvgs={allsvgs} />)
          }}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>*/

}

export default MainMap;
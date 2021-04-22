import React, { useState, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import geojsonAULess from "../shapes/geojsonAUless.json";
import geojsonAU from "../shapes/geojsonAU.json";
import ReactMapGL, {Source, Layer} from 'react-map-gl';


const stroke = "#424642";
const fill = "#F3F4ED";
const choose = "#C06014";
const mapkey = "pk.eyJ1Ijoic3N5aW4iLCJhIjoiY2tucmtvZWJqMDhjdTJvbWsydXEwdTRseiJ9.CLErMWYutp6PdHUaN5eFOg";
const defaultViewport = {
  latitude: - 25.27,
  longitude: 133.77,
  zoom: 3,
};

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

function Map(props) {
  let vp = defaultViewport;
  let geojsonData = geojsonAU;
  if (props.viewport) {
    vp = props.viewport;
  }
  if (props.geojsonData) {
    geojsonData = props.geojsonData;
  }

  const [viewport, setViewport] = useState(vp);
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback(event => {
    const {
      features,
      srcEvent: {x, y}
    } = event;
    const hoveredFeature = features && features[0];
    // console.log(hoveredFeature)
    setHoverInfo(
      (hoveredFeature &&
        hoveredFeature.properties &&
        hoveredFeature.properties.feature_name) ? {
        feature: hoveredFeature,
        x: x,
        y: y
      }: null
    );
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      width={"100%"}
      height={"100%"}
      mapboxApiAccessToken={mapkey}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onHover={onHover}
    >
      <Source id="mapdata" type="geojson" data={geojsonData}>
        <Layer {...layerStyle}/>
      </Source>
      {hoverInfo && (
          <div className="tooltip" style={{position: "fixed", zIndex: 2, left: hoverInfo.x, top: hoverInfo.y}}>
            <div>State: {hoverInfo.feature.properties.feature_name}</div>
          </div>
        )}
    </ReactMapGL>
  );
}

let MainMap = (props) => {
  // console.log(props.geojsonData);
  return <div style={{backgroundColor: "#424642", width: props.width, height: props.height} }>
    <Map viewport={props.viewport} geojsonData={props.geojsonData}/>
  </div>
}

export default MainMap;
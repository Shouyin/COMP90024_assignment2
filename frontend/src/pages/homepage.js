import React from "react";
import HomePageMap from "./components/map.js";
import geojsonAU from "./shapes/geojsonAU.json";
import geojsonAULess from "./shapes/geojsonAUless.json";
import geojsonLGAvc from "./shapes/geojsonLGAvc.json";



let HomePage = () => {
  return <HomePageMap
    width={"100vw"}
    height={"100vh"}
    viewport={{
      latitude: - 25.27,
      longitude: 133.77,
      zoom: 3,
    }} // initial viewport
    geojsonData={geojsonLGAvc}
  />
}

export default HomePage;
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

export default function RadarChart_(props){
  /* props: data (:list of dict),
            width, 
            height
     
     Example: 
     [{what:"Income",score:10}, {what:"House", score: 6}, ...]
  */
  return (
    <RadarChart
      cx={200}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar  
        dataKey = "A"
        stroke="#0E7C7B"
        fill="#0E7C7B"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}

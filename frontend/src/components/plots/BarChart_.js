import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function BarChart_(props){
    /* props : (data, 
                keyName(X-axis Name),
                keyList(X-axis element list),
                width, 
                height )
     
     Example:
      data = [{name="A",val1=, val2=, val3=},
              {name="B",val1=, val2=, val3=}]
      dataKeyname = "name"
      dataTypekeyList = ["val1","val2","val3"]
  */

  const items = [];
  const colors = ["#8884d8", "#82ca9d", "#ca9d82", "#ca82af"];

  for (const [index, key_] of props.keyList.entries()) {
    items.push(
      <Bar
        dataKey={key_}
        fill={colors[index]}
      ></Bar>
    );
  }

  return(
    <BarChart
    width={props.width}
    height={props.height}
    data={props.data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey={props.keyName} />
    <YAxis />
    <Tooltip />
    <Legend />
    {items}
  </BarChart>
);
}
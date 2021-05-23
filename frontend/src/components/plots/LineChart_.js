import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush, ResponsiveContainer
} from "recharts";



export default function LineChart_(props) {
  /* props : (data, 
              keyName(X-axis Name),
              keyList(X-axis element list),
              width, height )
     
     Example:
      data = [{name="A",val1=, val2=, val3=},
              {name="B",val1=, val2=, val3=}]
      Keyname = "name"
      keyList = ["val1","val2","val3"]
  */

  const items = [];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#99ddc8','#FB6376','#FB6376','#E0CA3C'];

  for (const [index, key_] of props.keyList.entries()) {
    items.push(
      <Line
        type="monotone"
        dataKey={key_}
        stroke={COLORS[index]}
        activeDot={{ r: 8 }}
      ></Line>
    );
  }

  return (
    <ResponsiveContainer>
    <LineChart
      width={props.width}
      height={props.height}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {props.brush_flag? <Brush dataKey={props.keyName} height={30} stroke="#8884d8" />:null}; 
      <XAxis dataKey={props.keyName} />
      <YAxis />
      <Tooltip />
      <Legend />
      {items}
      </LineChart>
      </ResponsiveContainer>
  );
}

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush, ResponsiveContainer
} from "recharts";

export default function BarChart_(props){
    /* props : (data, 
                keyName(X-axis Name),
                keyList(X-axis element list),
                brush_flag,
                width, 
                height )
     
     Example:
      data = [{name="A",val1=, val2=, val3=},
              {name="B",val1=, val2=, val3=}]
      brush_flag = true
      keyName = "name"
      keyList = ["val1","val2","val3"]
  */

  const items = [];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#99ddc8','#FB6376','#FB6376','#E0CA3C'];


  for (const [index, key_] of props.keyList.entries()) {
    items.push(
      <Bar
        dataKey={key_}
        fill={COLORS[index]}
      ></Bar>
    );
  }

  return (
    <ResponsiveContainer>
    <BarChart
    data={props.data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    {props.brush_flag? <Brush dataKey={props.keyName} height={30} stroke="#8884d8" />:null}; 
    <XAxis dataKey={props.keyName} interval={0} height={70} angle={-30} dx={-30} dy={20} />
    <YAxis />
    <Tooltip />
    <Legend />
    {items}
      </BarChart>
      </ResponsiveContainer>
);
}
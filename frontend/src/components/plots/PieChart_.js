import React from "react";
import { PieChart, Pie, Legend, Tooltip, LabelList, Cell } from "recharts";

export default function PieChart_(props) {
  /* props : (data,
                width,
                height )
     
     Example:
      data = [{name="A",value=},
              {name="B", value=]
  */
  let data_ = props.data;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#99ddc8','#FB6376','#FB6376','#E0CA3C'];
    
  return (
    <PieChart width={props.width} height={props.height}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data_}
        fill="#8884d8"
      >
        {data_.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <LabelList dataKey="name" position="outside" stroke={undefined} />
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

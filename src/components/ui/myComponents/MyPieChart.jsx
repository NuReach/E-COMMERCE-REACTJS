import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  _id
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      lengthAdjust="spacingAndGlyphs"
      textLength={60} // Adjust the text length as needed
      style={{ whiteSpace: "pre-line" }} // Set white-space to pre-line for line wrapping
    >
      {`${(percent * 100).toFixed(0)}% ${_id} `}
    </text>
  );
};

const MyPieChart = ({data}) => {
  return (
    <ResponsiveContainer  width="100%" height="100%" >
    <PieChart >
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={250}
        fill="#8884d8"
        dataKey="count"
      >
        {data?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    </ResponsiveContainer>
  );
};

export default MyPieChart;

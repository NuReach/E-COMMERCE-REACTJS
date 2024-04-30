import React from 'react';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from 'recharts';

const data = [
  {
    "name": "Page A",
    "uv": 4000
  },
  {
    "name": "Page B",
    "uv": 3000
  },
  {
    "name": "Page C",
    "uv": 2000
  },
  {
    "name": "Page D",
    "uv": 2780
  },
  {
    "name": "Page E",
    "uv": 1890
  },
  {
    "name": "Page F",
    "uv": 2390
  },
  {
    "name": "Page G",
    "uv": 3490
  }
];

const LineChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%" >
      <AreaChart  data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChart;

import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import SchoolStatics_one from '../Assests/Dummy-data/SchoolStatics_one';

const SchoolStatics = () => {

  return (
    <ResponsiveContainer width="100%">
    <BarChart data={SchoolStatics_one}>
      <XAxis dataKey="name" stroke="#2884ff" />
      <Bar dataKey="mileStats" stroke="#2884ff" fill="#2884ff" barSize={30} />

      <Tooltip wrapperClassName="tooltip__style" cursor={false} />
    </BarChart>
  </ResponsiveContainer>
  )
}

export default SchoolStatics

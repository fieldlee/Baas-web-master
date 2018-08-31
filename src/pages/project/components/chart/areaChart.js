import React from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import {AreaTooltip} from './areaTooltip';

export class InfoAreaChart extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <ResponsiveContainer>
        <AreaChart data={data}
                   margin={{
                     top: 10,
                     right: 10,
                     left: -30,
                     bottom: 10
                   }}

        >
          <defs>
            <linearGradient id='colorBlock' x1='0' y1='0' x2='0'
                            y2='1'>
              <stop offset='0' stopColor='#ecf8ff'/>
              <stop offset='100%' stopColor='#fbfeff'/>
            </linearGradient>
          </defs>
          <XAxis dataKey='name' axisLine={false} tickLine={false}/>
          <YAxis allowDecimals={false} axisLine={false} tickLine={false}/>
          <Tooltip isAnimationActive={false} cursor={false} coordinate={{x: 26, y: 12}} content={<AreaTooltip/>}/>
          <Area type='monotone'
                dataKey='data'
                stroke='#01a4ff'
                fill='url(#colorBlock)'
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

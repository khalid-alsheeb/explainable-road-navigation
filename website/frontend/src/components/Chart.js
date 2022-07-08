import React from 'react';
import { LineChart, Label, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux'

const Chart = () => {

    const points = useSelector((state) => state.toPlot);

    let keys = []
    let i = 0

    const colours = [
        '#83cb9f',
        '#8785da',
        '#c0a714',
        '#c99f9a',
        '#5e5f21',
        '#b7634b',
        '#7d9809',
        '#82cbf5',
        '#3a546f',
        '#7588dc',
        '#b2ab2f',
        '#b097ff',
        '#6f64b4',
        '#a452a7',
        '#aec09a',
        '#938254',
        '#6d8dcd',
        '#a98624',
        '#5c4307',
        '#67331e',
        '#615772',
        '#1260d0',
        '#c9dc4b',
        '#ccc4bc'
    ]

    for (var key in points[0]) {
        if(key !== "date") {
            keys.push([key, colours[i]])
            ++i
        }
    }
  
    return (
        <ResponsiveContainer>
        <LineChart
            width={500}
            height={300}
            data={points}
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
            }}
        >
            <CartesianGrid strokeDasharray="1 3" />
            
            <XAxis dataKey='date' >
                <Label value={"Date"} position="bottom" fill='white' />
            </XAxis>

            <YAxis domain={['auto', 'auto']} >
                <Label value={'Price'} angle={-90} position='left' fill='white' />
            </YAxis>

            <Tooltip  />
            <Legend verticalAlign="top" />

            {keys.map((key) => (
                <Line key={key} type="monotone" dataKey={key[0]} stroke={key[1]} dot={false} />  
            ))}

        </LineChart>
        </ResponsiveContainer>
    );

}

export default Chart;


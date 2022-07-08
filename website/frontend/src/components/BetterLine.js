import React from 'react';

const BetterLine = ({color}) => {
    return(
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 0.5
        }}
    />
)};

export default BetterLine;
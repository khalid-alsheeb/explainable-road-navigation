import React, { useState } from "react";
import { ListItem, Typography, List, ListItemIcon, ListItemText } from "@material-ui/core";
import Container from 'react-bootstrap/Container';
import { useSelector } from "react-redux";
import BetterLine from "./BetterLine";

const Explanations = () => {

    const explanations = useSelector((state) => state.explanations);

    const reasons = explanations[0]
    const solutions = explanations[1]
    //{isLoggedIn ? 'currently' : 'not'}

    return (
        <Container style={{ marginBottom: '10%'}}>
            {reasons.length > 0
            ?
            <>
                <Typography variant="h6" color="textSecondary" align="left" style={{color: 'white'}}>
                    The desired path is not optimal because:
                </Typography>
                <ol  style={{ listStyleType: "upper-roman", color: 'rgb(255, 145, 0)' }} >

                    { reasons.map((r) => 
                        <li>
                            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                {r}
                            </Typography>
                        </li>
                    )}
                </ol>

                <BetterLine />

                <Typography variant="h6" color="textSecondary" align="left" style={{color: 'white'}}>
                    If the following was true, then the desired path would be optimal:
                </Typography>
                <ol  style={{ listStyleType: "upper-roman", color: 'rgb(255, 145, 0)' }} >

                    { solutions.map((s) => 
                        <li>
                            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                {s}
                            </Typography>
                        </li>
                    )}
                </ol>
            </>
            : 
            <>
                <Typography variant="h6" color="textSecondary" align="left" style={{color: 'white'}}>
                    The desired path is the optimal path.
                </Typography>
            </>
            }
        </Container>

    );
}

export default Explanations;


// Example explanations
// const explanations = [
//     [
//         'Stamford Street has a current speed of 14.0.', 'Stamford Street (1) has a current speed of 14.0.', 'Stamford Street (2) has a current speed of 14.0.', 'Blackfriars Bridge has a current speed of 13.0.', 'Victoria Embankment is only a one way street (on the other side).', 'Victoria Embankment (1) is only a one way street (on the other side).', 'Temple Place is only a one way street (on the other side).', 'Arundel Street has a current speed of 11.0.'
//     ],
//     [
//         'Stamford Street had a current speed of at least 20.0.', 'Stamford Street (1) had a current speed of at least 20.0.', 'Stamford Street (2) had a current speed of at least 20.0.', 'Blackfriars Bridge had a current speed of at least 20.0.', 'Victoria Embankment was a two way street.', 'Victoria Embankment (1) was a two way street.', 'Temple Place was a two way street.', 'Arundel Street had a current speed of at least 12.07586936418217.'
//     ]
// ]

// # this is just one explanation. It is not optimal because: i, ii, ii ...
// # if instead the following was true, then the desired path would be optimal:
// # i was open, ii speed 34 ...

// # maxSpeed and speed >= not equal.
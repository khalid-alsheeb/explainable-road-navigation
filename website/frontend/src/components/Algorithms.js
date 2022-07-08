import React, { useState, useEffect } from "react";
import Switch from '@mui/material/Switch';
import { Table, TableBody, TableRow, TableCell, Typography, TableContainer } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { addToPlot, removeToPlot } from "../actions";

const Algorithms = () => {

    const dispatch = useDispatch();

    const points = useSelector((state) => state.points);

    const [isDisabled, setIsDisabled] = useState(true)

    const algorithms = ['Original', 'DAE-v1', 'DAE-v2']

    useEffect(() => {
        if(points.length > 0) {
            setIsDisabled(false)
        }

    }, [points])

    const styles = {
        white: {
            color:'white',
            backgroundColor: '#404040'
        },
    }

    const handleChange = (val, algorithm) => {
        if(val) {
            dispatch(addToPlot(algorithm))
            dispatch(addToPlot(algorithm))
        } else {
            dispatch(removeToPlot(algorithm))
            dispatch(removeToPlot(algorithm))
        }
    }



    return (
        <TableContainer style={{marginTop: '5%', marginBottom: '3%'}}>
            <Typography variant="h6" style={styles.white} component="div">
                Algorithms
            </Typography>
            <Table>
                <TableBody>
                    <TableRow>
                    </TableRow>
                    {algorithms.map(algorithm => (
                    <TableRow>
                        <TableCell style={{borderBottom:"none"}}>
                        <Typography variant="button" style={styles.white} component="div">
                            {algorithm} Time Series
                        </Typography>
                        </TableCell>
                        <TableCell style={{borderBottom:"none"}} align="right">
                            <Switch thumbSwitchedStyle={{ backgroundColor: 'white' }} color='warning' style={{color: "#ff9100"}} disabled={isDisabled}
                            onChange={(e, val) => handleChange(val, algorithm)} defaultChecked={true}  />
                        </TableCell>
                    </TableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Algorithms;
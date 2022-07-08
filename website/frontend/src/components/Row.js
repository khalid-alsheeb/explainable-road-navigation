import React, { Fragment, useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { addToPlot, removeToPlot } from "../actions";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { Table, TableBody, TableRow, TableCell, Typography, TableHead } from "@material-ui/core";

const Row = ({ row }) => {


    const dispatch = useDispatch();

    const [isDisabled, setIsDisabled] = useState(true)
    const points = useSelector((state) => state.points);

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
        borderLess:{
            color:'white',
            backgroundColor: '#404040',
            borderBottom:"none"
        }
    }

    const handleChange = (val, id, key) => {
        if(id === 0) {
            if(val) {
                dispatch(addToPlot(key + ' SMA 20'))
                dispatch(addToPlot(key + ' SMA 50'))
            } else {
                dispatch(removeToPlot(key + ' SMA 20'))
                dispatch(removeToPlot(key + ' SMA 50'))
            }
        } else if(id === 1) {
            if(val) {
                dispatch(addToPlot(key + ' MACD'))
                dispatch(addToPlot(key + ' MACD Signal'))
                dispatch(addToPlot(key + ' MACD Histogram'))
            } else {
                dispatch(removeToPlot(key + ' MACD'))
                dispatch(removeToPlot(key + ' MACD Signal'))
                dispatch(removeToPlot(key + ' MACD Histogram'))
                
            }
        } else if(id === 2) {
            if(val) {
                dispatch(addToPlot(key + ' Lower BB'))
                dispatch(addToPlot(key + ' Upper BB'))
            } else {
                dispatch(removeToPlot(key + ' Lower BB'))
                dispatch(removeToPlot(key + ' Upper BB'))
            }
        }
    }
    const [open, setOpen] = useState(false);

    return (
    <Fragment>
        <TableRow style={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell style={styles.borderLess} >
                <IconButton
                style={{color: '#ff9100'}}
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>

            <TableCell style={styles.borderLess} component="th" scope="row" >
                {row.indicator}
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Typography variant="button" gutterBottom component="div" style={styles.white}>
                            Returns ----{'>'}
                        </Typography>

                        <Table size="small" aria-label="purchases">

                            <TableHead>
                                <TableRow>
                                    <TableCell style={styles.borderLess}></TableCell>
                                    <TableCell style={styles.borderLess} align="center">Show</TableCell>
                                    <TableCell style={styles.borderLess} align="center">Return</TableCell>
                                    <TableCell style={styles.borderLess} align="center">Current Signal</TableCell>
                                </TableRow>
                            </TableHead>
                        
                            <TableBody>
                                {row.returns !== undefined
                                    ?
                                    Object.keys(row.returns).map(key => (
                                        
                                            <TableRow>
                                                <TableCell style={styles.borderLess}>
                                                    {key}
                                                </TableCell>
                                                <TableCell style={styles.borderLess} align="center">
                                                    <Switch
                                                        thumbSwitchedStyle={{ backgroundColor: 'white' }} color='warning' style={{color: "#ff9100"}} disabled={isDisabled}
                                                        onChange={(e, val) => handleChange(val, row.id, key)}
                                                    />
                                                </TableCell>

                                                <TableCell style={styles.borderLess} align="center">
                                                    {row.returns[key]}%
                                                </TableCell>
                                                <TableCell style={styles.borderLess}>
                                                    {row.signals[key]}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    : <></>
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
          </TableCell>
        </TableRow>
    </Fragment>
    );
}

export default Row;
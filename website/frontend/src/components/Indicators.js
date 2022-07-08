import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import Row from './Row'
import { Typography } from "@material-ui/core";

const Indicators = () => {

    const returns = useSelector((state) => state.returns);
    const signals = useSelector((state) => state.signals);
      
    const rows = [
        { id: 0, indicator: 'Moving Average Crossover', returns: returns['MAC'], signals: signals['MAC'] },
        { id: 1, indicator: 'Moving average convergence divergence', returns: returns['MACD'], signals: signals['MACD'] },
        { id: 2, indicator: 'Bollinger Bands', returns: returns['BB'], signals: signals['BB'] },
    ];

    const styles = {
        white: {
            color:'white',
            backgroundColor: '#404040'
        },
    }

    return (
        <TableContainer>
            <Typography variant="h6" style={styles.white} component="div">
                Indicators / Trading Strategies
            </Typography>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody style={{margin: '0%'}}>
                    {rows.map((row) => (
                        <Row row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Indicators;
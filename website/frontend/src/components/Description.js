import React from "react";
import { Typography } from "@material-ui/core";
import Container from 'react-bootstrap/Container';

const Description = () => {
    return (
        <Container style={{ marginBottom: '10%'}}>
            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                Choose a ticker, a date, and a period, and then press calculate to get the deniosed, and original data.
                You can check the returns for each technical indicator at the bottom, and a switch to plot them.
            </Typography>
        </Container>

    );
}

export default Description;
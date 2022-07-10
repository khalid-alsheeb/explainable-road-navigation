import React from "react";
import { Typography } from "@material-ui/core";
import Container from 'react-bootstrap/Container';

const Description = () => {
    return (
        <Container style={{ marginBottom: '10%'}}>
            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                Create your path by pressing on the nodes you want. You can flip the source and target nodes, by pressing the button. Also, you can see the border of the data we use and remove it if you want.
            </Typography>
        </Container>

    );
}

export default Description;
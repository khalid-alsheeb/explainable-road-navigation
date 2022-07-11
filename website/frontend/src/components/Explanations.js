import React from "react";
import { ListItem, Typography, List, ListItemIcon, ListItemText } from "@material-ui/core";
import Container from 'react-bootstrap/Container';

const Explanations = () => {
    return (
        <Container style={{ marginBottom: '10%'}}>
            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                The explanations are:
            </Typography>
            <List>
                <ListItem>
                    <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                        Desired Path
                    </Typography>
                </ListItem>
            </List>
        </Container>

    );
}

export default Explanations;